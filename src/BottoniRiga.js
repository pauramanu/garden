import React, { Component } from 'react';
import DataEntry from './DataEntry.js';

class BottoniRiga extends Component {
	
	
    constructor(props) {
      super(props);
      this.state = {
		  disabled: this.props.disabled,
		  gruppo: 'modifica-cancella',
		  stato: 'bloccata'
	  };
	  
      this.enableEdit = this.enableEdit.bind(this);
	  this.save = this.save.bind(this);
    }
	
    enableEdit(event) {
		this.setState( state => ({
			disabled: true,
			gruppo: 'salva-annulla',
			stato: 'modifica'
		}));
    }
	
	save(event){
		this.setState( state => ({
			disabled: true,
			gruppo: 'salva-annulla',
			stato: 'bloccata'
		}));
	}
	
  render() {	
	const elementi = [
				{ tipo: "String", etichetta: "Nome", chiave: "nome" },
				{ tipo: "String", etichetta: "Varieta", chiave: "varieta" },
				{ tipo: "String", etichetta: "Germinazione", chiave: "germinazione" },
				{ tipo: "String", etichetta: "12ata", chiave: "ata" },
				{ tipo: "Date", etichetta: "Fioritura", chiave: "fioritura" },
				{ tipo: "String", etichetta: "Raccolta", chiave: "raccolta" },
				{ tipo: "Txt", etichetta: "Note", chiave: "note" }
			];
	 
	  let righe = this.props.data;
	  let gruppoBottoni = this.state.gruppo;
	  let bottoni;
		  if( gruppoBottoni === 'salva-annulla' ){
	  			bottoni = <div className="btn-group btn-group-sm float-right" role="group" aria-label="First group">
    				<button type="button" className="btn btn-secondary btn-success" onClick={this.save}>Sav</button>
    				<button type="button" className="btn btn-secondary btn-warning">Ann</button>
	  			</div>
		  }
		  else if( gruppoBottoni === 'modifica-cancella' ){
	  			bottoni = <div className="btn-group btn-group-sm float-right" role="group" aria-label="First group">
    				<button type="button" className="btn btn-secondary btn-info" onClick={this.enableEdit}>Mod</button>
    				<button type="button" className="btn btn-secondary btn-dark">Canc</button>
	  			</div>
		  }

	  
	  let rigaElemento = righe.map((riga, index) =>
		<li key={index} className="list-group-item">
			<div className="container">
	  			
	  			{bottoni}
	  		</div>
	  	</li>
	   );
	   return (
		   <ul className="list-group list-group-flush">
		   		{rigaElemento}
		   </ul>
	  );
  }
}

class Righe extends Component {
	
   
}

export default BottoniRiga;