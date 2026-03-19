import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import type { Message } from '../types';
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../context/SocketContext';

export const useMessages = (selectedUserId: string | null) => {
  const { user } = useAuth();
  const { socket } = useSocket();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetching History chat
  useEffect(() => {
    if (!selectedUserId || !user) return;
    setLoading(true);
    axios
      .get(`/api/messages/${selectedUserId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then(({ data }) => setMessages(data))
      .finally(() => setLoading(false));
  }, [selectedUserId, user]);

  // Listen for incoming messages
  useEffect(() => {
    if (!socket || !selectedUserId) return;

    const handleReceive = (msg: Message) => {
      const isRevelant =
        (msg.sender._id === selectedUserId && msg.receiver._id === user?._id) ||
        (msg.sender._id === user?._id && msg.receiver._id === selectedUserId);
      if (isRevelant) setMessages((prev) => [...prev, msg]);
    };

    const handleSent = (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    };

    socket.on('receiver_message', handleReceive);
    socket.on('message_sent', handleSent);

    return () => {
      socket.off('receiver_message', handleReceive);
      socket.off('message_sent', handleSent);
    };
  }, [socket, selectedUserId, user]);

  const sendMessage = useCallback(
    (content: string) => {
      if (!socket || !selectedUserId || !content.trim()) return;
      socket.emit('send_message', { receiverId: selectedUserId, content });
    },
    [socket, selectedUserId],
  );

  return { messages, loading, sendMessage };
};
