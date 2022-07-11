import React, {Component} from "react";
import WeatherForm from "./WeatherForm";
import WeatherInfoPanel from "./WeatherInfoPanel";
import {Button, Col} from "react-bootstrap";
import WeatherHistoryPanel from "./WeatherHistoryPanel";

// function clearHistory(){
//     localStorage.removeItem('WeatherHistory');
//     window.location.reload();
//     return false;
// }

class Container extends Component {
    state = {
        weatherData: ''
    };

    render() {
        return(
            <section className="weather container">
                <WeatherInfoPanel weatherData={this.state.weatherData}/>
                <WeatherForm />
                
                {/* <Col span={4}>
                        <Button className="save-btn" variant="secondary"  onClick={() => clearHistory()}>
                                                                        
                            clear
                        </Button>
                    </Col> */}

                <WeatherHistoryPanel weatherData={this.state.weatherData}/>
            </section>
        );
    }
}

export default Container;