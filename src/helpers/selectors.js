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

export function getInterviewersForDay(state, day) {
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


export function getInterview(state, interview) {
  
  if (interview) {
    interview.interviewer = state.interviewers[interview.interviewer];
    return interview;
  }

  return null;
}