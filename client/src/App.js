import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomeScreen from './pages/homescreen/HomeScreen';
import CompareScreen from './pages/comparescreen/CompareScreen';
import ResultScreen from './pages/resultscreen/ResultScreen';

function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;
