import React, { Component } from "react";

import Todo from "./Todo";
import Post from "./Post";

class TodosAndPosts extends Component {
  constructor() {
    super();
    this.state = {
      postTitleToAdd: "",
      postBodyToAdd: "",
      todoTitleToAdd: "",
      addTodo: false,
      addPost: false,
    };
  }

  handleValue = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };



  addOrShowTodo({ target: { innerText: str } }) {//show the add comp for todo
    this.setState({ addTodo: str === "Add Todo" ? true : false });
  }


  addOrShowPost({ target: { innerText: str } }) {//show the add comp for post
    this.setState({ addPost: str === "Add Post" ? true : false });
  }


  makeAddTodo() { // func to make the add todo comp
    return (
      <div>
        <strong>New Todo - User {this.props.id}</strong>
        <div className="addContainer">
          <label>
            Title :
            <input
              name="todoTitleToAdd"
              type="text"
              onChange={this.handleValue}
              placeholder="please enter title"
            />
          </label>{" "}
          <div className="buttons">
            <button onClick={(e) => this.addOrShowTodo(e)}>Cancel </button>
            <button
              onClick={(e) =>
                this.props.addTodo(e, this.state.todoTitleToAdd, (e) =>
                  this.addOrShowTodo(e)
                )
              }
            >
              Add{" "}
            </button>
          </div>
        </div>
      </div>
    );
  }
  makeAddPost() { // func to make the add post comp
    return (
      <div>
        <strong>New Post - User {this.props.id}</strong>

        <div className="addContainer">
          <label>
            Title :
            <input
              name="postTitleToAdd"
              type="text"
              onChange={this.handleValue}
              placeholder="please enter title"
            />
          </label>
          <label>
            Body:
            <input
              name="postBodyToAdd"
              type="text"
              onChange={this.handleValue}
              placeholder="please enter body"
            />
          </label>
          <div className="buttons">
            <button onClick={(e) => this.addOrShowPost(e)}>Cancel </button>
            <button
              onClick={(e) =>
                this.props.addPost(
                  e,
                  {
                    title: this.state.postTitleToAdd,
                    body: this.state.postBodyToAdd,
                  },
                  (e) => this.addOrShowPost(e)
                )
              }
            >
              Add{" "}
            </button>
          </div>
        </div>
      </div>
    );
  }
  creatTodos() {
    if (this.props.todos.length) { //make the todos comps
      return this.props.todos.map((todo) => {
        return (
          <Todo
            key={todo.id}
            title={todo.title}
            status={todo.completed}
            id={todo.id}
          />
        );
      });
    } else return <div className="error"> NO TODOS YET</div>;//return error if no todos
  }

  creatPosts() {//make posts comps
    if (this.props.posts.length) {
      return this.props.posts.map((post) => {
        return (
        <Post
         key={post.id} 
         title={post.title}
          body={post.body}
           />
        );
                });
    } else return <div className="error">NO POSTS YET</div>;//return error if no posts
  }

  render() {
   
    const addTodoButton = ( //button to add todo
      <button onClick={e => this.addOrShowTodo(e)}> Add Todo</button>
    );
    const addPostBtton = ( //button to add post
      <button onClick={e => this.addOrShowPost(e)}>Add Post</button>
    );

    const todos = ( // todos comp
      <div>
        <div className="titlePostOrTodo">
          <p>Todos - User {this.props.id}</p>
          {addTodoButton}
        </div>
        <div className="todos-posts-border">{this.creatTodos()}</div>
      </div>
    );
    const posts = ( // posts comp
      <div>
        <div className="titlePostOrTodo">
          <p>Posts - User {this.props.id}</p>
          {addPostBtton}
        </div>
        <div className="todos-posts-border">{this.creatPosts()}</div>
      </div>
    );
    const AddTodo = this.makeAddTodo();
    const AddPost = this.makeAddPost();

    return (// clean render return
      <div>
        {this.state.addTodo ? AddTodo : todos}
        {this.state.addPost ? AddPost : posts}
      </div>
    );
  }
}

export default TodosAndPosts;
