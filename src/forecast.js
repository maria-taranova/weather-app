import React, { Component } from 'react';
import Temperature from './temperature';
class Forecast extends Component {
    constructor(props) {
        super(props);
        this.state = {
            badge: []
        }
        //this.handleClick = this.handleClick.bind(this);
    }
    //identify what is tomorrow
    subComponent() {
        const currentDate = new Date();
        let newDate = new Date(this.props.item.date);
        let badgeArray = [];
        //1-today, 2 -tomorrow, 3 - weekend
        if ((currentDate.getDate() + 1) === newDate.getDate()) {
            badgeArray.push(2)
        } else if ((currentDate.getDate()) === newDate.getDate()) {
            badgeArray.push("1")
        }
        if (newDate.getDay() === 6 || newDate.getDay() === 0) {
            badgeArray.push("3")
        }
        this.setState({ badge: badgeArray });
    }
    componentDidMount() {
        this.subComponent();
    }
    render() {
        return (
            <div className="col s12 m6 l4 scale-transition">
                <div className="card">
                    <div className="card-image">
                        <div className="badge-container">
                            {this.state.badge.includes("3") &&
                                <span className="badge red">weekend</span>
                            }
                            {this.state.badge.includes(2) &&
                                //if tomorrow, show badge for tomorrow
                                <span className="badge blue">tomorrow</span>
                            }
                            {this.state.badge.includes("1") &&
                                //if tomorrow, show badge for tomorrow
                                <span className="badge light-blue">today</span>
                            }
                        </div>
                        <img src={`http://l.yimg.com/a/i/us/we/52/${this.props.item.code}.gif`} alt="{this.props.item.text}" />
                    </div>
                    <div className="card-content">
                        <span className="card-title"><span className="grey-text text-darken-2">{this.props.item.day}:</span> {this.props.item.date}</span>
                        {this.props.item.text}
                    </div>
                    <div className="card-action blue-text text-darken-2">
                        <span >Day: <Temperature temp={this.props.item.high} changeUnits={this.props.changeUnits} isCelsius={this.props.isCelsius} /> </span> {" "}|{" "}
                        <span>Night: <Temperature temp={this.props.item.low} changeUnits={this.props.changeUnits} isCelsius={this.props.isCelsius} /></span>
                    </div>
                </div>
            </div>
        );
    }
}
export default Forecast;