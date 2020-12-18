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
        
        //const responseData = await response.json();

        if (!response.ok) {
            // error
        }


        context.commit('registerCoach', {
            ...coachData,
            id: userId
        });
    },
    async loadCoaches(context) {
        const response = await axios.get('https://coach-db-78f35-default-rtdb.firebaseio.com/coaches.json');
        
        const responseData = await response.json();

        if (!response.ok) {
            // error
        }

        const coaches = [];
        for (const key in responseData) {
            const coach = {
                firstName: responseData[key].first,
                lastName: responseData[key].last,
                description: responseData[key].desc,
                hourlyRate: responseData[key].rate,
                areas: responseData[key].areas
            };

            coaches.push(coach);
        }

        context.commit('setCoaches', coaches);
    }
};