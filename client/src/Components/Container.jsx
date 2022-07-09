import React, {Component} from "react";
import WeatherForm from "./WeatherForm";
import WeatherPanels from "./WeatherPanels";
import {Button, Col} from "react-bootstrap";

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
                <WeatherForm />
                
                {/* <Col span={4}>
                        <Button className="save-btn" variant="secondary"  onClick={() => clearHistory()}>
                                                                        
                            clear
                        </Button>
                    </Col> */}

                <WeatherPanels weatherData={this.state.weatherData}/>
            </section>
        );
    }
}

export default Container;