import React from 'react'
import './HabitCard.scss'

function HabitCard(props) {
  const dateObj = new Date(props.startedOn);
  const day = dateObj.getUTCDate();
  const month = dateObj.getUTCMonth() + 1;
  const year = dateObj.getUTCFullYear();
  const startedOn = day + "/" + month + "/" + year;

    return (
      <div className={`habit-card ${props.category}`}>
          <h2 className="habit-card-title">{props.title}</h2>
          <h3 className="started-date">started on: <span className="card-information">{startedOn}</span></h3>
          <h3 className="created-by">by: <span className="card-information">{props.login}</span></h3>
          <h3 className="frequency">recurrence: <span className="card-information">{props.frequency}</span></h3>
      </div>
    )
  }

export default HabitCard;