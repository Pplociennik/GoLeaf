import React from 'react'
import TempPic from './../../../../assets/default-profile-pic.png'

function LeaderboardCard(props) {

        return (
            <li className="collection-item">
                <span className="member-login">{props.position}</span>
                <img src={TempPic} alt="User avatar" title="User avatar" width="128" height="128" />
                <span className="member-login">{props.userLogin}</span>
                <span className="member-login">{props.points}</span>
            </li>
        )

}

export default LeaderboardCard;