<template>
    <v-dialog persistent v-model="show">
        <v-card>
            <v-card-title>
                Create an appointment on this date {{ this.getSelectedDate }}
            </v-card-title>
            <v-card-text>
                 <v-select
                    required
                    :items="this.getAvailableSlot"
                    :v-model="this.defaultTimeSlot"
                    @change="updateTimeSlot"
                    outlined
                    :rules="rules.select"
                    label="Pick a time slot"
                    
                />
            </v-card-text>
            <v-card-actions>
                 <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="close"
          >
            Disagree
          </v-btn>
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
import { mapGetters, mapMutations } from 'vuex'

export default {
    props: {
        show: {
            default: () => {
                return false
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
        },
    },
    methods: {
        ...mapMutations('appointment', ['selectedTime']),
        close() {
            this.$emit('close', false)
        },

        updateTimeSlot(val) {
            console.log(val)
        },
        accepted() {
            console.log(this.timeSlot, 'here')
            if (this.timeSlot) {
                //save the time in store
                this.selectedTime(this.timeSlot);

                this.$emit('done', true)
            }
        }
    }
}
</script>