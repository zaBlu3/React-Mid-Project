import React, { Component } from "react";
import {
	getUserTodos,
	getUserPosts,
	getPosts,
	getTodos,
	getUsers,
} from "./utils";
import User from "./User";
import Context from "./Context";
import TodosAndPosts from "./TodosAndPosts";

const usersUrl = "https://jsonplaceholder.typicode.com/users";
const todosUrl = "https://jsonplaceholder.typicode.com/todos";
const postsUrl = "https://jsonplaceholder.typicode.com/posts";

class Users extends Component {
	constructor() {
		super();
		this.state = {
			search: "",
			name: "",
			email: "",
			addWindow: false,
			users: [],
			todos: [],
			posts: [],
			todoPostId: "",
		};
	}
	async componentDidMount() {
		const users = await getUsers(usersUrl);
		const todos = await getTodos(todosUrl);
		const posts = await getPosts(postsUrl);
		this.setState({ posts, todos, users });
	}

	handleValue = ({ target: { name, value } }) => {
		this.setState({ [name]: value });
	};




	showHideAddUser({ target: { innerText: str } }) {//show the add user comp
		this.setState({
			todoPostId: "",
			addWindow: str === "Add User" ? true : false,
		});
	}
	
	updateUser = ({ id, name, email, street, city, zipcode }) => { //update user func
		const users = this.state.users;
		const user = users.find((user) => user.id == id);
		const index = users.indexOf(user);
		users[index] = {
			...user,
			name,
			email,
			address: { ...user.address, street, city, zipcode },
		};
		this.setState({ users });
	};


	deleteUser = (id) => {//delete user func
		const users = this.state.users;
		const index = users.findIndex((user) => user.id == id);
		users.splice(index, 1);
		const todos = this.state.todos.filter(({ userId }) => userId != id);
		const posts = this.state.posts.filter(({ userId }) => userId != id);
		if (this.state.todoPostId == id) this.setState({ todoPostId: "" });
		this.setState({ users, todos, posts });
	};



	addUser = ({ name, email }) => {//add user func
		if (name == "" || email == "") return alert("Please enter Name and Email");//validate not empty inputs
		const users = this.state.users;
		const { id } = users[users.length - 1];
		const user = { name, email, id: id + 1, address: {} };
		users.push(user);
		this.setState({ users, addWindow: false ,name :"",email:""});
	};





	showHideTodosAndPosts = (userId) => {//show the todos and post comp
		if (userId == this.state.todoPostId) this.setState({ todoPostId: "" });
		else this.setState({ todoPostId: userId, addWindow: false });
	};

	checkUserTodosCompleded(id) {// check if all users todos are completed
		const userTodo = getUserTodos(this.state.todos, id);
		return userTodo.every(({ completed }) => completed);
	}

	completeTodo(todoId) {//complete todo
		this.state.todos.find(({ id }) => id == todoId).completed = true;
		this.setState({todos : this.state.todos});
	}


	addTodo(//add new todo
		e,
		title,
		callback,
		userId = this.state.todoPostId,
		completed = false
	) {
		if (title === "") return alert("Please enter title");
		const todos = this.state.todos;
		const id = todos.at(-1).id +1
		const todo = { completed, id, title, userId };
		const index = todos.map(({ userId }) => userId).lastIndexOf(userId);
		if (index != -1) todos.splice(index + 1, 0, todo);
		else todos.push(todo);
		callback(e); //to go back of showing todos
		this.setState({ todos });
	}


	addPost(//add new post
		e,
		{ title, body },
		callback,
		userId = this.state.todoPostId
	) {
		if (title === "" || body === "")
			return alert("Please enter title and body");
			const posts = this.state.posts;
			const id = posts.at(-1).id +1
			const post = { body, id, title, userId };
		
		const index = posts.map(({ userId }) => userId).lastIndexOf(userId);
		if (index != -1) posts.splice(index + 1, 0, post);
		else posts.push(post);
		callback(e); //to go back of showing posts
		this.setState({ posts });
	}

	makeAddWindow() { // this is the add user window - func instead of hardcoded in render
		return (
			<div style={{ marginTop: "50%" }}>
				<h1>Add New User</h1>
				<div className="addContainer">
					<label>
						Name :
						<input
							name="name"
							type="text"
							onChange={(e) => this.handleValue(e)}
							placeholder="please enter name"
						/>
					</label>
					<label>
						Email :
						<input
							name="email"
							type="email"
							onChange={(e) => this.handleValue(e)}
							placeholder="please enter email"
						/>
					</label>
					<div className="buttons">
						<button onClick={(e) => this.showHideAddUser(e)}>Cancel </button>
						<button onClick={(e) => this.addUser({ ...this.state })}>
							Add{" "}
						</button>
					</div>
				</div>
			</div>
		);
	}

	render() {
		function searchUsers(users, search) {// function to search user
			return users.filter(
				({ name, email }) =>
					name.toLowerCase().includes(search) ||
					email.toLowerCase().includes(search)
			);
		}

		const addUserWinodw = this.makeAddWindow();//the add user comp

		const users = searchUsers(//filtering users by search
			this.state.users,
			this.state.search.toLowerCase()
		).map((user) => {
			return (
				<User
					key={user.id}
					completed={this.checkUserTodosCompleded(user.id)}
					selected={this.state.todoPostId == user.id ? true : false}//selected background
					user={user}
					showTodo={this.showHideTodosAndPosts}
					deleteUser={(e) => this.deleteUser(user.id)}
					updateUser={this.updateUser}
				/>
			);
		});

		return (
			<div className="main">
				<div className="users">
					<div className="search"> 
						<label>
							Search
							<input
								name="search"
								type="text"
								onChange={this.handleValue}
								placeholder="search..."
								autoComplete="off"
							/>
						</label>
						<button onClick={(e) => this.showHideAddUser(e)}>Add User</button>
					</div>
					{users}
				</div>
				<div className="todos-posts">
					{this.state.addWindow ? (
						addUserWinodw
					) : this.state.todoPostId != "" ? (
						//context to send fun to the todo comp without drilling it to the todosandposts comp
						<Context.Provider 
							value={{ completeIt: (_, id) => this.completeTodo(id) }}
						> 
							<TodosAndPosts
								addTodo={(e, title, callback) =>
									this.addTodo(e, title, callback)
								}
								addPost={(e, title, callback) =>
									this.addPost(e, title, callback)
								}
								id={this.state.todoPostId}
								todos={getUserTodos(this.state.todos, this.state.todoPostId)}
								posts={getUserPosts(this.state.posts, this.state.todoPostId)}
							/>
						</Context.Provider>
					) : null}
				</div>
			</div>
		);
	}
}

export default Users;
