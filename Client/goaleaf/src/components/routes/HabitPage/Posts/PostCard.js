import React from 'react'
import { changeDateFormat1 } from './../../../../functions'

function PostCard(props) {

    return (
        <li>
            <div>
                <span>{props.creatorLogin}</span>
                <span>{props.postText}</span>
                <div>
                    <button onClick={() => props.handlePostCardEdited(props.id)}>Edit</button>
                    <button onClick={() => props.handlePostCardDeleted(props.id)}>Delete</button>
                </div>
            </div>
        </li>
    )
}

export default PostCard;