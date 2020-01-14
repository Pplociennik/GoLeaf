import React from 'react'
import './HabitCard.scss'
import {changeDateFormat} from '../../../js/helpers'

function HabitCard(props) {

    return (
      <div className={`habit-card habit-card-${props.status} ${props.category}`} onClick={ () => props.habitCardClicked(props.id)}>
          <h2 className="habit-card-title">{props.title}</h2>
          <div className="habit-card-info-con">
            <div className="habit-card-info">
              <h3 className="habit-card-info started-date"><span role="img" aria-label="icon">📆</span>{changeDateFormat(props.startedOn)}</h3>
              <h3 className="habit-card-info created-by"><span role="img" aria-label="icon">🙍‍</span> {props.login}</h3>
              <h3 className="habit-card-info privacy"><span role="img" aria-label="icon">🔒</span> {props.private ? 'Private' : 'Public'}</h3>
            </div>
            <div className="habit-card-info-right">
              <h3 className="habit-card-info members-number"><span role="img" aria-label="icon">👪</span> {props.membersNumber}</h3>
            </div>
          </div>

      </div>
    )
  }

export default HabitCard;