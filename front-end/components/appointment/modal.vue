<template>
    <v-dialog persistent v-model="model">
        <v-card>
            <v-card-title>
                Create an appointment on this date {{ this.getSelectedDate }}
            </v-card-title>
            <v-card-text>
                 <v-select
                    required
                    :items="this.getAvailableSlot"
                    v-model="this.defaultTimeSlot"
                    outlined
                    :rules="rules.select"
                    label="Pick a time slot"
                />
            </v-card-text>
            <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="accepted"
          >
            I accept
          </v-btn>
        </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    props: {
        model: {
            default: () => {
                return "appointment-modal"
            }
        }
    },

    data: () => ({
        timeSlot: "",
        rules: {
            select: [(v) => !!v || "Select a time slot"],
        }
    }),
    computed: {
        ...mapGetters('appointment', ['getSelectedDate', 'getCurrentDate', 'getAvailableSlot']),
        defaultTimeSlot() {
            return this.timeSlot = this.getAvailableSlot[0]
        }
    },
    methods: {
        accepted() {
            if (this.timeSlot) {
                 this.$emit('done')
            }
           
        }
    }
}
</script>