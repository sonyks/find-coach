<template>
  <TheHeader />
  <router-view/>
</template>

<script>
import TheHeader from './components/layout/TheHeader';
import { computed, watch } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  components: {
    TheHeader
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    store.dispatch('tryLogin');

    const didAutoLogout = computed(() => store.getters.didAutoLogout);
    
    watch(didAutoLogout, function(newValue, oldValue) {
      if (newValue && newValue !== oldValue) {
        router.replace('/coaches');
      }
    });
    
    return {
      didAutoLogout
    }
  }
}

</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

* {
  box-sizing: border-box;
}

html {
  font-family: "Roboto", sans-serif;
}

body {
  margin: 0;
}
</style>
