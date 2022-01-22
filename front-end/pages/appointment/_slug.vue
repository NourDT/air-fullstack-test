<template>
   <v-container class="fill-height flex-column">

    <div class="my-5">
        <router-link to="/"> Go back </router-link>       
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
                <v-date-picker no-title :value="selectedDate" />
            </v-col>
        </v-row>
   
    </v-card>

   </v-container>
</template>
<script>
import moment from 'moment-timezone'

export default {
    async asyncData({ params }) {
        const slug = params.slug
        return { slug }
    },
    data: () => ({
        selectedDate: '',
        
    })
}
</script>

<style>

</style>