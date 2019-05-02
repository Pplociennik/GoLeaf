import React from 'react';

const Members = ({ members }) => {

    return (
        <div>
            {
                members.map(member => {
                    return(
                        <div key={member.id}>
                            <h3>{member.login}</h3>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Members;