import React, { Component } from 'react';
import SchedaPianta from './SchedaPianta.js';

class Pianta extends Component {
	constructor(props){
		super(props);
		
		this.state = {
		    error: null,
			isLoaded: false,
			data: [],
		};
	}
	
	componentDidMount(){
		fetch("http://localhost:3000/piante.json")
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
	
  render() {
    return (
		<div className="container container-scheda-pianta">
			<SchedaPianta titolo="Piante" data={this.state.data} boxClose={true}></SchedaPianta>
		</div>
    );
  }
}

export default Pianta;
