import type { User } from '../types';
import { useSocket } from '../context/SocketContext';

interface Props {
  users: User[];
  selectedUserId: string | null;
  onSelectUser: (user: User) => void;
}

export default function UserList({
  users,
  selectedUserId,
  onSelectUser,
}: Props) {
  const { onlineUsers } = useSocket();

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-800">
        <h2 className="text-lg font-semibold text-white">Messages</h2>
        <p className="text-xs text-gray-500 mt-0 5">{users.length} contacts</p>
      </div>

      <div className="flex-1 overflow-y-auto">
        {users.map((u) => {
          const isOnline = onlineUsers.includes(u._id);
          const isSelected = selectedUserId === u._id;

          return (
            <button
              key={u._id}
              onClick={() => onSelectUser(u)}
              className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-800 transition text-left ${isSelected ? 'bg-gray-800 border-r-2 border-indigo-500' : ''}`}
            >
              <div className="relative shrink-0">
                <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold">
                  {u.username[0].toUpperCase()}
                </div>
                {isOnline && (
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-gray-900" />
                )}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {u.username}
                </p>
                <p className="text-xs text-gray-500">
                  {isOnline ? 'Online' : 'Offline'}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
