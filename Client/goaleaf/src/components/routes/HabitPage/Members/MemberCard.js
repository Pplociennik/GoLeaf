import React from 'react'
import { changeDateFormat1 } from './../../../../functions'
import axios from 'axios'
import TempPic from './../../../../assets/default-profile-pic.png'

function MemberCard(props) {

        return (
            <li className="collection-item">
                <img src={ TempPic } alt="User avatar" title="User avatar" width="128" height="128" />
                <span className="member-login">{props.userLogin}</span>
            </li>
        )

}

export default MemberCard;