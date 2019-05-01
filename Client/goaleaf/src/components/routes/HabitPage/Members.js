import React from 'react';

const Members = ({ members }) => {

    return (
        <div>
            {
                members.map(member => {
                    return(
                        <div key={member.id}>
                            <div>{member.login}</div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Members;