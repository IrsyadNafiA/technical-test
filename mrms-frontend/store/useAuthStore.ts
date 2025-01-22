import { create } from "zustand";
import { persist } from "zustand/middleware";


interface AuthState {
    token: string | null;
    isInitialized: boolean;
    setToken: (token: string) => void;
    removeToken: () => void;
    initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
      (set) => ({
        token: null,
        isInitialized: false,
        setToken: (token: string) => set({ token }),
        removeToken: () => {
            localStorage.removeItem('token');
            set({ token: null, isInitialized: true })
        },
        initializeAuth: () => {
            const storedToken = localStorage.getItem('token');
            set({token: storedToken, isInitialized: true});
        }
      }),
      {
        name: 'auth-storage',
      }
    )
  );