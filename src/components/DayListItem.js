import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

const formatSpots = spots => {
  if(!spots) {
    return "no spots remaining"
  }
  
  if(spots === 1) {
    return "1 spot remaining"
  }

  return `${spots} spots remaining`
}

export default function DayListItem(props) {
  const dayClass = classNames(
    'day-list__item',
    {'day-list__item--selected': props.selected}
  );

  const spotString = formatSpots(props.spots);

  return (
    <li 
      className={dayClass} 
      onClick={() => props.setDay(props.name)}
      data-testid="day"
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{spotString}</h3>
    </li>
  );
}