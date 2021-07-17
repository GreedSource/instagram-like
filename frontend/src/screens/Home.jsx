import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../routes/Routes';
import { fetchData, likePost, unlikePost } from '../api/post'

const Home = () => {
    const [data, setData] = useState([]);
    // eslint-disable-next-line
    const { state, dispatch } = useContext(UserContext);
    useEffect(() => {
        async function loadData() {
            const response = await fetchData();
            setData(response);
        }
        loadData();
    }, []);

    const handleLike = async (postId) => {
        const response = await likePost(postId);
        console.log(response._id)
        const newData = await data.map(item => {
            if(item._id === response._id){
                return response
            }else{
                return item
            }
        })
        setData(newData)
    }

    const handleUnlike = async (postId) => {
        const response = await unlikePost(postId);
        const newData = await data.map(item => {
            if(item._id === response._id){
                return response
            }else{
                return item
            }
        })
        await setData(newData)
    }


    return (
        <div className="home">
            {
                data.map((post, index) => (
                    <div className="card home-card" key={post._id}>
                        <h5 className="postedBy"><Link to={post.postedBy._id !== state._id ? `/profile/${post.postedBy._id}` : '/profile'}>{post.postedBy.name}</Link>{state._id === post.postedBy._id ? <i className="material-icons" style={{float: 'right'}}>delete</i> : '' }</h5>
                        <div className="card-image">
                            <img src={post.photo} alt="profile" />
                        </div>
                        <div className="card-content">
                            <i className="material-icons" style={{color:'red'}}> favorite </i>
                            {
                                post.likes.includes(state._id)
                                ? <i className="material-icons" onClick={() => handleUnlike(post._id)}> thumb_down </i>
                                : <i className="material-icons" onClick={() => handleLike(post._id)}> thumb_up </i>
                            }
                            <h6>{post.likes.length} Likes</h6>
                            <h6>{post.title}</h6>
                            <p>{post.body}</p>
                            <h6><span><b>John Doe</b></span> Hello world</h6>
                            <input type="text" placeholder="Make a comment" name="comment" />
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Home;