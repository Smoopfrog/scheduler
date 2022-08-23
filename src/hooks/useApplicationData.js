import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')

    ])
      .then(all => {
        setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
      })
  }, [])

  const updateSpots = function (id, state) {
    // Find the day using the id
    const currentDay = state.days.find((day) =>
      day.appointments.includes(id)
    );

    // ind number of spots available for the day
    const nullAppointments = currentDay.appointments.filter(
      (id) => !state.appointments[id].interview
    );
    // set spots to the number of null appointments
    const spots = nullAppointments.length;

    // Copy the state
    const newDay = { ...currentDay, spots };
    const newDays = state.days.map((day) => {
      return day.name === state.day ? newDay : day;
    });

    // update the state
    setState({ ...state, days: newDays });

    return newDays;
  };

  const bookInterview = (id, interview) => {
    // Creates a new appointment
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    // Sets appointments with new interview
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const newState = {
      ...state,
      appointments,
    };

    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => {
        updateSpots(id, newState)
      })
      .catch(err => {
        console.log('err', err)
        throw err;
      })
  }

  const cancelInterview = (id) => {
    // Sets interview to null
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    // Sets appointments with new interview
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const newState = {
      ...state,
      appointments,
    };

    return axios.delete(`/api/appointments/${id}`, appointment)
      .then(() => {
        updateSpots(id, newState)
      })
      .catch(err => {
        console.log('err', err)
        throw err;
      })
  }
  return { state, setDay, bookInterview, cancelInterview }
}

