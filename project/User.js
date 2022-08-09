import React, { Component } from "react";

import Address from "./Address";
import "./userProject.css";



export default class User extends Component {
	constructor({//getting the props in constructor
		user: {
			id,
			name,
			email,
			address: { street, city, zipcode },
		},
	}) {
		super();
		this.state = {
			showOtherData: false,
			id,
			name,
			email,
			street,
			city,
			zipcode,
		
		};
	}

	showHideAddress = ({ type }) => {//fun to show adress comp
		if (
			(this.state.showOtherData && type == "mouseover") ||
			(!this.state.showOtherData && type == "click")
		)//disbale rendering when clicking or mouseover more than once
			
			return;
		this.setState({ showOtherData: type == "click" ? false : true });
	};

	handleValue = ({ target: { name, value } }) => {// handle value of inputs
		this.setState({ [name]: value });
	};

	render() {
		return (
			<div
				className={`user${this.props.selected ? " selected" : ""}${
					this.props.completed ? " completed" : " not-completed"
				}`}
			>
				<span onClick={(e) => this.props.showTodo(this.props.user.id)}>
					{" "}
					ID : {this.props.user.id}
				</span>{" "}
				<br />
				<label>
					Name :{" "}
					<input
						name="name"
						type="text"
						onChange={this.handleValue}
						defaultValue={this.props.user.name}
					/>
				</label>{" "}
				<br />
				<label>
					Email :{" "}
					<input
						name="email"
						type="email"
						onChange={this.handleValue}
						defaultValue={this.props.user.email}
					/>
				</label>{" "}
				<br />
				<button
					style={{ backgroundColor: `#bfbfbf ` }}
					onClick={this.showHideAddress}
					onMouseOver={this.showHideAddress}
				>
					Other Data
				</button>
				{this.state.showOtherData ? (
					<Address
						handleValue={this.handleValue}
						address={this.props.user.address}
					/>
				) : null}
				<div className="buttons">
					<button onClick={(e) => this.props.updateUser({ ...this.state })}>
						Update
					</button>
					<button onClick={this.props.deleteUser}>Delete</button>
				</div>
				
			</div>
		);
	}
}
