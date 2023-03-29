import { defineStore } from 'pinia'

interface State {
    token?: string
}

export const useAuthStore = defineStore<string, State>({
  id: 'auth',
  state: () => ({
    token: undefined
  }),

  getters: {
    auth: (state) => !!state.token
  }
})
