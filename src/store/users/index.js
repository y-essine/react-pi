import { create } from 'zustand';
import { userService } from '@/services';

const useUsersStore = create((set) => ({
    users: [],
    isLoading: false,
    isLoaded: false,
    setUsers: (users) => set({ users }),
    removeUser: (id) => set((state) => ({ users: state.users.filter((user) => user.id !== id) })),
    fetchUsers: async () => {
        set({ isLoading: true });
        const req = await userService.getAll().then((data) => {
            set({ users: data, isLoading: false, isLoaded: true });
        }).catch((err) => {
            set({ isLoading: false });
            throw err;
        });
    },
    clearUsers: () => set({ users: [] })
}));

export default useUsersStore;
