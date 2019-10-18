import React, { Component } from 'react';
import {PostBody} from './components/post.js'
import './App.css';

class App extends Component {

  getUsers(num) {
    let users =
    [
    ]
    
    for(let i =0; i < num; i++) {
      users.push(<PostBody key={i}/>);
    }

    return users;

  }
  
  render() {
    return (
      <div className="main-body">
        {this.getUsers(5)}
      </div>
    )
  }
}

export default App;
