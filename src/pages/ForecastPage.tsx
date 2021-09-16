import React, {Component} from 'react';
import {userService} from "../services/user.service";
import {api, WeatherData} from "../services/api.service";

type ForecastState = {
    city?: string,
    submitted?: boolean,
    loading?: boolean,
    hasWeatherData?: boolean,
    weatherMain?: string;
    weatherDescription?: string;
    mainTemp?: string;
    windSpeed?: string;
    error?: string,
    authorized?: boolean,
}

export class ForecastPage extends Component<{}, ForecastState> {

    constructor(props) {
        super(props);

        this.state = {
            city: '',
            submitted: false,
            loading: false,

            hasWeatherData: false,
            weatherMain: '',
            weatherDescription: '',
            mainTemp: '',
            windSpeed: '',

            error: '',
            authorized: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.setState({
            authorized: userService.checkAuth(),
        });
    }

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value});

        this.resetResult();
    }

    handleSubmit = async (e) => {

        e.preventDefault();

        const {city} = this.state;

        this.setState({loading: true});
        this.setState({hasWeatherData: false});

        try {
            const result: WeatherData = await api.getWeatherData(city);
            if (result) {
                for (const key in result) {
                    const val = result[key];
                    this.setState({[key]: val});
                }
                this.setState({hasWeatherData: true});
            }
        } catch (err) {
            this.setState({error: `${err}`});
        } finally {
            this.setState({loading: false});
            this.setState({submitted: false});
        }

        return;
    }

    resetResult() {
        this.setState({hasWeatherData: false});
        this.setState({weatherMain: ''});
        this.setState({weatherDescription: ''});
        this.setState({mainTemp: ''});
        this.setState({windSpeed: ''});
    }

    render() {
        const {
            city,
            submitted,
            loading,
            error,
            authorized,
            hasWeatherData,
            weatherMain,
            weatherDescription,
            mainTemp,
            windSpeed
        } = this.state;
        return (
            <div>
                <div id="forecast">
                    <div className="container">
                        <div className="col-md-12">
                            <div className="row">
                                <div className="section-title">
                                    <h2>Forecast Weather</h2>
                                    <p>
                                        Current & Forecast weather data collection
                                    </p>
                                </div>
                                <form name="forecastForm" noValidate onSubmit={this.handleSubmit}>
                                    {error &&
                                    <div className={'alert alert-danger'}>{error}</div>
                                    }
                                    <div className="col-md-12">
                                        <div className={'form-group' + (submitted && !city ? ' has-error' : '')}>
                                            <input
                                                type="text"
                                                id="city"
                                                name="city"
                                                value={city}
                                                className="form-control input-lg"
                                                placeholder="Enter city name"
                                                required
                                                onChange={this.handleChange}
                                            />
                                            {submitted && !city &&
                                            <div className="help-block">City is required</div>}
                                        </div>
                                    </div>
                                    {hasWeatherData ? (
                                        <div className="col-md-12">
                                            <table className="table">
                                                <tbody>
                                                <tr>
                                                    <td>Weather:</td>
                                                    <td>{weatherMain}</td>
                                                </tr>
                                                <tr>
                                                    <td>Temperature:</td>
                                                    <td>{mainTemp}</td>
                                                </tr>
                                                <tr>
                                                    <td>Weather description:</td>
                                                    <td>{weatherDescription}</td>
                                                </tr>
                                                <tr>
                                                    <td>Wind speed:</td>
                                                    <td>{windSpeed}</td>
                                                </tr>
                                                <tr>
                                                    <td>Weather:</td>
                                                    <td>{weatherMain}</td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    ) : null}
                                    <div className="col-md-12">
                                        <div
                                            className={'form-group'}>
                                            <button type="submit" className="btn btn-custom btn-lg" disabled={loading}>
                                                Show Forecast
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}