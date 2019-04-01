import React, { Component } from 'react';
import SchedaEvento from './SchedaEvento.js';

class Evento extends Component {
	constructor(props){
		super(props);
		
		this.state = {
		    error: null,
			isLoaded: false,
			data: [],
		};
		this.getTipi = this.getTipi.bind(this);
	}
	
	componentDidMount(){
		fetch("http://localhost:3000/eventi.json")
			.then( res => res.json())
			.then( (result) => {
					this.setState({ 
						data: result.data, 
						isLoaded: true 
					});
			},
			(error) => {
				this.setState({
					isLoaded: true,
					error: error
				});
			}
		)
	}
	
	getTipi() {
		return [
			'trapianto',
			'potatura',
			'cura',
			'iniziofiori',
			'finefiori'
		];
	}  		
	
  render() {
	
    return (
		<div className="container container-scheda-evento">
			<SchedaEvento titolo="Eventi" data={this.state.data} boxClose={true} tipi={this.getTipi}></SchedaEvento>
		</div>
    );
  }
}

export default Evento;
