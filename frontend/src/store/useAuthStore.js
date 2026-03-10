import {create} from 'zustand';

export const useAuthStore = create((set) => ({
    authUser: {name: "john", _id:123, age: 22},
    isLoggedIn: false,

    login: () =>{
        console.log('we just logged in');
        set({ authUser: {name: "Ajay", _id:123, age: 22} })
        set({ isLoggedIn: true})
    }
}));