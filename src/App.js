import './App.css';
import {BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import MainPage from './screens/main-page';
import ScreenOne from './screens/screen1';


function App() {
  return (
    <Router>
    <Switch>
      <Route path="/" exact component ={MainPage} />
      <Route path="/screenone" exact component ={ScreenOne} />
    </Switch>
    </Router>
  );
}

export default App;
