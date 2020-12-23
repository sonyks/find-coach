import axios from 'axios';

export default {
    async contactCoach(context, payload) {
        const newRequest = {
            userEmail: payload.email,
            message: payload.message
        };

        const response = await axios.post(`https://coach-db-78f35-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`, newRequest);
        const responseData = await response.data;

        if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to featch');
            throw error;
        }

        newRequest.id = responseData.name;
        newRequest.coachId = payload.coachId;

        context.commit('addRequest', newRequest);
    },
    async fetchRequests(context) {
        const coachId = context.rootGetters.userId;
        const response = await axios.get(`https://coach-db-78f35-default-rtdb.firebaseio.com/requests/${coachId}.json`);

        if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to featch requests');
            throw error;
        }

        const requests = [];
        const responseData = await response.data;
        for (const key in responseData) {
            const request = {
                id: key,
                coachId,
                userEmail: responseData[key].userEmail,
                message: responseData[key].message
            };
            
            requests.push(request);
        }

        context.commit('setRequests', requests);
    }
}