<template>
  <v-container class="fill-height flex-column">
    <Dialog
      :show-dialog="!!selectedTime"
      :selected-date="getFormattedDate"
      :selected-time="getFormattedTime(selectedTime)"
      :showThankYou="showThankYou"
      :loading="loading"
      @close-dialog="closeDialog"
      @confirm-appointment="confirmAppointment"
    />
    <div class="my-5">
      <router-link to="/">Get links</router-link>
    </div>
    <v-card
      class="mx-auto"
      max-width="1200"
    >
      <v-row>
        <v-col>
          <v-card-text>
            <div>John Doe</div>
            <p class="text-h4 text--primary font-weight-bold">
              Quick Chat
            </p>
            <p class="text--secondary">10 Minutes</p>
            <p class="text--secondary">Asia/Kuala_Lumpur</p>
            <div class="text--primary">
              There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.
            </div>
          </v-card-text>
        </v-col>
        <v-col :cols="isSmallScreen ? 12 : 1" :style="{ flex: !isSmallScreen && 0 }">
          <v-divider vertical v-if="!isSmallScreen"></v-divider>
          <v-divider horizontal v-else></v-divider>
        </v-col>
        <v-col>
          <v-card-text class="text-center">
            <v-date-picker
              :value="selectedDate"
              :min="minDate"
              @change="onDateSelected"
            ></v-date-picker>
          </v-card-text>
        </v-col>
        <v-col v-if="selectedDate" :cols="isSmallScreen ? 12 : 1" :style="{ flex: !isSmallScreen && 0 }">
          <v-divider vertical v-if="!isSmallScreen"></v-divider>
          <v-divider horizontal v-else></v-divider>
        </v-col>
        <v-col v-if="selectedDate">
          <v-card-text>
            <p class="text-h5 text--secondary">
              {{ getFormattedDate }}
            </p>
            <template v-for="time in availableTimes">
              <div :key="time">
                <v-btn
                  class="ma-2"
                  outlined
                  color="primary"
                  @click="onTimeSelected(time)"
                >
                  {{ getFormattedTime(time) }}
                </v-btn>
              </div>
            </template>
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import moment from 'moment-timezone'
import Dialog from '../components/Dialog.vue'

const MALAYSIA_TZ = 'Asia/Kuala_Lumpur'

export default {
  name: 'Appointment',
  components: {
    Dialog
  },

  data: () => ({
    id: '',
    selectedDate: '',
    selectedTime: '',
    availableTimes: [
      '13:00',
      '13:30',
      '14:00',
      '14:30',
      '15:00',
      '15:30',
      '16:00',
    ],
    minDate: moment(new Date()).tz(MALAYSIA_TZ).format('yyyy-MM-D'),
    showThankYou: false,
    loading: false,
  }),

  created() {
    this.id = this.$route.query.id
    if (!this.id) return this.$router.push({ name: 'Home' })
  },

  computed: {
    isSmallScreen() {
      return this.$vuetify.breakpoint.name === 'sm' || this.$vuetify.breakpoint.name === 'xs'
    },
    getFormattedDate() {
      if (!this.selectedDate) return ''
      return moment(new Date(this.selectedDate)).tz(MALAYSIA_TZ).format('dddd DD MMMM YYYY')
    },
  },

  methods: {
    getFormattedTime(time) {
      if (!time) return ''
      return moment(time, 'HH:mm').format('hh:mma')
    },
    onDateSelected(date) {
      console.log(date)
      // TODO: make a call to backend to get unavailable times
      this.selectedDate = date
    },
    onTimeSelected(time) {
      console.log(time)
      this.selectedTime = time
    },
    confirmAppointment() {
      this.loading = true;
      console.log(this.selectedDate, this.selectedTime)
      // TODO: api call
      // this.showThankYou = true
    },
    closeDialog() {
      if (this.loading) return
      this.selectedTime = ''
    }
  }
}
</script>
