import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import HomeScreen from './pages/homescreen/HomeScreen';
import CompareScreen from './pages/comparescreen/CompareScreen';
import ResultScreen from './pages/resultscreen/ResultScreen';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <HomeScreen />
        </Route>
        <Route exact path='/results'>
          <ResultScreen />
        </Route>
        <Route exact path='/genome'>
          <CompareScreen />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
