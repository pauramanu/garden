import React, { Component } from 'react';
import DataEntry from './DataEntry';

class Scheda extends Component {
    constructor(props) {
      super(props);
      this.state = {
		 	 isClose: true
	  		};
      this.toggleClose = this.toggleClose.bind(this);
    }

    toggleClose(event) {
		this.setState( state => ({
			isClose: !state.isClose
		}));
    }
  render() {
	const stile = this.props.stile;
	const boxChiuso = this.state.isClose ? true : false;
	let righe;

	if( !boxChiuso ){
		righe = <div>
					<Righe scheda={this.props.scheda} data={this.props.data}></Righe>
				</div>
	}
	
    return (
		<div className="card">
			<div className="card-header" style={stile} onClick={this.toggleClose}>
				{this.props.titolo}
  			</div>
			{righe}
		</div>
    );
  }
}

class Righe extends Component {
  render() {	
	  const righe = this.props.data;
	  const rigaElemento = righe.map((riga, index) =>
		<li key={index} className="list-group-item">
			<div className="container">
		 		<Riga scheda={this.props.scheda} dati={riga}></Riga>
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

class Riga extends Component {
  render() {	
	
	  const dati = this.props.dati;
	  const scheda = this.props.scheda;
	  const rigaElemento = dati.map((elemento, key) =>  
   			<div key={key} className="col-sm-auto" label={elemento.etichetta}>
				<DataEntry tipo={elemento.tipo} etichetta={elemento.etichetta} valore={elemento.valore}>
					{elemento.valore}
				</DataEntry>
			</div>
	   );
	   return (
		   <div className="row">{rigaElemento}</div>
	  	);
  }
}


export default Scheda;
