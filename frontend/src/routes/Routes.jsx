import React, { createContext, useReducer, useEffect, useContext } from 'react';
import Navbar from '../components/Navbar'
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom'
import { Home, Signin, Signup, Profile, CreatePost } from '../screens/Index'
import { Error404 } from '../error/Index';
import { reducer, initialState } from '../reducer/userReducer'
import './Routes.css'

export const UserContext = createContext()
const Routing = () => {
    const history = useHistory();
    // eslint-disable-next-line
    const { state, dispatch } = useContext(UserContext)
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            dispatch({ type: 'USER', payload: user });
            //history.push('/')
        }else{
            history.push('/signin')
        }
        //eslint-disable-next-line
    }, [])
    return (
        <Switch>
            <Route exact component={Home} path={'/'} />
            <Route exact component={Profile} path={'/profile'} />
            <Route exact component={Signin} path={'/signin'} />
            <Route exact component={Signup} path={'/signup'} />
            <Route exact component={CreatePost} path={'/createpost'} />
            <Route component={Error404} />
        </Switch>
    )
}
const Routes = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
    return (
        <UserContext.Provider value={{ state, dispatch }}>
            <BrowserRouter>
                <Navbar />
                <Routing />
            </BrowserRouter>
        </UserContext.Provider>
        
    );
}

export default Routes;