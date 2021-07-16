import React from 'react';


const Profile = () => {
    return (
        <div style={{maxWidth: "975px", margin: "0px auto"}}>
                <div style={{ display: 'flex', justifyContent: 'space-around', margin: '18px 0px', borderBottom: "1px solid grey"}}>
                    <div>
                        <img style={{width:"160px", height: "160px", borderRadius: "80px"}} src="https://res.cloudinary.com/greedsource/image/upload/v1626308853/profile-1_esjhzg.jpg" alt="profile" />
                    </div>
                    <div>
                        <h4>Joel Garcia</h4>
                        <div style={{display: 'flex', justifyContent: 'space-between', width: "110%"}}>
                            <h6>100 posts</h6>
                            <h6>100 followers</h6>
                            <h6>150 following</h6>
                        </div>
                    </div>
                </div>
                <div className="gallery">
                    <img className="item" src='https://images.unsplash.com/photo-1593373986890-ea50b4dda788?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1070&q=80' alt='testing' />
                    <img className="item" src='https://images.unsplash.com/photo-1593373986890-ea50b4dda788?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1070&q=80' alt='testing' />
                    <img className="item" src='https://images.unsplash.com/photo-1593373986890-ea50b4dda788?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1070&q=80' alt='testing' />
                    <img className="item" src='https://images.unsplash.com/photo-1593373986890-ea50b4dda788?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1070&q=80' alt='testing' />
                    <img className="item" src='https://images.unsplash.com/photo-1593373986890-ea50b4dda788?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1070&q=80' alt='testing' />
                    <img className="item" src='https://images.unsplash.com/photo-1593373986890-ea50b4dda788?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1070&q=80' alt='testing' />
                </div>
            </div>
    )
}

export default Profile;