import { Profile } from "@/types/profile";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserStore {
  user: Profile | null;
  setUser: (user: Profile) => void;
  logout: () => void;
  token: string | null;
  setToken: (token: string) => void;
}

const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setUser: (user: Profile) => set({ user }),
      logout: () => set({ user: null, token: null }),
      setToken: (token: string) =>
        set((state: UserStore) => ({ token: (state.token = token) })),
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => localStorage)
      // {
      //   getItem: (name) => {
      //     // const item = sessionStorage.getItem(name);
      //     const item = localStorage.getItem(name);
      //     return item ? JSON.parse(item) : null;
      //   },
      //   setItem: (name, value) => {
      //     localStorage.setItem(name, JSON.stringify(value));
      //   },
      //   removeItem: (name) => localStorage.removeItem(name),
      // },
    }
  )
);

export default useUserStore;
