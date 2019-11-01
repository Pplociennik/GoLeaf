import React from 'react'
import TempPic from './../../../../assets/default-profile-pic.png'

function LeaderboardCard(props) {

        return (
            <li className="collection-item" style={{fontSize: '0.6em'}}>
                <div style={{display: 'flex', justifyContent: '', alignItems: 'center', width: '100%', overflow: 'hidden'}}>
                        <span className="member-login" style={{marginRight: '20px'}}>{props.position}.</span>
                        <img src={TempPic} alt="User avatar" title="User avatar" width="128" height="128" />
                        <span className="member-login">{props.userLogin}</span>      
                    </div>
                        <span className="member-login" style={{width: '80px'}}>{props.points} pts</span>
            </li>
        )

}

export default LeaderboardCard;