import { useEffect, useState } from 'react';
import axios from 'axios';
import type { User } from '../types';
import { useAuth } from '../context/AuthContext';
import UserList from '../components/UserList';
import ChatWindow from '../components/ChatWindow';

export default function Chat() {
  const { user, logout } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    axios
      .get('/api/auth/users', {
        headers: { Authorization: `Bearer ${user?.token}` },
      })
      .then(({ data }) => setUsers(data));
  }, [user]);

  return (
    <div className="h-screen flex bg-gray-950 overflow-hidden">
      {/* Sidebar */}
      <div className="w-72 shrink-0 border-r border-gray-800 bg-gray-900 flex flex-col">
        {/* Profile */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-bold">
              {user?.username[0].toUpperCase()}
            </div>
            <span className="text-sm font-medium text-white">
              {user?.username}
            </span>
          </div>
          <button
            onClick={logout}
            className="text-xs text-gray-500 hover:text-red-400 transition"
          >
            Logout
          </button>
        </div>
        <UserList
          users={users}
          selectedUserId={selectedUser?._id ?? null}
          onSelectUser={setSelectedUser}
        />
      </div>

      {/* Chat Area */}
      <ChatWindow selectedUser={selectedUser} />
    </div>
  );
}
