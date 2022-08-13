import { useEffect, useState } from "react";

const useVisualMode = initial => {
  const [mode, setMode] = useState(initial); 
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    setMode(newMode)
    setHistory([...history, newMode])
    
    if(replace) {
      let replaceHistory = history
      replaceHistory[replaceHistory - 1] = newMode
      setHistory(replaceHistory)
    }
  }

  const back = () => {
    let newHistory = [...history]

    newHistory.pop();
    setHistory(newHistory)

    if(history.length > 1 ) {
      setMode(newHistory[newHistory.length -1 ])
    }
  }

  return { mode, transition, back };
}

export default useVisualMode;