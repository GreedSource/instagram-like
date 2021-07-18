import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../routes/Routes';
import { fetchPosts } from '../api/post';

const Profile = () => {
    const [posts, setPosts] = useState([]);
    // eslint-disable-next-line
    const { state, dispatch } = useContext(UserContext); 
    useEffect(() => {
        const handleData = async () => {
            const response = await fetchPosts();
            setPosts(response);
        }
        handleData();
    }, [])
    return (
        <div style={{maxWidth: "975px", margin: "0px auto"}}>
            <div style={{ display: 'flex', justifyContent: 'space-around', margin: '18px 0px', borderBottom: "1px solid grey"}}>
                <div>
                    <img style={{width:"160px", height: "160px", borderRadius: "80px"}} src="https://res.cloudinary.com/greedsource/image/upload/v1626308853/profile-1_esjhzg.jpg" alt="profile" />
                </div>
                <div>
                    <h4>{state ? state.name : 'Loading...'}</h4>
                    <h5>{state ? state.email : 'Loading...'}</h5>
                    <div style={{display: 'flex', justifyContent: 'space-between', width: "110%"}}>
                        <h6>{ posts.length } posts</h6>
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