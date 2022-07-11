import React, {Component} from "react";

class Header extends Component {
    render() {
        return (
            <section className="header">
                <h1>{'WEATHER D\u263CWN'}</h1>
                <span className="annotation">(MERN Full Stack Website Example)</span>
            </section>
        );
    }
}

export default Header;