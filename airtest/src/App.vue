<template>
  <v-app>
    <v-main>
      <Appointment/>
    </v-main>
  </v-app>
</template>

<script>
import Appointment from './components/Appointment';

export default {
  name: 'App',

  components: {
    Appointment,
  },

  data: () => ({
    //
  }),
};
</script>
