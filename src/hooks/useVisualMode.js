import { useState } from "react";

const useVisualMode = initial => {
  const [mode, setMode] = useState(initial); 
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    setMode(newMode)
    
    if(replace) {
      // replace the mode on top with newMode
      let replaceHistory = history
      replaceHistory[replaceHistory - 1] = newMode
      setHistory(replaceHistory)
    } else {
      // add the new mode to the stack
      setHistory([...history, newMode])
    }
  }

  const back = () => {
    let newHistory = [...history]

    // Pop out the most recent mode
    newHistory.pop();
    setHistory(newHistory)

    // Check if history is empty 
    if(history.length > 1 ) {
      setMode(newHistory[newHistory.length - 1])
    }
  }

  return { mode, transition, back };
}

export default useVisualMode;