import React from 'react'
import CompleteTask from './CompleteTask';

function TaskCard(props) {

        return (
            <li className="collection-item">
                <span className="member-login">{props.description}</span>
                <span className="member-login">{props.points}</span>
                <CompleteTask id={props.id} description={props.description} points={props.points} habitID={props.habitID}/>
            </li>
        )

}

export default TaskCard;