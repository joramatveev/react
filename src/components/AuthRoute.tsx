import React from 'react';
import {Redirect, Route} from 'react-router-dom';

import {userService} from '../services/user.service';

export const AuthRoute = ({component: Component, ...rest}) => {

    const routeOpt = (props) => {
        if (rest.type === 'guest' && userService.checkAuth()) {
            return <Redirect to={{pathname: '/forecast', state: {from: props.location}}} />
        } else if (rest.type === "private" && !userService.checkAuth()) {
            return <Redirect to={{pathname: '/login', state: {from: props.location}}} />
        }
        return <Component {...props} />
    }

    return (
        <Route {...rest} render={routeOpt} />
    );
}