import {defineNuxtPlugin} from "#imports"
import {initializeApp} from "@firebase/app";
import {getAnalytics} from "@firebase/analytics";
import {getAuth} from "firebase/auth";

export default defineNuxtPlugin(nuxtApp => {
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
        apiKey: "AIzaSyAtiBJ3ZqTgwCqRuqlkkfJocd5Tp5LAeL8",
        authDomain: "lucky-spin-11b9f.firebaseapp.com",
        projectId: "lucky-spin-11b9f",
        storageBucket: "lucky-spin-11b9f.appspot.com",
        messagingSenderId: "230847275406",
        appId: "1:230847275406:web:aa846fd6107dcc6ab1c4df",
        measurementId: "G-GLTK3L2T2E",
        databaseURL: "https://lucky-spin-11b9f-default-rtdb.asia-southeast1.firebasedatabase.app",
    }

    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    const auth = getAuth(app)

    nuxtApp.hooks.hook('app:mounted', () => {
        // Listen to Supabase auth changes
        auth.onIdTokenChanged(async (user) => {
            if (user) {
                // const firebaseToken = await user.getIdToken()
                // if(firebaseToken) {
                //     try {
                //         const { token } = await $fetch('/api/auth', {
                //             method: 'POST',
                //             body: {
                //                 token:firebaseToken
                //             }
                //         })
                //         if(token) {
                //             wishApp.value.token = token
                //             const { user } = await $fetch('/api/me', {
                //                 method: 'GET',
                //                 headers: {
                //                     Authorization: `Bearer ${token}`
                //                 }
                //             })
                //             if(user) {
                //                 // @ts-ignore
                //                 wishApp.value.user = user
                //             }
                //         }
                //         //
                //         if(route.path === '/auth') {
                //             await router.push('/')
                //         }
                //
                //     } catch (e) {
                //         // await kokiApp.logOut()
                //     }
                // }
            } else {
                // kokiApp.token = ''
            }
        })


        // listen user data change => update
    })

    return {
        provide: {
            firebase: app,
            analytics
        }
    }
})
