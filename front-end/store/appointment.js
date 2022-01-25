import axios from 'axios'
import moment from 'moment-timezone'

const dateToday = () => {
    return moment(new Date()).tz('Asia/Kuala_Lumpur').format('yyyy-MM-D HH:mm')
}

export const state = () => ({
    selectedDate: null, 
    currentDate: dateToday,
    loading: false,
    timezone: 'Asia/Kuala_Lumpur',
    availableSlot: [],
    selectedTime: null,
    allAppointments: []
})

export const getters = {
    // get the current state of the selected date
    getSelectedDate: (state) => {
        return state.selectedDate
    },
    getTimezone: (state) => {
        return state.timezone
    }, 
    getAvailableSlot: (state) => {
        return state.availableSlot;
    },
    // get all appointment state
    getAllAppointments: (state) => {
        return state.allAppointments
    }
}

export const mutations = {
    // saved the selected date
    setSelectedDate(state, date) {
        state.selectedDate = date;
    },

    //current date 
    setCurrentDate(state, currentDate) {
        state.currentDate = currentDate
    },

    // clear the selected date
    clearSelectedDate(state) {
        state.selectedDate = null
    },

    selectedTime(state, time) {
        state.selectedTime = time
    },

    availableSlot(state) {
        const selectedDate = state.selectedDate;

        const currentDate = state.currentDate.split(" ");
        const currentTime = currentDate[1].split(":");
        const currentHour = currentTime[0];
        const currentMinute = currentTime[1];
        const isDateToday = (selectedDate == currentDate[0]);

        // Set a working hours start at 1pm ends to 6pm;
        const workingHours = ['13:00', '13:30', '14:00', '14:30', '15:00', '15:30'];

        // Set availableSlot
        let availableSlot = [];
     
        workingHours.filter(slot => {
            const [ slotHour, slotMinute ] = slot.split(':')
           
            // validates the current date
            if (slotHour === currentHour && currentMinute < slotMinute && isDateToday ) {
                return false
            } else { 
                if (slotHour < currentHour && isDateToday) {
                    return false;
                }
                const filterAppointments = state.allAppointments.filter(({date, time}) => (date === currentDate[0] && time === slot))
                return !(filterAppointments.length > 0) ? true: false;
            }
        }).forEach(slot => {
            availableSlot.push(slot)
        })
  
        state.availableSlot = availableSlot
    },
    setAllAppointment(state, appointments) {
        state.allAppointments = appointments;
    }
}

export const actions = {
    async createAppointment({ state }, uuid) {

        try {
            const { data } = await axios.post('https://d98wd0ktw4.execute-api.us-east-1.amazonaws.com/dev/appointment', 
            {
                date: state.selectedDate,
                time: state.selectedTime,
                id: uuid
            })
    
            return data;
        } catch(e) {
            alert('endpoint have an issue please contact the developers');
        }     
    },

    async showAllAppointmentsDate({ commit }) {
        // show all the appointments

        try {
            const { data } = await axios.get(`https://d98wd0ktw4.execute-api.us-east-1.amazonaws.com/dev/appointment`);
            console.log('get all appointment', data)
            commit('setAllAppointment', data.appointment);
        } catch (e) {
            alert('endpoint have an issue please contact the developers');
        }
      
    }
}

