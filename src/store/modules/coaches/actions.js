import axios from 'axios';

export default {
    async registerCoach(context, data) {
        const userId = context.rootGetters.userId;
        const coachData = {
            firstName: data.first,
            lastName: data.last,
            description: data.desc,
            hourlyRate: data.rate,
            areas: data.areas
        };

        const token = context.rootGetters.token;
        await axios.put(`https://coach-db-78f35-default-rtdb.firebaseio.com/coaches/${userId}.json?auth=${token}`, coachData);
        
        context.commit('registerCoach', {
            ...coachData,
            id: userId
        });
    },
    async loadCoaches(context, payload) {
        if(payload.forceRefresh && !context.getters.shouldUpdate) {
            return;
        }
        
        const response = await axios.get('https://coach-db-78f35-default-rtdb.firebaseio.com/coaches.json');
        const responseData = response.data;

        const coaches = [];
        for (const key in responseData) {
            const coach = {
                id: key,
                firstName: responseData[key].firstName,
                lastName: responseData[key].lastName,
                description: responseData[key].description,
                hourlyRate: responseData[key].hourlyRate,
                areas: responseData[key].areas
            };

            coaches.push(coach);
        }

        context.commit('setCoaches', coaches);
        context.commit('setFetchTimestamp');
    }
};