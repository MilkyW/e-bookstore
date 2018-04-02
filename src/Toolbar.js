import React, { Component } from 'react';
import { Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import { EE } from './Home';
import './Toolbar.css';

const logins = new Map([['admin', 'admin']]);

class Toolbar extends Component {
    constructor(props) {
      super(props);
      this.state = {
        login: false,
        userId: null,
        password: null,
        wrong: false,
        search: false,
        validationState: "null",
      };
      this.submitSearch = this.submitSearch.bind(this);
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
        || (!logins.has(userId)) || (logins.get(userId) !== password)) {
        this.setState({
          validationState: "error",
        })
        return;
      }
      this.setState({
        login: true,
      })
    }
  
    signOut(){
      this.setState({
        userId: null,
        password: null,
        login: false,
      })
      this.clear();
    }
  
    submitSearch() {
      EE.emit('pushSearch', 'Toolbar')
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
            </Form>
          </div >
        );
      }
      return (
        <div>
          <Form componentClass="fieldset" inline justified>
            <ControlLabel id="hellomsg">Hello,&nbsp;&nbsp;&nbsp;&nbsp;{this.state.userId}!</ControlLabel>
            <span class="ch13" ></span><span class="ch12" ></span>
            <Button bsStyle="info" onClick={this.signOut} type="submit">Sign out</Button>
            <span class="ch12" ></span><span class="ch12" ></span>
            <Button onClick={this.submitSearch} type="submit">Search</Button>
          </Form>
        </div >
      );    
    }
  }

  export { Toolbar };