import axios from 'axios';

let timer;

export default {
    async login(context, payload) {
        return context.dispatch('auth', {
            ...payload,
            mode: 'login'
        });
    },
    async signup(context, payload) {
        return context.dispatch('auth', {
            ...payload,
            mode: 'signup'
        })
    },
    async auth(context, payload) {
        const mode = payload.mode;
        let url = mode === 'signup' 
            ? 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBe0pjRGCjk5ZJL03AIkUXXHjY_suDfJSI'
            : 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBe0pjRGCjk5ZJL03AIkUXXHjY_suDfJSI';

        const response = await axios.post(url, 
        {
            email: payload.email,
            password: payload.password,
            returnSecureToken: true
        });

        const responseData = response.data;

        const expiresIn = +responseData.expiresIn * 1000;
        const expirationDate = new Date().getTime() + expiresIn;

        localStorage.setItem('token', responseData.idToken);
        localStorage.setItem('userId', responseData.localId);
        localStorage.setItem('tokenExpiration', expirationDate);

        timer = setTimeout(function() {
            context.dispatch('autoLogout');
        }, responseData.expiresIn);

        context.commit('setUser', {
            token: responseData.idToken,
            userId: responseData.localId
        });
    },
    tryLogin(context) {
        const token = localStorage.getItem('token');
        const userId = localStorage.setItem('userId');
        const tokenExpiration = localStorage.setItem('tokenExpiration');

        const expiresIn = +tokenExpiration - new Date().getTime();

        if (expiresIn < 0) {
            return;
        }

        timer = setTimeout(function() {
            context.dispatch('autoLogout');
        }, expiresIn);

        if (token && userId) {
            context.commit('setUser', {
                token,
                userId
            });
        }
    },
    logout(context) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('tokenExpiration');

        clearTimeout(timer);

        context.commit('setUser', {
            token: null,
            userId: null
        });
    },
    autoLogout(context) {
        context.dispatch('logout');
        context.commit('setAutoLogout');
    }
}