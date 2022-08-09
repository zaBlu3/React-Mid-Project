import React, { Component } from "react";
import Context from "./Context";


export default class Todo extends Component {

  
  
  

  render() {

    return (
      //context to get the fun to complete a todo 
        <Context.Consumer> 
        {({completeIt}) => {
           return (
            <div className="todo">
              <div style={{width: "fit-content"}}>
                <p>Title : {this.props.title}</p> 
                <p>Completed : <span>{this.props.status.toString()}</span></p>
                </div>
                {this.props.status ? null : <button onClick={() => completeIt(undefined ,this.props.id)}>Mark Completed</button>}
            </div>
          );
        }}
      </Context.Consumer>
       
     
    );
  }
}
