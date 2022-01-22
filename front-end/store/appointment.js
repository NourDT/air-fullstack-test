import moment from 'moment-timezone'

const dateToday = () => {
    return moment(new Date()).tz('Asia/Kuala_Lumpur').format('yyyy-MM-D HH:mm')
}

export const state = () => ({
    selectedDate: null, 
    currentDate: dateToday,
    loading: false,
    timezone: 'Asia/Kuala_Lumpur',
    availableSlot: []
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

    availableSlot(state) {
        const selectedDate = state.selectedDate;

        const currentDate = state.currentDate.split(" ");
        const currentTime = currentDate[1].split(":");
        const currentHour = currentTime[0];
        const currentMinute = currentTime[1];
        const isDateToday = (selectedDate == currentDate);

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
                return true
            }
        }).forEach(slot => {
            availableSlot.push(slot)
        })
  
        state.availableSlot = availableSlot
    }
}

export const actions = {

}

