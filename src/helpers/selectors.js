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
  let InterviewersArr = [];

  state.days.forEach(stateDay => {
    if(stateDay.name === day) {
      stateDay.interviewers.forEach(interviewerId => {
        InterviewersArr.push(state.interviewers[interviewerId])
      })
    }
  })
  return InterviewersArr;
}


export function getInterview(state, interview) {
  
  if (interview) {
    interview.interviewer = state.interviewers[interview.interviewer];
    return interview;
  }

  return null;
}