import type { Message } from '../types';
import { useAuth } from '../context/AuthContext';

interface Props {
  message: Message;
}

export default function MessageBubble({ message }: Props) {
  const { user } = useAuth();
  const isMine = message.sender._id === user?._id;
  const time = new Date(message.createdAt).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-xs lg:max-w-md xl:max-w-lg group`}>
        <div
          className={`px-4 py-2 rounded-2xl text-sm leading-relaxed
            ${
              isMine
                ? 'bg-indigo-600 text-white rounded-br-sm'
                : 'bg-gray-800 text-gray-100 rounded-bl-sm'
            }`}
        >
          {message.content}
        </div>
        <p
          className={`text-xs text-gray-600 mt-1 ${isMine ? 'text-right' : 'text-left'}`}
        >
          {time}
          {isMine && (
            <span className="ml-1">{message.isRead ? '✓✓' : '✓'}</span>
          )}
        </p>
      </div>
    </div>
  );
}
