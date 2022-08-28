import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react';

import userList from '../assets/users.json';

const PAGE_SIZE = 20;
const PAGE_NUMBER = Math.ceil(userList.length / PAGE_SIZE);

interface UserProviderProps {
  children: ReactNode;
}

export interface User {
  id: string;
  email: string;
  username: string;
  profile: {
    name: string;
    company: string;
    address: string;
    about: string;
  };
  roles: string[];
  createdAt: string;
  updatedAt: string;
}

interface ContextData {
  users: User[];
  endReached: boolean;
  refreshing: boolean;
  requestUsers(): void;
  refresh(): void;
}

const UserContext = createContext({} as ContextData);

export function UserProvider({ children }: UserProviderProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [curPage, setCurPage] = useState(1);
  const [endReached, setEndReached] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  function requestUsers() {
    if (curPage <= PAGE_NUMBER) {
      const slicedList = userList.slice(
        (curPage - 1) * PAGE_SIZE,
        curPage * PAGE_SIZE
      );

      if (!endReached) {
        setUsers(users => [...users, ...slicedList]);
        setCurPage(page => page + 1);
      }
    } else {
      setEndReached(true);
    }
  }

  function refresh() {
    setUsers([]);
    setEndReached(false);
    setCurPage(1);
    setRefreshing(true);
  }

  useEffect(() => {
    if (refreshing === true) {
      requestUsers();
      setRefreshing(false);
    }
  }, [refreshing]);

  return (
    <UserContext.Provider
      value={{
        users,
        endReached,
        refreshing,
        requestUsers,
        refresh
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUsers() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('No context found');
  }

  return context;
}
