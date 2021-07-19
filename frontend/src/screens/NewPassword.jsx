import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom'
import { handleNewPassword } from '../api/auth';
import M from 'materialize-css';

const NewPassword = () => {
    const history = useHistory();
    const { token } = useParams();
    const [data, setData] = useState({
        password: '',
    });
    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.id] : e.target.value
        });
    }
    const handlePost = async (e) => {
        e.preventDefault();
        const formData = {
            password: data.password,
            token,
        }
        const response = await handleNewPassword(formData);
        if (!response.error){
            M.toast({html: response.message, classes: '#388e3c green darken-2'})
            history.push('/signin')
        }else{
            M.toast({html: response.error, classes: '#c62828 red darken-3'})
        }
    }
    return (
        <div className="myCard">
            <div className="card auth-card input-field">
                <h2>Instagram</h2>
                <form onSubmit={handlePost}>
                    <input type="password" placeholder="password" id="password" autoComplete="current-password" onChange={handleChange} />
                    <button type="submit" className="btn waves-effect waves-light #64b5f6 blue darken-1" >Enter a new password</button>
                </form>
            </div>
        </div>
    )
}

export default NewPassword;