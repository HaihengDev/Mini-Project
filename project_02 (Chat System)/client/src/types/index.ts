export interface User {
  _id: string;
  username: string;
  email: string;
  avatar?: string;
  isOnline: string;
  lastSeen: string;
}

export interface Message {
  _id: string;
  sender: User;
  receiver: User;
  content: string;
  isRead: boolean;
  createdAt: string;
}

export interface AuthUser extends User {
  token: string;
}
