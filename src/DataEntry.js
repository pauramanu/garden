import React, { Component } from 'react';
import Input from './Input.js';
import Txt from './Txt.js';
import DatePick from './DatePick.js';
import Bool from './Bool.js';
import Select from './Select.js';

class DataEntry extends Component {
	
    constructor(props) {		
      super(props);
      this.state = {
		  valore: this.props.valore
	  };
	  this.handleInputChange = this.handleInputChange.bind(this);
    }
	
    handleInputChange( fieldObj ) {
  	  this.setState({ value: fieldObj.value });
  	  this.props.onChange( fieldObj );
    }
	
  render() {	

	  const tipo = this.props.tipo.toString();
	  const chiave = this.props.chiave;
	  const campo = this.props.campo;
	  let valore;
	  if ( chiave === 'nome' ){
		  valore = this.state.valore.nome;
	  }
	  else if( chiave === 'note' ){
	  	  valore = this.state.valore.note;
	  }
	  else if( chiave === 'tipo' ){
	  	  valore = this.state.valore.tipo;
	  }
	  else if( chiave === 'data' ){
	  	  valore = this.state.valore.data;
	  }
	  else if( chiave === 'tipisel' ){
	  	valore = this.props.tipi;
	  }
	  
	  if( tipo === 'String' ){
	  	return (
		  <Input etichetta={this.props.etichetta} chiave={chiave} campo={campo} valore={valore} disabled={this.props.disabled} noLabel={this.props.noLabel} onChange={this.handleInputChange}>
			{valore}
		  </Input>
	  	); 
	  }
	  else if( tipo === 'Txt' ){
  	  	return (
			<Txt etichetta={this.props.etichetta} chiave={chiave} campo={campo} valore={valore} disabled={this.props.disabled} noLabel={this.props.noLabel} onChange={this.handleInputChange}>
  			{valore}
  		  </Txt>
  	  	); 
	  }
	  else if( tipo === 'Data' ){
	 	 return (
	 	 	<DatePick etichetta={this.props.etichetta} chiave={chiave} campo={campo} valore={valore} disabled={this.props.disabled} noLabel={this.props.noLabel} onChange={this.handleInputChange}>
			</DatePick>
		 );
	  }
	  else if( tipo === 'Boolean' ){
		  return (
		  	<Bool etichetta={this.props.etichetta} chiave={chiave} campo={campo} valore={valore} disabled={this.props.disabled} noLabel={this.props.noLabel} onChange={this.handleInputChange}>
			</Bool>
		  );
	  }
	  else if( tipo === 'Select'){
		  return (
		  	<Select etichetta={this.props.etichetta} chiave={chiave} campo={campo} valore={valore} disabled={this.props.disabled} options={valore} noLabel={this.props.noLabel} onChange={this.handleInputChange}>
			</Select>
		  );
	  }
	  else{
   	   return (
   		  <Input etichetta={this.props.etichetta} chiave={chiave} campo={campo} valore={valore} disabled={this.props.disabled} noLabel={this.props.noLabel} onChange={this.handleInputChange}>
   			{valore}
   		   </Input>
   	  	);
	  }
  }
}

export default DataEntry;



	