<template>
  <v-container>
    <h1>Select a link below:</h1>
    <div>
      <template v-for="id in ids">
        <p :key="id">
          <router-link :to="`/appointments?id=${id}`">{{ `/appointments?id=${id}` }}</router-link>
        </p>
      </template>
    </div>
  </v-container>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';

export default {
  name: 'Home',
  data: () => ({
    ids: []
  }),
  created() {
    // Generate 3 random links
    for (let i = 0; i < 3; i++) {
      this.ids.push(uuidv4())
    }
  },
}
</script>
