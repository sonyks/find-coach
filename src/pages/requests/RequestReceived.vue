<template>
    <base-dialog :show="!!error" title="An error occured!" @close="handleError">
        <p>{{ error }}</p>
    </base-dialog>
    <section>
        <base-card>
            <header>
                <h2>Requests Received</h2>
            </header>
            <base-spinner v-if="isLoading"></base-spinner>
            <ul v-else-if="hasRequests && !isLoading">
                <request-item v-for="req in receivedRequests" :key="req.id" :email="req.userEmail" :message="req.message"></request-item>
            </ul>
            <h3 v-else>You haven't received any requests yet!</h3>
        </base-card>
    </section>
</template>

<script>
import RequestItem from '../../components/requests/RequestItem.vue';
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

export default {
    components: {
        RequestItem
    },
    setup() {
        const isLoading = ref(false);
        const error = ref(null);
        const store = useStore();

        const receivedRequests = computed(() => {
            return store.getters['requests/requests'];
        });

        const hasRequests = computed(() => {
            return store.getters['requests/hasRequests'];
        });

        const loadRequests = async () => {
            isLoading.value = true;
            try {
                await store.dispatch('requests/fetchRequests');
            } catch (error) {
                error.value = error.message || 'Something failed';
            }
            isLoading.value = false;
        };

        const handleError = () => {
            error.value = null;
        };

        loadRequests();

        return {
            isLoading,
            error,
            receivedRequests,
            hasRequests,
            loadRequests,
            handleError
        }
    }
}
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>