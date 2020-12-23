import './App.css';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import StockRequestPage from './screens/stockrequest';
import RequestDetails from './screens/requestdetails';
import LoginPage from './screens/login';
import Dashboard from './screens/dashboard';
import Nav from './screens/nav';
import ReviewTable from './screens/review';
import StatusDetails from './screens/statusdetails';
import Product from './screens/productanalysis';
import Sales from './screens/salesdetails';

function App() {
  return (
    <Router>
    <Switch>
      <Route path="/" exact component ={Dashboard} />
      <Nav path="/stockrequest" exact component ={StockRequestPage} />
      <Nav path="/request" exact component ={RequestDetails} />
      <Nav path="/login" exact component ={LoginPage} />
      <Nav path="/reviewtable" exact component ={ReviewTable} />
      <Nav path="/statusdetails" exact component ={StatusDetails} />
      <Nav path="/productdetails" exact component ={Product} />
      <Nav path="/salesdetails" exact component ={Sales} />
    </Switch>
    </Router>
  );
}

export default App;
