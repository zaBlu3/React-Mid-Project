import React, { Component } from "react";


export default class Post extends Component {
 
  
  

  render() {

    return (
        
      <table className="post">
        <tbody>
        <tr>
          <td>
            <span> Title :</span>
         
          </td>
          <td>
          {this.props.title}
          </td>
        </tr>
        <tr>
          <td>
          Body :
          </td>
          <td>
          {this.props.body}
          </td>
        </tr>
        </tbody>
         
     </table>
    );
  }
}
