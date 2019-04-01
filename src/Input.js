import React, { Component } from 'react';

class Input extends React.Component {
  constructor(props) {
    super(props);
	this.state = {
		value: this.props.valore
	};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  componentDidUpdate( oldProps ) {
	  const newProps = this.props;
	  if( oldProps.disabled !== newProps.disabled ) {
		  this.setState({value: this.props.valore})
	  }
  }
  
  handleChange( event ) {
	  this.setState({value: event.target.value});
	  this.props.onChange( {field: this.props.campo, value: event.target.value} );
  }

  handleSubmit(event) {
	  event.preventDefault();
  }	
	
  render() {
	  let input = <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={this.state.value} onChange={this.handleChange} disabled={this.props.disabled}/>;
	  if( this.props.noLabel ){
		  return (
      		<form onSubmit={this.handleSubmit}>
			  {input}
      		</form>
		  );
	  }
    return (
      <form onSubmit={this.handleSubmit}>
		<div className="input-group input-group-sm">
  	  		<div className="input-group-prepend">
				<span className="input-group-text">{this.props.etichetta}</span>
  	  		</div>
			{input}
		</div>
      </form>
    );
  }
}

export default Input;