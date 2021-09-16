import React, {Component} from 'react';
import {Redirect} from "react-router-dom";

import {userService} from '../services/user.service';

type LoginPageState = {
    email?: string,
    password?: string,
    submitted?: boolean,
    loading?: boolean,
    error?: string,
    redirect?: string
    authorized?: boolean,
}

export class LoginPage extends Component<{}, LoginPageState> {

    constructor(props: LoginPageState) {
        super(props);

        this.state = {
            email: '',
            password: '',
            submitted: false,
            loading: false,
            error: '',
            redirect: '',
            authorized: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({submitted: true});
        const {email, password} = this.state;

        // stop here if form is invalid
        if (!(email && password)) {
            return;
        }

        this.setState({loading: true});

        try {
            const result = userService.login(email, password);
            if (result === true) {
                this.setState({authorized: true});
                this.setState({redirect: "/forecast"});
                return true;
            }
        } catch (err) {
            this.setState({error: `${err}`});
        } finally {
            this.setState({loading: false});
            this.setState({submitted: false});
        }

        return false;
    }

    render() {
        const {email, password, submitted, loading, error, redirect} = this.state;
        if (redirect) {
            return <Redirect to={{pathname: redirect}} />
        }
        return (
            <div>
                <div id="login">
                    <div className="container">
                        <div className="col-md-12">
                            <div className="row">
                                <div className="section-title">
                                    <h2>Sign In</h2>
                                    <p>
                                        Enter your email address or username and password to sign in.
                                    </p>
                                </div>
                                <form name="signIn" noValidate onSubmit={this.handleSubmit}>
                                    <div className="row">
                                        {error &&
                                        <div className={'alert alert-danger'}>{error}</div>
                                        }
                                        <div className="col-md-12">
                                            <div className={'form-group' + (submitted && !email ? ' has-error' : '')}>
                                                <label htmlFor="password">Email:</label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    value={email}
                                                    className="form-control"
                                                    placeholder="Enter your email"
                                                    required
                                                    onChange={this.handleChange}
                                                />
                                                {submitted && !email &&
                                                <div className="help-block">Email is required</div>}
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div
                                                className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                                                <label htmlFor="password">Password:</label>
                                                <input
                                                    type="password"
                                                    id="password"
                                                    name="password"
                                                    value={password}
                                                    className="form-control"
                                                    placeholder="Enter your password"
                                                    required
                                                    onChange={this.handleChange}
                                                />
                                                {submitted && !password &&
                                                <div className="help-block">Password is required</div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-custom btn-lg" disabled={loading}>
                                        Submit
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}