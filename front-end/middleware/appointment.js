export default function ({store, _}) {
    console.log('middleware')
    store.dispatch('appointment/showAllAppointmentsDate');
}