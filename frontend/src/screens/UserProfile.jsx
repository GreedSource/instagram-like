import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../routes/Routes';
import { fetchData, unfollowUser, followUser } from '../api/user';
import { useParams, useHistory } from 'react-router-dom';

const UserProfile = () => {
    const [userProfile, setUserProfile] = useState(null);
    const [posts, setPosts] = useState([]);
    const { id } = useParams();
    const history = useHistory();
    const { state, dispatch } = useContext(UserContext); 
    const [showFollow, setShowFollow] = useState(state ? !state.following.includes(id) : true);
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

    const handleFollowUser = async () => {
        const response = await followUser(id);
        if(!response.error){
            dispatch({ type: 'UPDATE', payload: {following: response.following, followers: response.followers}});
            localStorage.setItem('user', JSON.stringify(response))
            setUserProfile((prevState) => {
                return {
                    ...prevState,
                    followers: [...prevState.followers, response._id]
                }
            });
            await setShowFollow(false);
        }
    }

    const handleUnfollowUser = async () => {
        const response = await unfollowUser(id);
        if(!response.error){
            dispatch({ type: 'UPDATE', payload: {following: response.following, followers: response.followers}});
            localStorage.setItem('user', JSON.stringify(response))
            setUserProfile((prevState) => {
                const newFollowers = prevState.followers.filter(f => f !== response._id);
                return {
                    ...prevState,
                    followers: newFollowers
                }
            });
            await setShowFollow(true);
        }
    }

    return (
        <>
        {
            userProfile ? 
                <div style={{maxWidth: "975px", margin: "0px auto"}}>
                    <div style={{ display: 'flex', justifyContent: 'space-around', margin: '18px 0px', borderBottom: "1px solid grey"}}>
                        <div>
                            <img style={{width:"160px", height: "160px", borderRadius: "80px"}} src={userProfile ? userProfile.photo : 'Loading...'} alt="profile" />
                        </div>
                        <div>
                            <h4>{userProfile ? userProfile.name : 'Loading...'}</h4>
                            <h5>{userProfile ? userProfile.email : 'Loading...'}</h5>
                            <div style={{display: 'flex', justifyContent: 'space-between', width: "110%"}}>
                                <h6>{ posts.length } posts</h6>
                                <h6>{userProfile ? userProfile.followers.length : 'Loading...'} followers</h6>
                                <h6>{userProfile ? userProfile.following.length : 'Loading...'} following</h6>
                            </div>
                            {
                                showFollow 
                                ?
                                <button type="button" style={{margin: '10px'}} onClick={handleFollowUser} className="btn waves-effect waves-light #64b5f6 blue darken-1" >Follow</button>
                                :
                                <button type="button" style={{margin: '10px'}} onClick={handleUnfollowUser} className="btn waves-effect waves-light #64b5f6 blue darken-1">Unfollow</button>
                            }
                            
                            
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