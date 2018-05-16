import React, { Component } from 'react';
import DropdownGroup from './dropdown';
import Today from './today';
import LocationSearchInput from './locationSearchInput';
import './App.css';
import axios from 'axios';
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      weather: { isEmpty: 1 },
      locations: [
        {place: "Vancouver, BC, Canada",lat: '49.28315', lng: '-123.120911'},
        { place: "Seattle, WA, USA", lat: "47.60619", lng: "-122.331459" },
        { place: "Kiev, Ukraine", lat: "50.44138", lng: "30.52249" },
        { place: "Cannes, France", lat: "43.552847", lng: "7.017369000000031" },
        { place: "Norilsk, Russia", lat: "69.343048", lng: "88.182518", },
      ],
      gmapsLoaded: false,
      hideAutocomplete: true, 
      error: 0
    };
    this.queryWeatherbyCity = this.queryWeatherbyCity.bind(this);
    this.handleDropdown = this.handleDropdown.bind(this);
    this.handleAutocomplete = this.handleAutocomplete.bind(this);
  }

  
  queryWeatherbyCity() {
    this.setState({error: false })

    if (arguments[0] === 'custom') {
      this.setState({ hideAutocomplete: false });
      return;
    }
    const coordinates = arguments[0];
    // const address = arguments[1];
    //  let city ='Vancouver'
    // let query = 'https://query.yahooapis.com/v1/public/yql?format=json&q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="' + city + '") and u="c"'
    const query = 'https://query.yahooapis.com/v1/public/yql?format=json&q=select * from weather.forecast where woeid in (SELECT woeid FROM geo.places WHERE text="(' + coordinates + ')") and u="c"'
    //console.log(query);
 
    axios.get(query).then(
      (response) => {
        if (response.data.query.results === null) {
          this.setState({ error: 2 });
          return;
        }
        if (response.data.query.results.channel.location === undefined) {
          this.setState({ error: 1 });
          return;
        }
        let resultsArray = response.data.query.results.channel;
        
        this.setState({ weather: resultsArray });
        //iterate over the existing values in dropdown locations, 
        //and if the location is not in the array, add it
       
      })
      .catch((error) => {
        // Error
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          this.setState({ error: 2 });
          return;
          // console.log(error.response.status);
          // console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
          return;
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
          return;
        }
      })
  }
  handleAutocomplete() {
    const address = arguments[1];
    const lat = arguments[0].lat.toString();
    const lng = arguments[0].lng.toString();
    const latlng = lat+ ", "+lng;
    this.queryWeatherbyCity(latlng, address);  
    if(this.checkIfExists(lat, lng, address)){
      return;
    }
    //this.createNewLocation(latlng, address);
  }
  handleDropdown() {
    this.setState({ hideAutocomplete: true })
    const address = arguments[1];
    const latlng = arguments[0];
    this.queryWeatherbyCity(latlng, address)
  }

   checkIfExists(lat, lng, address){
    let obj = this.state.locations.find(function (obj) {
      return obj.place.toLowerCase() === address.toLowerCase();
    });
    let objCoordinates = this.state.locations.find(function (obj) {
      return obj.lat === lat && obj.lng === lng;
    });
    
    if (obj) {
     //console.log('match!')
      return false;
    } else if (objCoordinates) {
     // console.log('match!')
      return false;
    } else {
      this.createNewLocation(lat, lng, address);
    }
  }
  createNewLocation(lat, lng, address) {
    //adding the suggested place from autocomplete to dropdown
    if (address === undefined) return;
    
    let newPlace ={ place: address, lat: lat, lng: lng };
    this.setState({ locations: [newPlace, ...this.state.locations] });
  }
  initMap = () => {
    this.setState({
      gmapsLoaded: true,
    })
  }
  componentDidMount() {
      //add google places js api after the page load
    window.initMap = this.initMap
    const gmapScriptEl = document.createElement(`script`)
    gmapScriptEl.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBVlJmLZAjqmYSVpIfgGSi5z4TEtjIhWDk&libraries=places&callback=initMap";
    document.querySelector(`body`).insertAdjacentElement(`beforeend`, gmapScriptEl)
  }
  render() {
    return (
      <div className="App">
        <header>
        </header>
        <div className="row">
          <div className="col s12 m12 l3">
            <div className=" ">
              <DropdownGroup locations={this.state.locations} handleSelect={this.handleDropdown}></DropdownGroup>
              <div>
                <div style={{ display: this.state.hideAutocomplete ? 'none' : 'block' }}>
                  {this.state.gmapsLoaded && (
                    <LocationSearchInput handleAutocomplete={this.handleAutocomplete} />
                  )}
                </div>
                {this.state.error === 1 &&
                  <p className="red-text">This location is not supported</p>
                }
                {this.state.error === 2 &&
                  <p className="red-text">This query is not supported</p>
                }
              </div>
            </div>
          </div>
          <div className="container">
            <div className="col s12 m12 l9">
              {!this.state.weather.isEmpty &&
                <Today weather={this.state.weather} />
              }
            </div>  </div>  </div>
      </div>
    )
  }
}
export default App;