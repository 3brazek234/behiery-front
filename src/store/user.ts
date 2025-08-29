import { Profile } from "@/types/profile";
import { create } from "zustand";
import { persist } from "zustand/middleware";

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
      storage: {
        getItem: (name) => {
          const item = sessionStorage.getItem(name);
          return item ? JSON.parse(item) : null;
        },
        setItem: (name, value) => {
          sessionStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => sessionStorage.removeItem(name),
      },
    }
  )
);

export default useUserStore;
