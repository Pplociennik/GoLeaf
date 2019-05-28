import React from 'react'
import './HabitCard.scss'
import {changeDateFormat} from './../../../functions.js'

function HabitCard(props) {

    return (
      <div className={`habit-card ${props.category}`} onClick={ () => props.habitCardClicked(props.id)}>
          <h2 className="habit-card-title">{props.title}</h2>
          <div className="habit-card-info-con">
            <div className="habit-card-info">
              <h3 className="habit-card-info started-date"><i className="far fa-calendar-alt fa-xs"></i> {changeDateFormat(props.startedOn)}</h3>
              <h3 className="habit-card-info created-by"><i className="fas fa-user fa-xs"></i> {props.login}</h3>
              <h3 className="habit-card-info privacy"><i className={props.private ? 'fas fa-lock fa-xs' : 'fa fa-lock-open fa-xs'}></i> {props.private ? 'Private' : 'Public'}</h3>
            </div>
            <div className="habit-card-info-right">
              <h3 className="habit-card-info members-number"><i className="fas fa-user-friends fa-sm"></i> {props.membersNumber}</h3>
            </div>
          </div>

      </div>
    )
  }

export default HabitCard;