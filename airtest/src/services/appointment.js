import axios from 'axios'

const baseUrl = 'https://k6bo06qwn2.execute-api.ap-southeast-1.amazonaws.com/appointments'

export const getAppointments = async (date) => axios.get(`${baseUrl}/${date}`)

export const createAppointment = async (data) => axios.post(baseUrl, data, {
  headers: {
    "Access-Control-Allow-Origin": "*"
  }
})
