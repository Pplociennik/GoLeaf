import React from 'react'
import { changeDateFormat } from './../../../functions.js'

function NotificationCard(props) {

    return (
        <div>
            <div>
                <h3>{changeDateFormat(props.date)}</h3>
                <h3>{props.description}</h3>
                <button onClick={() => props.handleNtfCardClicked(props.id, props.url)}>View</button>
                <button onClick={() => props.handleNtfCardDeleted(props.id, props.url)}>Delete</button>
            </div>
        </div>
    )
}

export default NotificationCard;