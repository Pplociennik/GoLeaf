import React from 'react'
import './HabitCard.scss'

function HabitCard(props) {
    return (
      <div className={`habit-card ${props.category}`}>
          <h2 className="habit-card-title">{props.title}</h2>
          <span>{props.login}</span>
      </div>
    )
  }

export default HabitCard;