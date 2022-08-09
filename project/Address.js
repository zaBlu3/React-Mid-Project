import React, { Component } from "react";

class Address extends Component {
	
	render() {
		return (
			
					
						<div className="address">
							<label>
								Street :{" "}
								<input
									onChange={this.props.handleValue}
									type="text"
									name="street"
									defaultValue={this.props.address.street}
								/>
							</label>{" "}
							<br />
							<label>
								City :{" "}
								<input
									onChange={this.props.handleValue}
									type="text"
									name="city"
									defaultValue={this.props.address.city}
								/>
							</label>{" "}
							<br />
							<label>
								Zipcode :{" "}
								<input
									onChange={this.props.handleValue}
									type="text"
									name="zipcode"
									defaultValue={this.props.address.zipcode}
								/>
							</label>{" "}
							
						</div>
					
				
			
		);
	}
}
export default Address;
