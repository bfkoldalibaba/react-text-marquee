import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Marquee from '../src';

class App extends React.Component {
  state = {}

  render() {
    const state = this.state;
    return (
      <div className="App">
        <Marquee hoverToStop={true} loop={true} leading={0} speed={1} text="Wow this is really quite a long message but it can be handled by this component just fine" />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('sk-root'));
