import React, {Component} from "react";
import {Form, Button, Row, FormSelect} from "react-bootstrap";

import axios from 'axios'; // used for making api calls

import {connect} from "react-redux";
import {saveZipCode, saveWeatherData, saveTemperature, updateHistory} from "../actions";

// clears localStore from button call
function clearHistory() {
    localStorage.removeItem('WeatherHistory');
    window.location.reload();
return false;
}

class WeatherForm extends Component {

    // triggered on page refresh
    componentDidMount() {
        this.refreshSavedWeather();
    }

    // Refreshes the current weather data for the most recent zip code, if it exists
    refreshSavedWeather = () => {
        if (localStorage.getItem("zipCode")) {
            axios.post("/api/weather", {
                zipCode: localStorage.getItem("zipCode"),
                tempMetric: localStorage.getItem("tempMetric")
            }).then(d => {
                this.props.saveWeatherData(d.data);
            });
        }
    }

    // default state
    state = {
        tempMetric: "imperial",
        zipCodeInput: "98052"
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    /*===============================================================*/
    /*===============================================================*/
    
    // LOCAL ONLY (using saveToMongo instead)
    saveFormData = (event) => {
        event.preventDefault();

        // Gets the weather data from the weather api and returns it to save into local storage and redux store.
        axios.post("/api/weather", {
            zipCode: this.state.zipCodeInput,
            tempMetric: this.state.tempMetric
        }).then(response => {
            let weatherData = response.data;

            this.saveToStore(weatherData);
            this.saveToLocalStorage(weatherData);
        });
    }

    // Save data from form to local storage
    saveToLocalStorage = (weatherData) => {
        localStorage.setItem("zipCode", this.state.zipCodeInput);
        localStorage.setItem("tempMetric", this.state.tempMetric);
        localStorage.setItem("CurrentWeatherData", JSON.stringify(weatherData));
        localStorage.setItem("WeatherHistory", JSON.stringify(this.props.history));
    }

    // saves to mongoDB and local (using this choice)
    saveToMongo = (event) => {
        event.preventDefault();

        //post data
        axios.post("/api/weatherMongo", {
            zipCode: this.state.zipCodeInput,
            tempMetric: this.state.tempMetric
        }).then(response => {
            let weatherData = response.data;

            this.saveToStore(weatherData);
            this.saveToLocalStorage(weatherData);
             
            //clear zip on submit
            let getForm = document.forms['form'];
            getForm.elements["zip"].value = '';
                   
        });
    }

    // Saves data to the Redux store
    saveToStore = (weatherData) => {
        this.props.saveTemperature(this.state.tempMetric);
        this.props.saveZipCode(this.state.zipCodeInput);
        this.props.saveWeatherData(weatherData);

        this.props.updateHistory({
            timestamp: (new Date()).toLocaleString(),
            city: weatherData.name,
            zipcode: this.state.zipCodeInput,
            temperature: weatherData.main.temp,
            description: weatherData.weather[0].description
        });
    }
    /*===============================================================*/
    /*===============================================================*/

    render() {
        return (
            // localStore + (JSON -> MONGO)
            <Form id="form" className="weather-form" onSubmit={this.saveToMongo} >
                <span className="form-div">

                    <Row type="flex" justify="center" align="center" className="zipCode row-width">
                        <Form.Control name="zipCodeInput"
                                        type="text"
                                        pattern="[0-9]{5}"
                                        placeholder="Enter US zip code"
                                        onChange={this.onChange}
                                        className="zipCodeInput form-control pointer"
                                        title=""
                                        id="zip"
                                        required/>

                        <Button className="save-btn" variant="primary" type="submit" >
                            Go
                        </Button>
                    </Row>

                    <Row type="flex" justify="center" align="center" className="row-width">
                        <FormSelect name="tempMetric" className="dropdown pointer" value={this.value} onChange={this.onChange}>
                            <option
                                key={"F"}
                                variant="secondary"
                                value={"imperial"}
                                >
                                Fahrenheit (°F)
                            </option>
                            <option
                                key={"C"}
                                variant="secondary"
                                value={"metric"}
                                >
                                Celsius (°C)
                            </option>
                        </FormSelect>
                        <Button className="history-btn" variant="secondary"  onClick={() => clearHistory()}>
                            Clear History
                        </Button>
                    </Row>
                    
                </span>
            </Form>
        );
    }
}

// Mapping state from the store to props;
// meaning...if we update these props, it'll update the redux store
const mapStateToProps = (state) => {
    return {
        zipCode: state.zipCode,
        weather: state.weather,
        tempMetric: state.tempMetric,
        history: state.history
    }
};

// These are the actions we can dispatch and just mapping it to props
const mapDispatchToProps = () => {
    return {
        saveZipCode,
        saveWeatherData,
        saveTemperature,
        updateHistory
    }
};

// connects our mapping the state & dispatch to props to use in WeatherForm
export default connect(mapStateToProps, mapDispatchToProps())(WeatherForm);