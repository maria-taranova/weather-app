import React, { Component } from 'react';
class DropdownGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.handleSelect = this.handleSelect.bind(this);
    }
    handleSelect(e) {
        this.props.handleSelect(e.target.value);
    }
    render() {
        return (
            <div >
                <select className="browser-default" onChange={this.handleSelect} >
                    <option value="" defaultValue>Choose your option</option>
                    {this.props.locations.map((location) => (
                        <option key={location.place} value={location.lat+", "+location.lng} data-lat={location.lat} data-lng={location.lng} className="left" >{location.place}</option>
                    ))}
                       <option value="custom">Custom Search</option>
                </select>
                <label>Choose a city</label>
            </div>
        );
    }
}
export default DropdownGroup;