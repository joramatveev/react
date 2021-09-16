import React, {Component} from "react";
import {Link, Redirect} from "react-router-dom";
import {userService} from "../services/user.service";

type NavState = {
    authorized?: boolean,
}

class Nav extends Component<{}, NavState> {

    constructor(props) {
        super(props);
        this.state = {
            authorized: false
        }

    }

    componentDidMount() {
        setInterval(() => {
            this.setState({
                authorized: userService.checkAuth(),
            })
        }, 500)
    }

    handleClickLogout = () => {
        userService.logout();
        return <Redirect to="/home" />;
    }

    render() {
        const {authorized} = this.state
        return (
            <nav id="menu" className="navbar navbar-default navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        <button
                            type="button"
                            className="navbar-toggle collapsed"
                            data-toggle="collapse"
                            data-target="#bs-example-navbar-collapse-1"
                        >
                            {' '}
                            <span className="sr-only">Toggle navigation</span>{' '}
                            <span className="icon-bar">{' '}</span>{' '}
                            <span className="icon-bar">{' '}</span>{' '}
                            <span className="icon-bar">{' '}</span>{' '}
                        </button>
                        <a className="navbar-brand page-scroll" href="/">
                            One Way Ticket
                        </a>{' '}
                    </div>

                    <div
                        className="collapse navbar-collapse"
                        id="bs-example-navbar-collapse-1"
                    >
                        <ul className="nav navbar-nav navbar-right">
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li className={(authorized !== true) ? 'hidden' : undefined}>
                                <Link to="/forecast">Forecast</Link>
                            </li>
                            <li className={(authorized !== true) ? 'hidden' : undefined}>
                                <Link to="/logout" onClick={this.handleClickLogout}>Sing Out</Link>
                            </li>
                            <li className={(authorized === true) ? 'hidden' : undefined}>
                                <Link to="/login">Sing In</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

export {Nav};