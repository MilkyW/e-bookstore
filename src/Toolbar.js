import React, { Component } from 'react';
import { Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom'
import { EE } from './Home';
import './Toolbar.css';

var EventEmitter = require('eventemitter3');
var EE0 = new EventEmitter();

const logins = new Map([
  ['admin', ['admin', 0]],
  ['customer', ['customer', 1]]
]);

var login = null;

class Toolbar extends Component {
    constructor(props) {
      super(props);
      this.state = {
        login: false,
        userId: login,
        password: null,
        wrong: false,
        search: false,
        validationState: "null",
      };
      this.submitSearch = this.submitSearch.bind(this);
      EE0.on('signIn', function(arg1){
          this.setState({
            login: true,
            userId: arg1,
          });
          login = arg1;
      }.bind(this));
      this.signIn = this.signIn.bind(this);
      this.signOut = this.signOut.bind(this);
      this.clear = this.clear.bind(this);
      this.handlecp = this.handlecp.bind(this);
      this.handlecu = this.handlecu.bind(this);
    }
  
    handlecu(e) {
      this.setState({
        userId: e.target.value,
      })
    }
  
    handlecp(e) {
      this.setState({
        password: e.target.value,
      })
    }
  
    clear() {
      this.setState({
        validationState: "null",
      })
    }

    signIn() {
      var userId = this.state.userId;
      var password = this.state.password;
      if ((userId === null) || (password === null)
        || (!logins.has(userId)) || (logins.get(userId)[0] !== password)) {
        this.setState({
          validationState: "error",
        })
        return;
      }
      this.setState({
        login: true,
      });
      login = this.state.userId;
      EE0.emit('signIn', this.state.userId);
      if (logins.get(userId)[1] === 0)
        EE0.emit('admin');
      if (logins.get(userId)[1] === 1)
        EE0.emit('customer');
    }
  
    signOut(){
      this.setState({
        userId: null,
        password: null,
        login: false,
      });
      EE0.emit('signOut');
      this.clear();
    }
  
    submitSearch() {
      EE.emit('pushSearch');
    }

    add(){
      EE.emit('add');
    } 

    render() {
      if (!this.state.login) {
        return (
          <div>
            <Form componentClass="fieldset" inline justified>
              <FormGroup bsSize="small" validationState={this.state.validationState}>
                <FormControl id="se1" onChange={this.handlecu} type="text" value={this.state.userId} placeholder="UserID" />
                <FormControl.Feedback />
                <FormControl id="se1" onChange={this.handlecp} type="password" value={this.state.password} secureTextEntry placeholder="Password" />
                <FormControl.Feedback />
              </FormGroup>
              <Button bsStyle="info" onClick={this.signIn} type="submit">Sign in</Button>
              <span class="ch12" ></span><span class="ch12" ></span>
              <Button onClick={this.submitSearch} type="submit">Search</Button>
              <Button onClick={this.add}>Add</Button>
            </Form>
          </div >
        );
      }
      return (
        <div>
          <Redirect to="/home" push/>
          <Form componentClass="fieldset" inline justified>
            <ControlLabel id="hellomsg">Hello,&nbsp;&nbsp;&nbsp;&nbsp;{login}!</ControlLabel>
            <span class="ch13" ></span><span class="ch12" ></span>
            <Button bsStyle="info" onClick={this.signOut} href="/" type="submit">Sign out</Button>
            <span class="ch12" ></span><span class="ch12" ></span>
            <Button onClick={this.submitSearch} type="submit">Search</Button>
          </Form>
        </div >
      );    
    }
  }

  export { Toolbar , logins, login, EE0 };