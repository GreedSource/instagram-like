import React from 'react';


const Home = () => {
    return (
        <div className="home">
            <div className="card home-card">
                <h5 className="postedBy">Joel Garcia</h5>
                <div className="card-image">
                    <img src='https://images.unsplash.com/photo-1593373986890-ea50b4dda788?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1070&q=80' alt="profile" />
                </div>
                <div className="card-content">
                    <i className="material-icons" style={{color:'red'}}> favorite </i>
                    <i className="material-icons" > thumb_up </i>
                    
                    <h6>10 Likes</h6>
                    <h6>Photo</h6>
                    <p>My photo</p>
                    <h6><span><b>John Doe</b></span> Hello world</h6>
                    <input type="text" placeholder="Make a comment" name="comment" />
                </div>
            </div>
        </div>
    )
}

export default Home;