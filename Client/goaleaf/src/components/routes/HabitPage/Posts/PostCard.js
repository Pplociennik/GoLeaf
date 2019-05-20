import React from 'react'
import { changeDateFormat1 } from './../../../../functions'

function PostCard(props) {

    return (
        <li>
            <div>
                <h4>{props.creatorLogin}</h4>
                <p>{props.postText}</p>
                <div>
                    {props.currentUserLogin === props.creatorLogin ? <button onClick={() => props.handlePostCardDeleted(props.id)}>Delete</button> : null}
                </div>
            </div>
        </li>
    )
}

export default PostCard;