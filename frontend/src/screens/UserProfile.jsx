import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../routes/Routes';
import { fetchData } from '../api/user';
import { useParams, useHistory } from 'react-router-dom';

const UserProfile = () => {
    const [userProfile, setUserProfile] = useState(null);
    const [posts, setPosts] = useState([]);
    const { id } = useParams();
    const history = useHistory();
    // eslint-disable-next-line
    const { state, dispatch } = useContext(UserContext); 
    useEffect(() => {
        const handleData = async () => {
            const response = await fetchData(id);
            if(!response.error) {
                await setUserProfile(response.user);
                await setPosts(response.posts);
            }else{
                history.push('/');
            }
        }
        handleData();
        // eslint-disable-next-line
    }, [id])
    return (
        <>
        {
            userProfile ? 
                <div style={{maxWidth: "975px", margin: "0px auto"}}>
                    <div style={{ display: 'flex', justifyContent: 'space-around', margin: '18px 0px', borderBottom: "1px solid grey"}}>
                        <div>
                            <img style={{width:"160px", height: "160px", borderRadius: "80px"}} src="https://res.cloudinary.com/greedsource/image/upload/v1626308853/profile-1_esjhzg.jpg" alt="profile" />
                        </div>
                        <div>
                            <h4>{userProfile ? userProfile.name : 'Loading...'}</h4>
                            <h5>{userProfile ? userProfile.email : 'Loading...'}</h5>
                            <div style={{display: 'flex', justifyContent: 'space-between', width: "110%"}}>
                                <h6>{ posts.length } posts</h6>
                                <h6>100 followers</h6>
                                <h6>150 following</h6>
                            </div>
                        </div>
                    </div>
                    <div className="gallery">
                        {
                            posts.map(post => {
                                return (
                                    <img className="item" src={post.photo} alt={post.title} key={post._id} />
                                )
                            })
                        }
                    </div>
                </div>
            : <h2>Loading...</h2>
        }
        </>
    )
}

export default UserProfile;