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

  const getDay = day => {
    const weekDays = {
      Monday: 0,
      Tuesday: 1,
      Wednesday: 2,
      Thursday: 3,
      Friday: 4
    }

    return weekDays[day];
  }

  const bookInterview = (id, interview) => {
    const currentDay = getDay(state.day)
    
    const spots = {
      ...state.days[currentDay],
      spots: state.days[currentDay].spots - 1
    }

    let days = state.days
    days[currentDay] = spots;

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => {
        setState({
          ...state,
          appointments,
        })
      })
      .catch(err => {
        console.log('err', err)
        throw err;
      })
  }

  const cancelInterview = (id) => {
    const currentDay = getDay(state.day)
    
    const spots = {
      ...state.days[currentDay],
      spots: state.days[currentDay].spots + 1
    }

    let days = state.days
    days[currentDay] = spots;

    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`, appointment)
      .then(() => {

        setState({
          ...state,
          appointments,
          days
        })
      })
      .catch(err => {
        console.log('err', err)
        throw err;
      })
  }
  return { state, setDay, bookInterview, cancelInterview }
}

