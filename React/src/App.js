import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Dashboard from './components/Dashboard';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">MealTracker</h1>
        </header>
      <main>
        <Dashboard className="Dashboard"></Dashboard>
      </main>
      </div>
    );
  }
}

export default App;
