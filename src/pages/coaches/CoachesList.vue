<template>
    <base-dialog :show="!!error">
        <p>{{ error }}</p>
    </base-dialog>
    <section>
        <coach-filter @change-filter="setFilters"></coach-filter>
    </section>
    <section>
        <base-card>
            <div class="controls">
                <base-button mode="outline" @click="loadCoaches">Refresh</base-button>
                <base-button link to="/register" v-if="!isCoach && !isLoading">Register as Coach</base-button>
            </div>
            <div v-if="isLoading">
                <base-spinner></base-spinner>
            </div>
            <ul v-else-if="hasCoaches">
                <coach-item v-for="coach in filteredCoaches" 
                :key="coach"
                :id="coach.id"
                :first-name="coach.firstName"
                :last-name="coach.lastName"
                :rate="coach.hourlyRate"
                :areas="coach.areas">
                </coach-item>
            </ul>
            <h3 v-else>No coaches found.</h3>    
        </base-card> 
    </section>
</template>

<script>
import CoachItem from "../../components/coaches/CoachItem";
import CoachFilter from "../../components/coaches/CoachFilter";
export default {
    components: {
        CoachItem,
        CoachFilter
    },
    computed: {
        filteredCoaches() {
            var coaches = this.$store.getters['coaches/coaches'];
            var filters = this.activeFilters;
            var filteredCoaches = coaches.filter(coach => {
                if (filters.frontend && coach.areas.val.includes('frontend')) {
                    return true;
                }
                if (filters.backend && coach.areas.val.includes('backend')) {
                    return true;
                }
                if (filters.career && coach.areas.val.includes('career')) {
                    return true;
                }
                return false;
            });
            return filteredCoaches;
        },
        hasCoaches() {
            return !this.isLoading && this.$store.getters['coaches/hasCoaches'];
        },
        isCoach() {
            return this.$store.getters['coaches/isCoach'];
        }
    },
    methods: {
        setFilters(updatedFilters) {
            this.activeFilters = updatedFilters;
        },
        async loadCoaches() {
            this.isLoading = true;
            try {
                await this.$store.dispatch('coaches/loadCoaches');
            } catch (error) {
                this.error = error.message || 'Something went wrong';
            }
            
            this.isLoading = false;
        }
    },
    created() {
        this.loadCoaches();
    },
    data() {
        return {
            isLoading: false,
            error: null,
            activeFilters: {
                frontend: true,
                backend: true,
                career: true
            }
        }
    }
}
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>