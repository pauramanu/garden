import React, { Component } from 'react';

class Txt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: this.props.valore};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  componentDidUpdate( oldProps ) {
	  const newProps = this.props;
	  if( oldProps.disabled !== newProps.disabled ) {
		  this.setState({value: this.props.valore})
	  }
  }

  handleChange(event) {
	  this.setState({value: event.target.value});
	  this.props.onChange( {field: this.props.campo, value: event.target.value} );
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
	  let textArea = <textarea className="form-control" aria-label="With textarea" placeholder={this.props.valore} value={this.state.value} onChange={this.handleChange} disabled={this.props.disabled}></textarea>;
	  if( this.props.noLabel ){
		  return (
      		<form onSubmit={this.handleSubmit}>
			  {textArea}
      		</form>
		  );
	  }
    return (
      <form onSubmit={this.handleSubmit}>
		<div className="input-group input-group-sm mb-3">
  	  		<div className="input-group-prepend">
    			<span className="input-group-text">{this.props.etichetta}</span>
  	  		</div>
			{textArea}
		</div>
      </form>
    );
  }
}

export default Txt;