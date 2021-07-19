import React, { useContext, useState, useRef, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../routes/Routes'
import M from 'materialize-css';
import './Navbar.css';

const Navbar = () => {
    // eslint-disable-next-line
    const { state, dispatch } = useContext(UserContext);
    const history = useHistory();
    const searchInput = useRef(null);
    const modalRef = useRef(null);
    const [showSearchBar, setShowSearchBar] = useState(false);
    const handleSearch = (e) => {
        e.preventDefault();
        if(e.target.keywords.value.length === 0) {
            setShowSearchBar(false);
        }
    }
    
    useEffect(() => {
        if(showSearchBar) {
            searchInput.current.focus();
            /* const instance = M.Modal.getInstance(modalRef.current)
            instance.open() */
        }
    }, [showSearchBar])

    useEffect(() => {
        M.Modal.init(modalRef.current)
    }, []);

    const handleSearchBar = () => {
        setShowSearchBar(true);
        searchInput.current.focus();
    }
    const renderList = () => {
        if (state) {
            return [
                <li key={'-'}>
                    <div style={{display:'flex', alignContent:'center', alignItems:'center'}} className='input-field'>
                        <i className='material-icons'style={{color: 'black'}} onClick={handleSearchBar}>search</i>
                        <form onSubmit={handleSearch}>
                            <input type="text" id="keywords" ref={searchInput} placeholder='Search' className={showSearchBar ? 'input-field' : 'input-field hide-search-bar'} onBlur={(e) => setShowSearchBar(false) } />
                        </form>
                    </div>
                </li>,
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
        <div>
            <nav>
                <div className='nav-wrapper white'>
                    <Link to={state ? '/' : '/signin'} className='brand-logo left'>Instagram</Link>
                    <ul id="nav-mobile" className='right hide-on-med-and-down'>
                        {renderList()}
                    </ul>
                </div>
            </nav>
            <div id="searchResults" ref={modalRef} className="modal bottom-sheet">
                <div className="modal-content">
                    <h4>Modal Header</h4>
                    <ul className="collection">
                        <li className="collection-item">Alvin</li>
                        <li className="collection-item">Alvin</li>
                        <li className="collection-item">Alvin</li>
                        <li className="collection-item">Alvin</li>
                        <li className="collection-item">Alvin</li>
                        <li className="collection-item">Alvin</li>
                        <li className="collection-item">Alvin</li>
                        <li className="collection-item">Alvin</li>
                        <li className="collection-item">Alvin</li>
                        <li className="collection-item">Alvin</li>
                    </ul>
                </div>
                <div className="modal-footer">
                    <button className="modal-close waves-effect waves-green btn-flat">Agree</button>
                </div>
            </div>
        </div>
    );
}

export default Navbar;