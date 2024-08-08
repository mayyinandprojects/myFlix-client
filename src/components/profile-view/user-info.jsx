import React from 'react';

function UserInfo({email,name}){
    return(
        <>
        <h3>User Info</h3>
        <p>User: {name}</p>
        <p>Email: {email}</p>
        </>
    )
}

export default UserInfo