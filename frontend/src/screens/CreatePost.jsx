import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { insertData, fetchPhoto } from '../api/post'
import M from 'materialize-css';

const CreatePost = () => {
    const history = useHistory();
    const [data, setData] = useState({ 
        title: '',
        body: '',
        image: '',
    })
    const [image, setImage] = useState('')

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.id] : e.target.value
        });
    }

    const handlePost = async (e) => {
        e.preventDefault();
        await console.log(data)
        
        const photo = await handleUpload()
        if (photo){
            //setState({form: {...this.state.form, photo: photo}})
            setData({
                ...data, image: 'asdas'
            });
            const post = await insertData(data)
            if (post){
                M.toast({html: post.message, classes: '#388e3c green darken-2'});
                history.push('/')
            }else{
                this.errorDialog()
            }
        }else{
            this.errorDialog()
        }
    }

    const handleUpload = async () => {
        const form = new FormData()
        form.append('file', image)
        form.append('upload_preset', 'insta-clone')
        form.append('cloud_name', 'greedsource')
        const fetchedPhoto = await fetchPhoto(form)
        if (fetchedPhoto){
            console.log(fetchedPhoto.url)
            return fetchedPhoto.url
        }else{
            return false
        }
    }

    return (
        <div className="card input-filed"
            style={{
                margin: '30px auto',
                maxWidth: '500px',
                padding: '20px',
                textAlign: 'center'
            }}
        >
            <form onSubmit={handlePost}>
                <input type="text" placeholder="title" id='title' onChange={handleChange} />
                <input type="text" placeholder="body" id="body" onChange={handleChange} />
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