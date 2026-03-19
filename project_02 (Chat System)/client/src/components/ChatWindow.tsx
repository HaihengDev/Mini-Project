import { useEffect, useRef, useState } from 'react';
import type { User } from '../types';
import { useMessages } from '../hooks/useMessages';
import { useSocket } from '../context/SocketContext';
import MessageBubble from './MessageBubble';

interface Props {
  selectedUser: User | null;
}

export default function ChatWindow({ selectedUser }: Props) {
  const { socket, onlineUsers } = useSocket();
  const { messages, loading, sendMessage } = useMessages(
    selectedUser?._id ?? null,
  );
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const typingTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Typing indicator listeners
  useEffect(() => {
    if (!socket || !selectedUser) return;
    const onTyping = ({ senderId }: { senderId: string }) => {
      if (senderId === selectedUser._id) setIsTyping(true);
    };
    const onStopTyping = ({ senderId }: { senderId: string }) => {
      if (senderId === selectedUser._id) setIsTyping(false);
    };
    socket.on('user_typing', onTyping);
    socket.on('user_stop_typing', onStopTyping);
    return () => {
      socket.off('user_typing', onTyping);
      socket.off('user_stop_typing', onStopTyping);
    };
  }, [socket, selectedUser]);

  const handleInputChange = (val: string) => {
    setInput(val);
    if (!socket || !selectedUser) return;
    socket.emit('typing', { receiverId: selectedUser._id });
    if (typingTimeout.current) clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => {
      socket.emit('stop_typing', { receiverId: selectedUser._id });
    }, 1500);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input);
    setInput('');
    if (socket && selectedUser) {
      socket.emit('stop_typing', { receiverId: selectedUser._id });
    }
  };

  if (!selectedUser) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-950">
        <div className="text-center">
          <div className="text-6xl mb-4">💬</div>
          <h2 className="text-xl font-semibold text-gray-400">
            Select a conversation
          </h2>
          <p className="text-gray-600 mt-1 text-sm">
            Choose someone to start chatting
          </p>
        </div>
      </div>
    );
  }

  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    <div className="flex-1 flex flex-col bg-gray-950">
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-800 bg-gray-900">
        <div className="relative">
          <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold">
            {selectedUser.username[0].toUpperCase()}
          </div>
          {isOnline && (
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-gray-900" />
          )}
        </div>
        <div>
          <p className="font-semibold text-white">{selectedUser.username}</p>
          <p className="text-xs text-gray-500">
            {isTyping ? (
              <span className="text-indigo-400 animate-pulse">typing...</span>
            ) : isOnline ? (
              'Online'
            ) : (
              'Offline'
            )}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-8 text-gray-600 text-sm">
            No messages yet. Say hello! 👋
          </div>
        ) : (
          messages.map((msg) => <MessageBubble key={msg._id} message={msg} />)
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-6 py-4 border-t border-gray-800 bg-gray-900">
        <div className="flex items-center gap-3">
          <input
            className="flex-1 px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition text-sm"
            placeholder={`Message ${selectedUser.username}...`}
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white
            disabled:opacity-40 disabled:cursor-not-allowed transition active:scale-95"
          >
            <svg
              className="w-5 h-5 rotate-45"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
