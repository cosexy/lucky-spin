// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@vueuse/nuxt',
        '@nuxtjs/tailwindcss',
        'nuxt-icon',
        '@pinia/nuxt'
    ],
    // @ts-ignore
    imports: {
        autoImport: true,
        imports: [
            { name: 'useAuth', from: '@vueuse/firebase' },
            { name: 'getDatabase', from: 'firebase/database' },
            { name: 'ref', from: 'firebase/database', as: 'dbRef' },
            { name: 'set', from: 'firebase/database', as: 'dbSet' },
            { name: 'get', from: 'firebase/database', as: 'dbGet' },
            { name: 'remove', from: 'firebase/database', as: 'dbRemove' },
            { name: 'onValue', from: 'firebase/database', as: 'dbOnValue' },
            { name: 'useRTDB', from: '@vueuse/firebase/useRTDB' },
        ]
    },
})
