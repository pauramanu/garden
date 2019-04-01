import React, { Component } from 'react';
import DataEntry from './DataEntry.js';

class SchedaEvento extends Component {
    constructor(props) {
        super(props);
        this.state = {
  		 boxClose: this.props.boxClose,
  		 newRecord: false
  	  };
      this.toggleClose = this.toggleClose.bind(this);
  	  this.addRecord = this.addRecord.bind(this);
  	  this.closeBox = this.closeBox.bind(this);
	  this.addFilter = this.addFilter.bind(this);
    }

    toggleClose(event) {
		this.setState( state => ({
			boxClose: !state.boxClose,
			newRecord: false
		}));
    }
	
	closeBox(){
		this.setState( state => ({
			boxClose: true,
			newRecord: false
		}));
		
	}
	
	addRecord(e){
		e.stopPropagation();
 		this.setState( state => ({
			boxClose: false,
			newRecord: true
 		}));
	}
	
	addFilter(e){
		e.stopPropagation();
		console.log( 'filtro TODO' );
	}
	
  render() {
  	const tipi = this.props.tipi();
    const boxChiuso = this.state.boxClose ? true : false;
  	const nuovoRecord = this.state.newRecord ? true : false;
  	const newData = [{  
  		"id": "",
  		"pianta": "",
  		"tipo": "",
		"data": "",
  		"note": ""
  	}];
	
  	let righe;
  	let data;
  	let disabled;
  	let stato;
	
	let header;
	let footer = <div className="row card-footer card-evento pointer" onClick={this.addRecord}>
					Aggiungi evento 
			</div>;

	if( nuovoRecord ){
		data = newData;
		stato = 'modifica';
		disabled = false;
		footer = null;
	}
	else if( !nuovoRecord && !boxChiuso){
		data = this.props.data;
		stato = 'bloccata';
		disabled = true
	}
	
	if( boxChiuso && !nuovoRecord ){
		header = <div className="row card-header card-evento header-label">
					<div className="col-sm-6 pointer" onClick={this.toggleClose}> Visualizza Eventi </div>
					<div className="col-sm-6 pointer" onClick={this.addRecord}> Aggiungi Evento </div>
				</div>;
		footer = null;
		righe = null;
	}
	else{
		header = <div className="row card-header card-evento header-label" onClick={this.toggleClose}>
					<div className="col-sm-3">Tipo</div>
					<div className="col-sm-3">Data</div>
					<div className="col-sm-3">Note</div>
					<div className="col-sm-3 pointer" onClick={this.addFilter}>#filtro</div>
			</div>;
		righe = <div>
				<Righe 
					data={data} 
					tipi={tipi}
					nuovo={this.state.newRecord} 
					stato={stato} 
					disabled={disabled} 
					refresh={true}
					closeBox={this.closeBox}></Righe>
			</div>;
	}
	
    return (
		<div className="card card-evento">
			{header}
			{righe}
			{footer}
		</div>
    );
  }
}

class Righe extends Component {
	
    constructor(props) {	
      super(props);
      this.state = {
		  disabled: this.props.disabled,
		  stato: this.props.stato
	  };
      this.mod = this.mod.bind(this);
	  this.save = this.save.bind(this);
	  this.delete = this.delete.bind(this);
	  this.getDisabled = this.getDisabled.bind(this);
	  this.handleInputChange = this.handleInputChange.bind(this);
    }
	
	componentDidUpdate(prevProps) {
	  // Typical usage (don't forget to compare props):
	  if (this.props.disabled !== prevProps.disabled || this.props.stato !== prevProps.stato ) {
	    this.setState( state => ({
			disabled: this.props.disabled, 
			stato: this.props.stato
		}));
	  }
	}
	mod( _id, event ){
		event.stopPropagation();
		console.log( 'modifica evento: ' + _id );
		let id = event.target.id.substring(3);
		this.setState( state => ({
			disabled: true,
			stato: 'nuovoevento',
			id: id
		}));
	}
  
	save( _id, event ){
		this.setState( state => ({
			disabled: false,
			stato: 'bloccata'
		}));
		console.log( 'salva evento: ' + _id + JSON.stringify( this.state.fields) );
	}
	
	delete( _id, event ){
		event.stopPropagation();
		console.log( 'cancella evento: ' + _id );
		this.setState( state => ({
			disabled: false,
			stato: 'bloccata'
		}));
		if( this.props.nuovo ){
			this.props.closeBox();
		}
	}
	
	getDisabled( _id ){
		let disabled = true;
		if( this.state.stato === 'nuovoevento' ){
			disabled = true;
			if( _id === this.state.id ){
  			  disabled = false;
  		  }
	  	}
		else if( this.state.stato === 'modifica' ){
			disabled = false;
		}
		return disabled;
	}
	
	handleInputChange( fieldObj ){	
		var currField = this.state.fields;
		if( !currField && fieldObj ){
			this.setState( state => ({
				fields: [fieldObj]
			}));
		}
		else{
			let found = false;
			for( var i = 0; i < currField.length; i++ ){
			    if( currField[i].field === fieldObj.field ){
			        currField[i].value = fieldObj.value;
					found = true;
			    }
			}
			if( !found ){
				currField.push( fieldObj );
			}
			this.setState( state => ({
				fields: currField
			}));
		}
	}
					
  render() {
	  const nuovo = this.props.nuovo;
	  let elementi = [
		  { tipo: "String", etichetta: "Tipo", chiave: "tipo", campo: "tipo" },
		  { tipo: "Data", etichetta: "Data", chiave: "data", campo: "data" },
		  { tipo: "Txt", etichetta: "Note", chiave: "note", campo: "note" }
	  ];
	  const elementiNuovo = [
		  { tipo: "Select", etichetta: "Tipo", chiave: "tipisel", campo: "tipo" },
		  { tipo: "Data", etichetta: "Data", chiave: "data", campo: "data" },
		  { tipo: "Txt", etichetta: "Note", chiave: "note", campo: "note" }
	  ]; 
	  	  
	  if( this.state.stato === 'modifica' ){
		  elementi = elementiNuovo;
	  }
	  if( this.state.stato === 'nuovoevento' ){
		  elementi = elementiNuovo;
	  }
	  if( this.state.stato === 'bloccato' ){
	  	  elementi = elementi;
	  }
	  const righe = this.props.data;
	  const nuovaRiga = <li className="list-group-item">
	  						<div className="container">
								<Elementi
		  						id={"0000"}
								elementi={elementi} 
								valore={righe.nome} 
								riga={righe}
								tipi={this.props.tipi}
								disabled={false}
								closeBox={this.props.closeBox}
								save={this.save.bind(this, "0000")}
								cancel={this.delete.bind(this, "0000")}
								onChange={this.handleInputChange}></Elementi>
							</div>
						</li>		
					  			
	  let rigaElemento = righe.map((riga, index) =>
			<li key={index} className="list-group-item">
				<div className="container">
	  				<Elementi 
						id={riga.id}
						elementi={elementi}
						valore={riga.nome}
						riga={riga}
						tipi={this.props.tipi}
						disabled={this.getDisabled.call(this, riga.id)}
						closeBox={this.props.closeBox}
						save={this.save.bind(this, riga.id)}
						mod={this.mod.bind(this, riga.id)}
						cancel={this.delete.bind(this, riga.id)}
						onChange={this.handleInputChange}></Elementi>
				</div>
			</li>);

	   if( nuovo ){
		   return (
	   			<ul className="list-group list-group-flush">
	   				{nuovaRiga}
	   		 	</ul>
		   );
	   }
	   return (
		   <ul className="list-group list-group-flush">
		   		{rigaElemento}
		   </ul>
	  );
  }
}

class Elementi extends Component {
	constructor(props) {	
	     super(props);
	     this.state = {
		  	values: null
		 };
	     this.handleInputChange = this.handleInputChange.bind(this);
	 }
	
	handleInputChange( fieldObj ) {		
		this.props.onChange( fieldObj );
	}
	
  render() {
	  let bottoni;
  	  if( this.props.disabled === false ){	  
    			bottoni =  <div className="col-sm-3"><div className="row float-right"> 
		  			<div className="btn-group btn-group-sm" role="group" aria-label="First group">
    					<button id={'save'+ this.props.id} type="button" className="btn btn-secondary btn-success" onClick={this.props.save}>Sav</button>
    					<button id={'ann'+ this.props.id}  type="button" className="btn btn-secondary btn-warning" onClick={this.props.cancel}>Ann</button>
    				</div>
		  		</div></div>
  	  }
  	  else{
    	bottoni = 
		  <div className="col-sm-3">
		  <div className="row float-right">
		  		<div className="btn-group btn-group-sm" role="group" aria-label="Second group">
					<button id={'mod'+ this.props.id} type="button" className="btn btn-secondary btn-info" onClick={this.props.mod}>Mod</button>
    				<button id={'can'+ this.props.id} type="button" className="btn btn-secondary btn-dark" onClick={this.props.cancel}>Canc</button>
    			</div>
		  </div>
		  </div>
  	  }
	  	
	  const elementi = this.props.elementi;
	  const elementiRiga = elementi.map((elemento, key) =>  
   			<div key={key} className="col-sm-3 elemento" label={elemento.etichetta}>									  	
				<DataEntry 
	  				noLabel={true} 
					tipo={elemento.tipo} 
					etichetta={elemento.etichetta} 
					chiave={elemento.chiave}
    				campo={elemento.campo}
					tipi={this.props.tipi} 
					valore={this.props.riga} 
					disabled={this.props.disabled}
					onChange={this.handleInputChange}>
				</DataEntry>
			</div>
			
	   );
	   return (
 		  	<div className="row">
				{elementiRiga}
				{bottoni}
			</div>);
  }
}


export default SchedaEvento;
