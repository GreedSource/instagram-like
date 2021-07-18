import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { insertData, fetchPhoto } from '../api/post'
import M from 'materialize-css';

const CreatePost = () => {
    const history = useHistory();
    const [data, setData] = useState({ 
        title: '',
        body: ''
    });
    const [image, setImage] = useState('');
    const [url, setUrl] = useState('');
    useEffect(() => {
        if(url){
            const formData = {
                title: data.title, 
                body: data.body, 
                photo: url, 
            }
            const post = insertData(formData)
            if (!post.error){
                M.toast({html: 'Post successfully created', classes: '#388e3c green darken-2'});
                history.push('/')
            }else{
                M.toast({html: post.error, classes: '#c62828 red darken-3'});
            }
        }
        // eslint-disable-next-line
    }, [url])
    
    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.id] : e.target.value
        });
    }

    const handlePost = async (e) => {
        e.preventDefault();
        if(image && image.type.includes('image')){
            const form = new FormData()
            form.append('file', image)
            form.append('upload_preset', 'insta-clone')
            form.append('cloud_name', 'greedsource')
            const fetchedPhoto = await fetchPhoto(form);
            if (fetchedPhoto){
                setUrl(fetchedPhoto.secure_url)
            }else{
                M.toast({html: 'Something went wrong', classes: '#c62828 red darken-3'});
            }
        }else{
            M.toast({html: 'No image selected', classes: '#c62828 red darken-3'});
        }
    }

    return (
        <div className="card input-field"
            style={{
                margin: '30px auto',
                maxWidth: '500px',
                padding: '20px',
                textAlign: 'center'
            }}
        >
            <form onSubmit={handlePost}>
                <input type="text" placeholder="title" id='title' onChange={handleChange} required/>
                <input type="text" placeholder="body" id="body" onChange={handleChange} required/>
                <div className="file-field input-field">
                    <div className="btn #64b5f6 blue darken-1">
                        <span>Upload image</span>
                        <input type="file" id="photo"  accept="image/*" onChange={(e) => setImage(e.target.files[0]) } />
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" />
                    </div>
                </div>
                <input type="submit" value="Submit post" className="btn waves-effect waves-light #64b5f6 blue darken-1" />
            </form>
        </div>
    )
}

export default CreatePost;