import React from 'react'
import { changeDateFormat } from './../../../functions.js'

function NotificationCard(props) {

    return (
        <div onClick={() => props.handleNtfCardClicked(props.id, props.url)}>
            <div>
                <h3>{changeDateFormat(props.date)}</h3>
                <h3>{props.description}</h3>
                <h3>{props.url}</h3>
            </div>
        </div>
    )
}

export default NotificationCard;