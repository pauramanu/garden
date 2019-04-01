import React, { Component } from 'react';

class Select extends React.Component {
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

    handleChange(event) {
		this.setState({value: event.target.value});
	  	this.props.onChange( {field: this.props.campo, value: event.target.value} );
    }
	
	handleSubmit(event) {
		event.preventDefault();
	}
  
	
	render() {
	  const opzioni = this.props.options;
	  let opzioniList = opzioni.map((opzione, key) =>  <option key={key} value={opzione}>{opzione}</option>);
	  if( this.props.noLabel ){
		  return (
			  <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
		  		<select className="custom-select form-control" default="defualt">
					<option value="default">Scegli...</option>
					{opzioniList}
				</select>
			  </form>
		  );
	  }
	  return (
	    <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
			<div className="input-group input-group-sm">
		  		<div className="input-group-prepend">
	  			<label className="input-group-text">{this.props.etichetta}</label>
		  		</div>
		  		<select className="custom-select form-control" default="defualt">
					<option value="default">Scegli...</option>
					{opzioniList}
				</select>
			</div>
	    </form>
	  );
	}
}

export default Select;