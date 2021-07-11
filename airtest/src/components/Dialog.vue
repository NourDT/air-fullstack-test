<template>
  <v-dialog
    v-model="showDialog"
    width="500"
    persistent
    @click:outside="$emit('close-dialog')"
  >
    <v-card>
      <v-card-title>
        Please confirm your appointment time:
      </v-card-title>

      <v-card-text>
        <template v-if="showThankYou">
          <p>Thank you for confirming your appointment time.</p>
          <router-link to="/">Back to links</router-link>
        </template>
        <template v-else>
          <br>
          <h3>Date: <span class="text--primary">{{ selectedDate }}</span></h3>
          <br>
          <h3>Time: <span class="text--primary">{{ selectedTime }}</span></h3>
        </template>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions v-if="!showThankYou">
        <v-spacer></v-spacer>
        <v-btn
          color="red darken-1"
          text
          :disabled="loading"
          @click="$emit('close-dialog')"
        >
          Cancel
        </v-btn>
        <v-btn
          color="primary darken-1"
          text
          :loading="loading"
          :disabled="loading"
          @click="$emit('confirm-appointment')"
        >
          Confirm
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    showDialog: Boolean,
    selectedDate: String,
    selectedTime: String,
    showThankYou: Boolean,
    loading: Boolean,
  }
}
</script>
