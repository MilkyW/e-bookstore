import React, { Component } from 'react';
import logo from './logo.svg';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/css/bootstrap-theme.min.css'
import './App.css';
import { MyHeader } from './MyHeader';
import { MyFooter } from './MyFooter';
import { Home } from './Home';
import { EditInfo } from './EditInfo';
import { SignUp } from './SignUp';
import { Switch, Route } from 'react-router-dom'

class HistoryOrder extends Component {
  render(){
    return (null);
  }
}

class ShoppingCart extends Component {
  render(){
    return (null);
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <MyHeader />
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/myAccount/historyOrder' component={HistoryOrder}/>
          <Route path='/myAccount/editInfo' component={EditInfo}/>
          <Route path='/shoppingCart' component={ShoppingCart}/>
          <Route path='/signUp' component={SignUp}/>
        </Switch>
        <MyFooter />
        <div>{}</div>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
      </div>
    );
  }
}

export default App;
