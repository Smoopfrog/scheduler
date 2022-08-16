import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";
import "components/Appointment/styles.scss"
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";



export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);
    
    props.bookInterview(props.id, interview)
    .then(() => {transition(SHOW)})
    .catch((err) => {
      console.log('err', err)
      transition(ERROR_SAVE, true)
    });
  }
  console.log("mode", mode)

  const remove = () => {

    transition(DELETING, true);

    props.cancelInterview(props.id)
    .then(() => {transition(EMPTY)})
    .catch((err) => {
      console.log("err", err)
      transition(ERROR_DELETE, true)
    })
  }
  
  return (
    <article className="appointment">
      <Header
        time={props.time}
      />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === SAVING && <Status message={SAVING} />}
      {mode === DELETING && <Status message={DELETING} />}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={back} onSave={save}/>}
      {mode === EDIT && <Form interviewers={props.interviewers} onCancel={back} onSave={save}/>}
      {mode === CONFIRM && <Confirm onConfirm={remove} />}
      {mode === ERROR_DELETE && <Error onClose={back}/>}
      {mode === ERROR_SAVE && <Error onClose={back}/>}

    </article>
  )
}