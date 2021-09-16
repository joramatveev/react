import React, {Component} from 'react';

import {userService} from '../services/user.service';

type HomePageState = {
    authorized?: boolean,
}

export class HomePage extends Component<{}, HomePageState> {

    constructor(props: HomePageState) {
        super(props);

        this.state = {
            authorized: false
        }
    }

    componentDidMount() {
        this.setState({
            authorized: userService.checkAuth(),
        });
    }

    render() {
        return (
            <header id="home">
                <div className="intro">
                    <div className="overlay">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-8 col-md-offset-2 intro-text">
                                    <h1>
                                        Experience Ukraine
                                    </h1>
                                    <p>This website created with U.S.-Ukraine Foundation and serves as an independent
                                        national tourism guide and forum for Ukraine.</p>
                                    <a
                                        href={this.state.authorized === true ? '/forecast' : '/login'}
                                        className="btn btn-custom btn-lg page-scroll"
                                    >
                                        Join Us
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}