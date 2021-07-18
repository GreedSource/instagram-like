import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../routes/Routes';
import { fetchPosts, fetchPhoto } from '../api/post';
import { updateUser } from '../api/user';
import M from 'materialize-css';

const Profile = () => {
    const [posts, setPosts] = useState([]);
    const [image, setImage] = useState('');
    // eslint-disable-next-line
    const { state, dispatch } = useContext(UserContext); 
    useEffect(() => {
        const handleData = async () => {
            const response = await fetchPosts();
            setPosts(response);
        }
        handleData();
    }, [])

    useEffect(() => {
        if(image){
            const handleData = async () => {
                const form = new FormData()
                form.append('file', image)
                form.append('upload_preset', 'insta-clone')
                form.append('cloud_name', 'greedsource')
                const fetchedPhoto = await fetchPhoto(form);
                if (fetchedPhoto){
                    const response = await updateUser({photo: fetchedPhoto.secure_url});
                    if(!response.error) {
                        await localStorage.setItem('user', JSON.stringify({...state, photo: fetchedPhoto.secure_url}))
                        await dispatch({type: 'UPDATE_PHOTO', payload: { photo: fetchedPhoto.secure_url }})
                    }else{
                        M.toast({html: 'Something went wrong', classes: '#c62828 red darken-3'});
                    }
                }else{
                    M.toast({html: 'Its been an error uploading the image', classes: '#c62828 red darken-3'});
                }
            }
            handleData();
        }
        //eslint-disable-next-line
    }, [image])
    const updatePhoto = (file) => {
        if(file && file.type.includes('image')){
            setImage(file)
        }else{
            M.toast({html: 'You must select an image!', classes: '#c62828 red darken-3'});
        }
    }
    return (
        <div style={{maxWidth: "975px", margin: "0px auto"}}>
            <div style={{ display: 'flex', justifyContent: 'space-around', margin: '18px 0px', borderBottom: "1px solid grey"}}>
                <div style={{display: 'flex', justifySelf: 'center', flexDirection: 'column'}}>
                    <img style={{width:"160px", height: "160px", borderRadius: "80px"}} src={state ? state.photo : 'https://res.cloudinary.com/greedsource/image/upload/v1626308853/profile-1_esjhzg.jpg'} alt="profile" />
                    <div className="file-field input-field">
                        <div style={{margin: '1rem 0 1rem 0'}} className="btn #64b5f6 blue darken-1">
                            <span>Update picture</span>
                            <input type="file" id="photo"  accept="image/*" onChange={(e) => updatePhoto(e.target.files[0]) } />
                        </div>
                        <div className="file-path-wrapper" style={{display: 'none'}}>
                            <input className="file-path validate" type="text" />
                        </div>
                    </div>
                </div>
                <div>
                    <h4>{state ? state.name : 'Loading...'}</h4>
                    <h5>{state ? state.email : 'Loading...'}</h5>
                    <div style={{display: 'flex', justifyContent: 'space-between', width: "110%"}}>
                        <h6>{ posts ? posts.length : 'loading...' } posts</h6>
                        <h6>{ state ? state.followers.length : '0' } followers</h6>
                        <h6>{ state ? state.following.length : '0' } following</h6>
                    </div>
                </div>
            </div>
            <div className="gallery">
                {posts.map(post => {
                    return (
                        <img className="item" src={post.photo} alt={post.title} key={post._id} />
                    )
                })}
            </div>
        </div>
    )
}

export default Profile;