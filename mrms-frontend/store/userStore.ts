import { create } from "zustand";
import { useAuthStore } from "./useAuthStore";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "@/utils/axiosInstance";

interface User {
    email: string;
    [key: string]: any;
  }
  
  interface UserState {
    user: User | null;
    fetchUser: () => Promise<void>;
    clearUser: () => void;
  }

  export const useUserStore = create<UserState>((set) => ({
    user: null,
    fetchUser: async ()=> {
        const {token} = useAuthStore.getState();
        if(!token) {
            console.error("Token not found");
            return;
        }
        
        try{
            const decoded: {sub: string} = jwtDecode(token);
            const email = decoded.sub;

            const response = await axiosInstance.get(`/users/${email}`);
            set({user: response.data});
        } catch (error) {
            console.error("Failed to fetch user", error);
        }
    },
    clearUser: () => set({ user: null }),
  }))