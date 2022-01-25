<template>
   <v-container class="fill-height flex-column">
    <AppointmentModal :show="showAppointmentModal" @done="appointmentApproved" @close="close"/>
    <ThankyouModal :model="showThankyouModal" @done="homePage" :message="message"/>

    <div class="my-5">
        <NuxtLink to="/"> Go back </NuxtLink>       
    </div> 

    <v-card
        class="mx-auto my-5 px-5" max-width="1200">
        <v-row>
            <v-col>
               <v-card-text>   
                   <v-row>
                       <div class="text--secondary">john Doe</div>
                   </v-row>
                   <v-row>
                       <span class="text-h5 font-weight-bold mb-4">Event name goes here</span>
                    </v-row>
                     <v-row>
                      
                    <p class="text--secondary"> 
                        <v-icon small left>
                                mdi-alarm
                             </v-icon>
                             <span>30 mins</span>
                    </p>
                    </v-row>
                      <v-row>
                       <p class="text--secondary"><v-icon small left>
                                mdi-earth
                             </v-icon>Asia/Kuala_lumpur</p>
                    </v-row>
                    <v-row>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        </p>
                    </v-row>
                </v-card-text>
              
            </v-col>
                <v-col :cols="1">
                <v-divider vertical >
                </v-divider>
        </v-col>
            <v-col>
                <v-date-picker 
                no-title
                 :min="dateStart" 
                 full-width 
                 :events="appointments"
                 @change="dateSelected"
                />
            </v-col>
        </v-row>
   
    </v-card>

   </v-container>
</template>
<script>
import moment from 'moment-timezone'
import { mapMutations, mapActions, mapGetters } from 'vuex'
import AppointmentModal from '~/components/appointment/modal.vue'
import ThankyouModal from '~/components/thankyou-modal.vue'

export default {
    middleware: ['appointment'],
    async asyncData({ params }) {
        const slug = params.slug
        return { slug }
    },
    components: { AppointmentModal, ThankyouModal },

    data: () => ({
        currentDate: null,
        showAppointmentModal: false,
        showThankyouModal: false,
        message: "",
        dateStart: moment(new Date()).tz('Asia/Kuala_Lumpur').format('yyyy-MM-D')    
    }),
    methods: {
        ...mapMutations('appointment', ['setSelectedDate', 'setCurrentDate', 'availableSlot']),
        ...mapActions('appointment', ['createAppointment']),
        ...mapGetters('appointment', ['getAllAppointments']),
        dateSelected(date) {
            // set the selected date to the store
            this.setSelectedDate(date)
            //set the current date and time
            this.setCurrentDate(moment(new Date()).tz('Asia/Kuala_Lumpur').format('yyyy-MM-D HH:mm'))
            // generates available slot
            this.availableSlot();
            
            // show a dialog / modal
            this.showAppointmentModal = true
        },
        async appointmentApproved(haveData) {

            const response = await this.createAppointment(this.slug)
            console.log(response)
            if (response.ok == true) {
                this.showAppointmentModal = false;
                // save to message in this page
                this.message = response.message;
                if (haveData) this.showThankyouModal = true
            }
        
        }, 
        close() {
            // close modal only
             this.showAppointmentModal = false;
        },
        homePage() {
            this.showThankyouModal = false
            // redirect back to home page
            location.replace('/');
        }, 
        appointments(date) {
            const [year,month, day] = date.split('-')
            
            const appointmentDetails = this.getAllAppointments();
        
           
            appointmentDetails.forEach(({ date }) => {
                const [aYear,aMonth,aDay] = date.split('-')
                if (aYear === year && month === aMonth && aDay === day) {
                    console.log(day,aDay)
                }
            })   
        }
    }
}
</script>

<style>

</style>