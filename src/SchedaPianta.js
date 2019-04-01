import React, { Component } from 'react';
import Evento from './Evento.js';
import DataEntry from './DataEntry.js';

class SchedaPianta extends Component {
    constructor(props) {
      super(props);
      this.state = {
		 boxClose: this.props.boxClose,
		 newRecord: false
	  };
      this.toggleClose = this.toggleClose.bind(this);
	  this.addRecord = this.addRecord.bind(this);
	  this.closeBox = this.closeBox.bind(this);
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
	
  render() {
  	const boxChiuso = this.state.boxClose ? true : false;
	const nuovoRecord = this.state.newRecord ? true : false;
	const newData = [{  
		"id": "",
		"nome": "",
		"note": ""
	}];
	
	let righe;
	let data;
	let disabled;
	let stato;
	
	if( nuovoRecord ){
		data = newData;
		stato = 'modifica';
		disabled = false;
		
	}
	else if( !nuovoRecord && !boxChiuso){
		data = this.props.data;
		stato = 'bloccata';
		disabled = true
	}
	
	if( boxChiuso && !nuovoRecord ){
		righe = null;
	}
	else{
		righe = <div>
				<Righe 
					data={data} 
					nuovo={this.state.newRecord} 
					stato={stato} 
					disabled={disabled} 
					refresh={true}
					closeBox={this.closeBox}></Righe>
			</div>
	}

    return (
		<div className="card">
			<div className="row card-header card-pianta header-label">
				<div className="col-sm-6 pointer" onClick={this.toggleClose}> {this.props.titolo}</div>
   				<div className="col-sm-6 pointer" onClick={this.toggleClose}><span onClick={this.addRecord} className="float-right"> + </span></div>
  			</div>
			{righe}
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
	  if (this.props.disabled !== prevProps.disabled || this.props.stato !== prevProps.stato ) {
	    this.setState( state => ({
			disabled: this.props.disabled, 
			stato: this.props.stato
		}));
	  }
	}
	
	mod( _id, event ){
		event.stopPropagation();
		const target = event.target || event.srcElement;
		let id = event.target.id.substring(3);
		this.setState( state => ({
			disabled: true,
			stato: 'nuovapianta',
			id: id
		}));
	}
  
	save( _id, event ){
		this.setState( state => ({
			disabled: false,
			stato: 'bloccata'
		}));
		console.log( 'salva pianta: ' + _id + JSON.stringify( this.state.fields) );
	}
	
	delete( _id, event ){
		event.stopPropagation();
		console.log( 'cancella pianta: ' + _id );
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
		if( this.state.stato === 'nuovapianta' ){
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
	  const elementi = [
		{ tipo: "String", etichetta: "Nome", chiave: "nome", campo: "nome" },
		{ tipo: "Txt", etichetta: "Note", chiave: "note", campo: "note" }
	  ];
	  let righe = this.props.data; 	  
	  const nuovaRiga = 
		  <li className="list-group-item">
			<div className="container">
	  			<Elementi 
		  			id={'00'}
		  			elementi={elementi} 
					valore={righe.nome} 
					riga={righe} 
					disabled={false}
					closeBox={this.props.closeBox}
					save={this.save.bind(this, "00")}
					cancel={this.delete.bind(this, "00")}
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
					disabled={this.getDisabled.call(this, riga.id)}
					closeBox={this.props.closeBox}
					save={this.save.bind(this, riga.id)}
					mod={this.mod.bind(this, riga.id)}
					cancel={this.delete.bind(this, riga.id)}
					onChange={this.handleInputChange}></Elementi>
	  		</div>
	  	</li>
	   );
	  
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
	  let eventi;
  	  if( this.props.disabled === false ){	  
		  bottoni = <div className="col-sm-5">
		  	<div className="btn-group btn-group-sm float-right" role="group">
    			<button id={'save'+ this.props.id} type="button" className="btn btn-secondary btn-success" onClick={this.props.save}>Sav</button>
    			<button id={'ann'+ this.props.id}  type="button" className="btn btn-secondary btn-warning" onClick={this.props.cancel}>Ann</button>
		  	</div>
		  </div>;
  	  }
  	  else{
    	bottoni = 
		  	<div className="col-sm-5">
		  		<div className="btn-group btn-group-sm float-right" role="group">
					<button id={'mod'+ this.props.id} type="button" className="btn btn-secondary btn-info" onClick={this.props.mod}>Mod</button>
    				<button id={'can'+ this.props.id} type="button" className="btn btn-secondary btn-dark" onClick={this.props.cancel}>Canc</button>
		  		</div>
		  	</div>;
		  
		 eventi = <div className="col-sm-12">
		  	<Evento idPainta={this.props.id}></Evento>
		</div>;
  	  }
	  	 
	  const elementi = this.props.elementi;
	  let elementiRiga = elementi.map((elemento, key) =>  
   			<div key={key} className="col-sm-auto elemento" label={elemento.etichetta}>									  	
				<DataEntry 
				  tipo={elemento.tipo} 
				  etichetta={elemento.etichetta} 
				  chiave={elemento.chiave}
				  campo={elemento.campo}
				  valore={this.props.riga} 
				  disabled={this.props.disabled}
				  input={this.props.getInput}
				  onChange={this.handleInputChange}>
				</DataEntry>  
			</div>
	   );
	   return (
		   <div>
		   		<div className="row">	
					{elementiRiga}
					{bottoni}					
				</div>
				<div className="row">
					{eventi}
				</div>
		   </div>
	  	);
  }
}

export default SchedaPianta;
