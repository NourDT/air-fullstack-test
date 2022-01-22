<template>
    <v-dialog persistent v-model="model">
        <v-card>
            <v-card-title>
                Appointment created 
            </v-card-title>
            <v-card-text>
                <p>Thank you, Your appointment has been approved.</p>
                   <router-link to="/">Back to home</router-link>
            </v-card-text>

            <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="secondary"
            text
            @click="$emit('done')"
          >
            close
          </v-btn>
        </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        props: {
            model: {
                default: () => {
                    return 'thankyou-modal'
                }
            }
        }, 

    }
</script>