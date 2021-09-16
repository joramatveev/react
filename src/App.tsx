import React, {Component} from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';

import {AuthRoute} from './components/AuthRoute';
import {Nav} from './components/Nav';
import {Footer} from './components/Footer';
import {HomePage} from './pages/HomePage';
import {LoginPage} from './pages/LoginPage';
import {ForecastPage} from './pages/ForecastPage';

class App extends Component<{}> {
    render() {
        return (
            <Router>
                <div>
                    <Nav />
                    <Switch>
                        <AuthRoute exact path="/forecast" component={ForecastPage} type="private" />
                        <AuthRoute exact path="/logout" component={' '} type="private" />
                        <AuthRoute exact path="/login" component={LoginPage} type="guest" />
                        <Route path="/" component={HomePage} />
                        <Redirect from="*" to="/" />
                    </Switch>
                    <Footer />
                </div>
            </Router>
        );
    }
}

export {App};