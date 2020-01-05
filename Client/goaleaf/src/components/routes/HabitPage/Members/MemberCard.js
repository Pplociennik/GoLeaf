import React from 'react'
import TempPic from './../../../../assets/default-profile-pic.png'
import Popup from "reactjs-popup"
import './Members.scss'

function MemberCard(props) {

        return (
            <li className="collection-item">
                <img src={`data:image/png;base64,${props.profilePic}`} alt="User avatar" title="User avatar" width="128" height="128" />
                <span className="member-login">{props.userLogin}</span>
                {props.isAdmin && (props.currentUser !== props.userID) ?                     
                <Popup trigger={
                    <button className="kick-user-btn secondary-content" onClick={() => props.banUser(props.habitID, props.userID)}>kick</button>
                    } modal closeOnDocumentClick
                            contentStyle={{
                                maxWidth: '80%',
                                width: '500px',
                                backgroundColor: '#f2f2f2',
                                borderRadius: '30px',
                                border: "none",
                                minHeight: '200px'
                            }}
                            overlayStyle={{
                                background: "rgb(0,0,0, 0.4)"
                            }}
                        >
                            {close => (
                            <div className="member-popup">
                                <div className="delete-member-title">Are you sure you want to kick this user?</div>
                                <div className="delete-member-buttons">
                                    <button className="delete-member-btn" onClick={() => props.banUser(props.habitID, props.userID)}>Kick</button>
                                    <button className="delete-member-back" onClick={close}>Back</button>
                                </div>
                            </div>
                            )}
                        </Popup>
                : null}
            </li>
        )

}

export default MemberCard;