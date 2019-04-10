import React, { Component } from 'react';
import './App.scss';
import Grid from './grid/grid';

class App extends Component {

  render(){
    return <Grid initialWidth={4} initialHeight={4} cellSize="50px" />
  }
}

export default App;
