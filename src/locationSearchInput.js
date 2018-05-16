import React from 'react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: '', error: 0 }
  }
  handleChange = (address) => {
    this.setState({ error: 0})
    this.setState({ address })
  }
  handleSelect = (address) => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => this.props.handleAutocomplete(latLng, address))
      .catch(error => this.setState({ error: 1 }))
  }
  handleError = () =>{
    this.setState({ error: 1 })
  }
  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        onError={this.handleError}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input'
              }) }
            />
            <div className="autocomplete-dropdown-container">
              {suggestions.map(suggestion => {
                const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div {...getSuggestionItemProps(suggestion, { className, style }) }>
                    <span>{suggestion.description}</span>
                  </div>
                )
              })}
            </div>
            {this.state.error === 1 &&
              <p className="red-text">Please, check the address or choose one of suggested options </p>
            }
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}
export default LocationSearchInput;