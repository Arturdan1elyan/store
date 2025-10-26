"use client";

import { User, UserContextType } from "@/types";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const userContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  const getUsers = async () => {
    try {
      const res = await fetch("https://fakestoreapi.com/users");
      if (!res.ok) throw new Error(`failed to fetch: ${res.statusText}`);
      const data: User[] = await res.json();
      setUsers(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const postNewUser = async (user: User) => {
    try {
      const res = await fetch(`https://fakestoreapi.com/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      if (!res.ok) throw new Error(`failed to post: ${res.statusText}`);
      const data = await res.json();
      setUsers([...users, data]);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  };

  const deleteUser = async (id: number) => {
    try {
      const res = await fetch(`https://fakestoreapi.com/users/${id}`, {
        method: "DELETE",
      });
        if (!res.ok) throw new Error("failed to delete");
        setUsers(users.filter(user => user.id !== id));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  };
  return (
    <userContext.Provider
      value={{
        users,
        error,
        getUsers,
        postNewUser,
        deleteUser,
      }}
    >
      {children}
    </userContext.Provider>
  );
}

export function useUsers(): UserContextType {
  const context = useContext(userContext);
  if (!context) {
    throw new Error("fail");
  }
  return context;
}
