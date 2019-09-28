import React, { Component } from 'react';
import './App.css';
import { DndProvider  } from 'react-dnd';
import HTMLBackend from 'react-dnd-html5-backend';

class App extends Component {
  render() {
    return (
        <div className="App">
            <DndProvider backend={HTMLBackend}>
                {this.props.children}
            </DndProvider>
        </div>
    );
  }
}
  // 。。。
export default App;
