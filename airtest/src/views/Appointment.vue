<template>
  <v-container class="fill-height flex-column">
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
            <v-date-picker></v-date-picker>
          </v-card-text>
        </v-col>
        <v-col :cols="isSmallScreen ? 12 : 1" :style="{ flex: !isSmallScreen && 0 }">
          <v-divider vertical v-if="!isSmallScreen"></v-divider>
          <v-divider horizontal v-else></v-divider>
        </v-col>
        <v-col>
          <v-card-text>
            <p class="text-h5 text--secondary">
              Friday 06 August 2021
            </p>
            <template v-for="x in [1,2,3]">
              <div :key="x">
                <v-btn
                  class="ma-2"
                  outlined
                  color="primary"
                >
                  12:30pm
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
  export default {
    name: 'Appointment',

    created() {
      if (!this.$route.query.id) this.$router.push({ name: 'Home' })
    },

    data: () => ({

    }),

    computed: {
      isSmallScreen() {
        return this.$vuetify.breakpoint.name === 'sm' || this.$vuetify.breakpoint.name === 'xs'
      }
    }
  }
</script>
