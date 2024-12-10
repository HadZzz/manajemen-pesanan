'use client';
import { create } from 'zustand';

interface User {
  id: number;
  email: string;
  name: string | null;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  checkAuth: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  isLoading: false,

  checkAuth: async () => {
    try {
      set({ isLoading: true });
      const response = await fetch('/api/auth/me');
      const data = await response.json();
      
      if (response.ok) {
        set({ user: data.user });
        console.log("Auth check successful, user:", data.user);
      } else {
        set({ user: null });
        console.log("Auth check failed, clearing user");
      }
    } catch (error) {
      console.error('Auth check error:', error);
      set({ user: null });
    } finally {
      set({ isLoading: false });
    }
  },

  login: async (email: string, password: string) => {
    try {
      set({ isLoading: true });
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      set({ user: data.user });
      console.log("Login successful, user:", data.user);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    try {
      set({ isLoading: true });
      await fetch('/api/auth/logout', { 
        method: 'POST',
      });
      set({ user: null });
      console.log("Logout successful, cleared user");
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
}));