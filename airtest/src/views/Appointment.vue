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
            <p class="text--secondary">30 Minutes</p>
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
          <div v-if="timeLoading" class="text-center">
            <Loader />
          </div>
          <v-card-text v-else>
            <p class="text-h5 text--secondary">
              {{ getFormattedDate }}
            </p>
            <div v-if="availableTimes.length">
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
            </div>
            <p v-else>No available timings</p>
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import moment from 'moment-timezone'
import Dialog from '../components/Dialog.vue'
import Loader from '../components/Loader.vue'
import { getAppointments, createAppointment } from '../services/appointment'

const MALAYSIA_TZ = 'Asia/Kuala_Lumpur'
const defaultTimes = [
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
]

export default {
  name: 'Appointment',
  components: {
    Dialog,
    Loader
  },

  data: () => ({
    id: '',
    selectedDate: '',
    selectedTime: '',
    availableTimes: defaultTimes,
    minDate: moment(new Date()).tz(MALAYSIA_TZ).format('yyyy-MM-D'),
    showThankYou: false,
    loading: false,
    timeLoading: false
  }),

  created() {
    // Redirect back to home page if no id is present
    this.id = this.$route.query.id
    if (!this.id) return this.$router.push({ name: 'Home' })
    this.buildDefaultTimes()
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
    buildDefaultTimes() {
      // Builds a list of times
      const currentTime = moment(new Date()).tz(MALAYSIA_TZ).format('HH:mm').split(':')
      const currentHour = currentTime[0]
      const currentMinute = currentTime[1]
      this.availableTimes = []
      for (let i = currentHour; i < 17; i++) {
        // Skip hours that are before 1pm
        if (i < 13) continue
        if (currentHour === i) {
          // If it has not pass the 30 minute mark yet
          if (currentMinute < 30 && i > 13) this.availableTimes.push(`${currentHour}:30`)
        } else {
          this.availableTimes.push(`${i}:00`)
          // Stop at 4pm
          if (i < 16) this.availableTimes.push(`${i}:30`)
        }
      }
      // If theres no available times for today, then start from tomorrow onwards
      if (!this.availableTimes.length) this.minDate = moment(new Date(), "yyyy-MM-D").tz(MALAYSIA_TZ).add(1, 'days').format('yyyy-MM-D');
    },
    getFormattedTime(time) {
      if (!time) return ''
      return moment(time, 'HH:mm').format('hh:mma')
    },
    updateAvailableTimes(appointments = []) {
      for (let appointment of appointments) {
        // stop the loop early if no more available times
        if (!this.availableTimes.length) break
        // remove already booked appointment times
        this.availableTimes = this.availableTimes.filter(time => time !== appointment.time)
      }
      this.timeLoading = false
    },
    onDateSelected(date) {
      // Set to default times if its not today's date, else check if time has already pass
      if (moment(new Date(date)).tz(MALAYSIA_TZ).format('yyyy-MM-D') !== moment(new Date()).tz(MALAYSIA_TZ).format('yyyy-MM-D')) {
        this.availableTimes = defaultTimes;
      } else {
        this.buildDefaultTimes()
      }
      this.selectedDate = date
      this.getTimes(date)
    },
    async getTimes(date) {
      this.timeLoading = true
      try {
        const resp = await getAppointments(date)
        const data = resp.data
        if (data && data.Item && data.Item.appointments.length) return this.updateAvailableTimes(data.Item.appointments)
        this.timeLoading = false
      } catch (error) {
        this.timeLoading = false
        alert(error)
      }
    },
    onTimeSelected(time) {
      this.selectedTime = time
    },
    async confirmAppointment() {
      this.loading = true;
      try {
        await createAppointment({
          date: this.selectedDate,
          time: this.selectedTime,
          id: this.id
        })
        this.loading = false
        this.showThankYou = true
        this.getTimes(this.selectedDate)
      } catch (error) {
        this.loading = false
        alert(error)
      }
    },
    closeDialog() {
      // Persist dialog if http request still ongoing
      if (this.loading) return
      this.selectedTime = ''
      this.showThankYou = false
    }
  }
}
</script>
