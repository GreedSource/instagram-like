import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../routes/Routes'
import './Navbar.css';

const Navbar = () => {
    // eslint-disable-next-line
    const { state, dispatch } = useContext(UserContext);
    const history = useHistory();
    const renderList = () => {
        if (state) {
            return [
                <li key={'1'}><Link to='/profile'>Profile</Link></li>,
                <li key={'2'}><Link to='/createpost'>Create post</Link></li>,
                <li key={'3'}><Link to='/myfollows'>My follows</Link></li>,
                <li key={'4'}>
                    <input type="button" onClick={() => { localStorage.clear(); dispatch({type:'CLEAR'}); history.push('/signin') }} value="Logout" className="btn #c62828 red darken-3" />
                </li>
            ]
        }else{
            return [
                <li key={'1'}><Link to='/signin'>Signin</Link></li>,
                <li key={'2'}><Link to='/signup'>Signup</Link></li>
            ]
        }
    }
    return (
        <nav>
            <div className='nav-wrapper white'>
                <Link to={state ? '/' : '/signin'} className='brand-logo left'>Instagram</Link>
                <ul id="nav-mobile" className='right hide-on-med-and-down'>
                    {renderList()}
                </ul>
            </div>
        </nav>

    );
}

export default Navbar;