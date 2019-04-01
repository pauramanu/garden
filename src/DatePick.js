import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
 
class DatePick extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
		value: new Date()
    };
    this.handleChange = this.handleChange.bind(this);
  }
  
  componentDidUpdate( oldProps ) {
  	  const newProps = this.props;
  	  if( oldProps.disabled !== newProps.disabled ) {
  		  this.setState({value: new Date()})
  	  }
    }
  
    handleChange( date ) {
	      this.setState({
	        value: date
	      });
	  	  this.props.onChange( {field: this.props.campo, value: date} );
    }
  
  render() {
	  const datePick = <div ><DatePicker
	  className="form-control"
			selected={this.state.value}
			dateFormat="dd/MM/YYYY"
		    onChange={this.handleChange}
			todayButton={"Today"}
			fixedHeight
			showWeekNumbers
			disabled={this.props.disabled}
		/></div>;

	  if( this.props.noLabel ){
		  return (
      		<form onSubmit={this.handleSubmit}>
			  		{datePick}
      		</form>
		  );
	  }
    return (
		<form className="form-control">
			<div className="input-group input-group-sm">
				<div className="input-group-prepend">
					<span className="input-group-text ">{this.props.etichetta}</span>
				</div>
			  	{datePick}
			</div>
		</form>
      
    );
  }
}

export default DatePick;

