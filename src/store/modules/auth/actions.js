import axios from 'axios';

export default {
    async login(context, payload) {
        const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBe0pjRGCjk5ZJL03AIkUXXHjY_suDfJSI', 
        {
            email: payload.email,
            password: payload.password,
            returnSecureToken: true
        });

        const responseData = response.data;

        context.commit('setUser', {
            token: responseData.idToken,
            userId: responseData.localId,
            tokenExpiration: responseData.expiresIn
        });
    },
    async signup(context, payload) {
        const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBe0pjRGCjk5ZJL03AIkUXXHjY_suDfJSI', 
        {
            email: payload.email,
            password: payload.password,
            returnSecureToken: true
        });
        
        const responseData = response.data;

        context.commit('setUser', {
            token: responseData.idToken,
            userId: responseData.localId,
            tokenExpiration: responseData.expiresIn
        });
    }
}