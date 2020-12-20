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

        const response = await axios.put(`https://coach-db-78f35-default-rtdb.firebaseio.com/coaches/${userId}.json`, coachData);
        
        const responseData = await response.data;

        if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to featch');
            throw error;
        }


        context.commit('registerCoach', {
            ...coachData,
            id: userId
        });
    },
    async loadCoaches(context) {
        const response = await axios.get('https://coach-db-78f35-default-rtdb.firebaseio.com/coaches.json');
           
        if (!response.ok) {
            // error
        }

        const responseData = response.data;

        const coaches = [];
        for (const key in responseData) {
            const coach = {
                firstName: responseData[key].firstName,
                lastName: responseData[key].lastName,
                description: responseData[key].desccription,
                hourlyRate: responseData[key].hourlyRate,
                areas: responseData[key].areas
            };

            coaches.push(coach);
        }

        context.commit('setCoaches', coaches);
    }
};