import React from 'react';
import Navbar from '../components/Navbar'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Home, Signin, Signup, Profile, CreatePost } from '../screens/Index'
import { Error404 } from '../error/Index';
import './Routes.css'

const Routes = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Switch>
                <Route exact component={Home} path={'/'} />
                <Route exact component={Profile} path={'/profile'} />
                <Route exact component={Signin} path={'/signin'} />
                <Route exact component={Signup} path={'/signup'} />
                <Route exact component={CreatePost} path={'/createpost'} />
                <Route component={Error404} />
            </Switch>
        </BrowserRouter>
        
    );
}

export default Routes;