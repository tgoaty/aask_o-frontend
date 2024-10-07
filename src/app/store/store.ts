import {create} from "zustand";


interface useStoreStates {
    adminPassword: string
}

interface useStoreActions {
    setAdminPassword: (newAdminPassword: string) => void
}

export const useStore = create<useStoreStates & useStoreActions>((set) => ({
    adminPassword: localStorage.getItem('adminPassword') || '',
    setAdminPassword: (newAdminPassword) => set({adminPassword: newAdminPassword})
}))