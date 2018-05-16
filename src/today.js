import React, { Component } from 'react';
import Forecast from './forecast';
import Temperature from './temperature';

class Today extends Component {
constructor(props) {
    super(props)
    this.state = { isCelsius: true };
    this.changeUnits = this.changeUnits.bind(this);

  }


changeUnits(){
if (this.state.isCelsius) {
 
      this.setState({ isCelsius: false });
    } else {
   
      this.setState({isCelsius: true })
    }
}

  render() {
    
    const forecast = this.props.weather.item.forecast;
    const today = this.props.weather.item.condition;
    const astronomy = this.props.weather.astronomy;
    const wind = this.props.weather.wind;
    const location = this.props.weather.location;

    return (
      <div>
        <h1>{location.city}, {location.country}</h1>
        <span>SUNRISE: {astronomy.sunrise}</span> | <span>SUNSET: {astronomy.sunset}</span>
        <h3 className="grey-text"> <em>{today.text}</em></h3>
        <h1> <Temperature temp={today.temp} changeUnits={this.changeUnits} isCelsius= {this.state.isCelsius}/></h1>
        <span><i>Wind</i>: chill - {wind.chill}, direction - {wind.direction}, speed - {wind.speed} </span><br />
        <div className="row">
       
          {forecast.map((item) => (
            <Forecast item={item} key={item.date} changeUnits={this.changeUnits} isCelsius= {this.state.isCelsius}></Forecast>
          ))}
        </div>

      </div>
    );
  }
}

export default Today;
