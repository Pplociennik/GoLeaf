import React from 'react'
import './HabitCard.scss'

function HabitCard(props) {
  const dateObj = new Date(props.startedOn);
  const day = dateObj.getUTCDate();
  const month = dateObj.getUTCMonth() + 1;
  const year = dateObj.getUTCFullYear();
  const startedOn = day + "/" + month + "/" + year;

    return (
      <div className={`habit-card ${props.category}`} onClick={ () => props.habitCardClicked(props.id)}>
          <h2 className="habit-card-title">{props.title}</h2>
          <div className="habit-card-info-con">
            <div className="habit-card-info">
              <h3 className="habit-card-info started-date"><i className="far fa-calendar-alt fa-xs"></i> {startedOn}</h3>
              <h3 className="habit-card-info created-by"><i className="fas fa-user fa-xs"></i> {props.login}</h3>
              <h3 className="habit-card-info frequency"><i className="fas fa-history fa-xs"></i> {props.frequency}</h3>
            </div>
            <h3 className="habit-card-info members-number"><i className="fas fa-user-friends fa-sm"></i> {props.membersNumber}</h3>
          </div>

      </div>
    )
  }

export default HabitCard;