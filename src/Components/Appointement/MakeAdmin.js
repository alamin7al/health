import { Alert, Button, TextField } from '@mui/material';
import React, { useState } from 'react';

const MakeAdmin = () => {
    const [email, setEmail] = useState('')
    const [success, setSuccess] = useState(false)
    const handleOnBlur = e => {
        setEmail(e.target.value)
    }
    const handleAdminSubmit = e => {
        const user = { email }
        fetch('http://localhost:5000/users/admin', {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    console.log(data);
                    setSuccess(true)
                }
            })
        e.preventDefault()
    }
    return (
        <div>
            <h3>Make Admin</h3>
            <form onSubmit={handleAdminSubmit}>

                <TextField
                    id="standard-basic"
                    type='email'
                    onBlur={handleOnBlur}
                    o
                    label="Standard"
                    variant="standard"
                />
                <Button variant='contained' type='submit'>Make Admin</Button>
            </form>
            {success && <Alert severity="success">Make Admin SuccessFully</Alert>}

        </div>
    );
};

export default MakeAdmin;