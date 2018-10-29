import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from '../store';

import NavBar from './NavBar';
import Main from './Main';

class App extends Component {
  render() {
    return (
      <Provider store={configureStore()}>
	<Router>
	  <div className="App">
	    <NavBar />
	    <Main />
	  </div>
	</Router>
      </Provider>
    );
  }
}

export default App;
