import React, { Component } from 'react';

class Bool extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: this.props.valore };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
	  console.log( 'change' );
    this.setState({ value: event.target.checked});
  }

  render() {
    return (
      <form className="xx">
		<div className="input-group input-group-sm">
  	  		<div className="input-group-prepend">
    			<span className="input-group-text">{this.props.etichetta}</span>
  	  		</div>
			<div className="form-control" disabled={this.props.disabled}>
	  			<input className="input" type="checkbox" checked={this.state.value} id="defaultCheck1" onChange={this.handleChange}  disabled={this.props.disabled}/>
			</div>
		</div>

      </form>
    );
  }
}

export default Bool;