<template>
  <div>
    <base-dialog :show="!!error" title="An error occurred!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <coach-filter @change-filter="setFilters"></coach-filter>
    </section>
    <section>
      <base-card>
        <div class="controls">
          <base-button mode="outline" @click="loadCoaches(true)">Refresh</base-button>
          <base-button v-if="!isLoggedIn" link to="/auth?redirect=register">Login to register as Coach</base-button>
          <base-button v-if="!isCoach && !isLoading && isLoggedIn" link to="/register">Register as Coach</base-button>
        </div>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="hasCoaches">
          <coach-item
            v-for="coach in filteredCoaches"
            :key="coach.id"
            :id="coach.id"
            :first-name="coach.firstName"
            :last-name="coach.lastName"
            :rate="coach.hourlyRate"
            :areas="coach.areas"
          ></coach-item>
        </ul>
        <h3 v-else>No coaches found.</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import { reactive, ref } from 'vue';
import { useStore } from 'vuex';
import CoachItem from '../../components/coaches/CoachItem.vue';
import CoachFilter from '../../components/coaches/CoachFilter.vue';
import useCoach from '../../hooks/coach';

export default {
  components: {
    CoachItem,
    CoachFilter,
  },
  setup() {
    const isLoading = ref(false);
    const error = ref(null);
    const activeFilters = reactive({
      frontend: true,
      backend: true,
      career: true,
    });
    const store = useStore();

    const { isLoggedIn, isCoach, hasCoaches, filteredCoaches } = useCoach(isLoading.value, activeFilters);

    const setFilters = (updatedFilters) => {
      activeFilters.frontend = updatedFilters.frontend;
      activeFilters.backend = updatedFilters.backend;
      activeFilters.career = updatedFilters.career;
    }

    const loadCoaches = async (refresh = false) => {
      isLoading.value = true;
      try {
        await store.dispatch('coaches/loadCoaches', {
          forceRefresh: refresh,
        });
      } catch (error) {
        error.value = error.message || 'Something went wrong!';
      }
      isLoading.value = false;
    }

    const handleError = () => {
      error.value = null;
    }

    loadCoaches();

    return {
      isLoading,
      error,
      activeFilters,
      isLoggedIn,
      isCoach,
      filteredCoaches,
      hasCoaches,
      setFilters,
      loadCoaches,
      handleError
    }
  }
};
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