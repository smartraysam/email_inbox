import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ISessionStore {
  messages: any[];
  setmessages: (messages: any[]) => void;
  addmessage: (account: any) => void;
  clearmessages: () => void;

  userId: string;
  setUserId: (val: string) => void;

  user: any;
  setUser: (user: any) => void;
}

export const useStore = create<ISessionStore>()(
  persist(
    (set) => ({
      messages: [],
      setmessages: (items: any[]) => set((_state) => ({ messages: items })),
      addmessage: (sess: any) =>
        set((state) => ({ messages: state.messages.concat(sess) })),
      clearmessages: () => set((_state) => ({ messages: [] })),
      
      userId:"",
      setUserId: (val: string) => set((_state) => ({ userId: val })),

      user:{},
      setUser: (user: any) => set((_state) => ({ user: user })),

    }),
    { name: 'EmailInbox' }
  )
);
