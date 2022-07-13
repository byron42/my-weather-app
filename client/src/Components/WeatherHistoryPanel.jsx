import React, {Component} from "react";
import {Card, ListGroup} from "react-bootstrap";

import {connect} from "react-redux";

class WeatherHistoryPanel extends Component {

    createHistoryList = () => {
        let historyComponents = [];
        let historyList = this.props.history;

        // Listing history of zip code submissions in "most recent" order
        for (let i = historyList.length - 1; i >= 0; i--) {
            let infoCard = this.getInfoListItem(historyList[i]);
            historyComponents.push(infoCard);
        }

        return (
            <Card className="center bottom-space">
                <ListGroup variant="flush">
                    {historyComponents}
                </ListGroup>
            </Card>
        );
    }

    getInfoListItem = (info) => {
        return (

            <ListGroup.Item variant="primary" key={info.timestamp}><b>{info.timestamp}</b> -
                [{info.city}, {info.zipcode}]:[{Math.round(info.temperature)}°, {info.description}]</ListGroup.Item>
        );
    }

    render() {
        return (
            <section className="center">
                {!!this.props.history.length ? this.createHistoryList() : <span className="no-info">No History!</span>}
            </section>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        history: state.history
    }
};

export default connect(mapStateToProps)(WeatherHistoryPanel);