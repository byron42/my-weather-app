import React, {Component} from "react";
import WeatherForm from "./WeatherForm";
import WeatherInfoPanel from "./WeatherInfoPanel";
import WeatherHistoryPanel from "./WeatherHistoryPanel";

class Container extends Component {
    state = {
        weatherData: ''
    };

    render() {
        return(
            <section className="weather container">
                <WeatherInfoPanel weatherData={this.state.weatherData}/>
                <WeatherForm />
                <WeatherHistoryPanel weatherData={this.state.weatherData}/>
            </section>
        );
    }
}

export default Container;