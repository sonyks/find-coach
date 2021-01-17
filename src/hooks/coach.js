import {  computed } from 'vue';
import { useStore } from 'vuex';

export default function useCoach(isLoading, activeFilters) {
    const store = useStore();

    const isLoggedIn = computed(() => {
        return store.getters.isAuthenticated;
    })

    const isCoach = computed(() => {
        return store.getters['coaches/isCoach'];
    })

    const hasCoaches = computed(() => {
        return !isLoading && store.getters['coaches/hasCoaches'];
    })

    const filteredCoaches = computed(() => {
        const coaches = store.getters['coaches/coaches'];
        return coaches.filter((coach) => {
            if (activeFilters.frontend && coach.areas.includes('frontend')) {
                return true;
            }
            if (activeFilters.backend && coach.areas.includes('backend')) {
                return true;
            }
            if (activeFilters.career && coach.areas.includes('career')) {
                return true;
            }
            return false;
        });
    })

    return {
        isLoggedIn,
        isCoach,
        hasCoaches,
        filteredCoaches
    }
}