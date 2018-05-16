import React, { Component } from 'react';

class Temperature extends Component {
  constructor(props) {
    super(props)
    this.state = { isCelsius: 1 };
    this.toggleFC = this.toggleFC.bind(this);
  }

  toggleFC(e) {
   e.preventDefault();
      this.props.changeUnits();

  }

  render() {
  const isCelsius = this.props.isCelsius;
  const f = Math.round(this.props.temp * 9 / 5 + 32);
  const c = this.props.temp;
  const temp = isCelsius ? (
     <span>{c} &#8451; </span>
    ) : (
     <span>{f} &#8457;</span>
    );

    return (
    <a onClick={this.toggleFC}>{temp} </a>
    )
  }
}

export default Temperature;
