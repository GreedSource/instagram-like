import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { handleSignup } from '../api/auth';
import { fetchPhoto } from '../api/post'
import M from 'materialize-css';


const Signup = () => {
    const history = useHistory();
    const [data, setData] = useState({
        name: '',
        password: '',
        email: '',
    });
    const [image, setImage] = useState('');
    const [url, setUrl] = useState(undefined);
    useEffect(() => {
        if(url){
            handleData()
        }
        // eslint-disable-next-line
    }, [url]);
    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.id] : e.target.value
        });
    }

    const handlePhoto = async () => {
        const form = new FormData()
        form.append('file', image)
        form.append('upload_preset', 'insta-clone')
        form.append('cloud_name', 'greedsource')
        const fetchedPhoto = await fetchPhoto(form);
        if (fetchedPhoto){
            setUrl(fetchedPhoto.url)
        }else{
            M.toast({html: 'Something went wrong', classes: '#c62828 red darken-3'});
        }
    }

    const handleData = async () => {
        // eslint-disable-next-line
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(data.email)){
            M.toast({html: 'Invalid email!', classes: '#c62828 red darken-3'})
            return
        }
        const formData = {
            name: data.name,
            password: data.password,
            email: data.email,
            photo: url
        }
        const status = await handleSignup(formData);
        if (!status.error){
            M.toast({html: status.message, classes: '#388e3c green darken-2'});
            history.push('/signin')
        }else{
            M.toast({html: status.error, classes: '#c62828 red darken-3'})
        }
    }

    const handlePost = async (e) => {
        e.preventDefault();
        if(image && image.type.includes('image')){
            await handlePhoto()
        }else{
            await handleData()
        }
        
    }
    return (
        <div className="myCard">
            <div className="card auth-card input-field">
                <h2>Instagram</h2>
                <form onSubmit={handlePost}>
                    <input type="text" placeholder="name" id="name" onChange={handleChange} />
                    <input type="text" placeholder="email" id="email" autoComplete="email" onChange={handleChange}  />
                    <input type="password" placeholder="password" autoComplete="current-password" id="password" onChange={handleChange}  />
                    <div className="file-field input-field">
                        <div className="btn #64b5f6 blue darken-1">
                            <span>Upload picture</span>
                            <input type="file" id="photo"  accept="image/*" onChange={(e) => setImage(e.target.files[0]) } />
                        </div>
                        <div className="file-path-wrapper">
                            <input className="file-path validate" type="text" />
                        </div>
                    </div>
                    <input type="submit" value="Signup" className="btn waves-effect waves-light #64b5f6 blue darken-1" />
                </form>
                <h5>
                    <Link to="/signin">Already have an account?</Link>
                </h5>
            </div>
        </div>
    )
}

export default Signup;