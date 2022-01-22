<template>
  <v-container>
    <h1>Client Appointment link:</h1>
    <div>
      <NuxtLink :to="`/appointment/${this.appointmentId}`">
      {{ this.appointmentId }} </NuxtLink>
    </div>
  </v-container>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';

export default {
  name: 'IndexPage',
  data: () => ({
    appointmentId: '',
    url: ''
  }), 
  created() {
    this.appointmentId = uuidv4();
    this.url = `/appointment/${this.appointmentId}`;
  }
}
</script>
