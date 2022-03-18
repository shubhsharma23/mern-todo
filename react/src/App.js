import React from 'react';
import './App.css'; 
import Student from './Student'

class App extends React.Component{
  constructor(props){
    super();
    this.state = {
    }
    console.log("constructor");
  }

  componentDidMount(){
    console.log("componentDidMount");
  }

  componentDidUpdate(preProp, preState, temp){
    console.log("componentDidUpdate");
  }

  shouldComponentUpdate(){
    console.log("shouldComponentUpdate");
    return true;
  }


  render(){
    console.log("render");
    return(
      <>
      <Student />
      </>
    )
  }
}


export default App;
