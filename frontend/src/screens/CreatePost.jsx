import React from 'react';


const createPost = () => {
    return (
        <div className="card input-filed"
            style={{
                margin: '30px auto',
                maxWidth: '500px',
                padding: '20px',
                textAlign: 'center'
            }}
        >
            <input type="text" placeholder="title" id='title' />
            <input type="text" placeholder="body" id="body" />
            <div className="file-field input-field">
                <div className="btn #64b5f6 blue darken-1">
                    <span>Upload image</span>
                    <input type="file" id="photo"  accept="image/*" />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
            </div>
            <input type="button" value="Submit post" className="btn waves-effect waves-light #64b5f6 blue darken-1" />
        </div>
    )
}

export default createPost;