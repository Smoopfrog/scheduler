export function getAppointmentsForDay(state, day) {
  let appointmentsArr = [];

  state.days.forEach(stateDay => {
    if(stateDay.name === day) {
      stateDay.appointments.forEach(appointmentId => {
        appointmentsArr.push(state.appointments[appointmentId])
      })
    } 
  })
  return appointmentsArr;
}