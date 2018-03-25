import React, { Component } from 'react';
import logo from './logo.svg';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/css/bootstrap-theme.min.css'
import './App.css';
import { Button, ButtonToolbar, Table, Nav, Navbar, NavItem, NavDropdown, DropdownButton, MenuItem, Form, FormGroup, FormControl } from 'react-bootstrap';


const navbar = {backgroundColor: 'rgb(0, 0, 0)', borderBottomWidth:"3px" ,borderColor: '#5B6066'};

class PageNav extends Component {
  handleSelect(selectedKey) {
  }

  render() {
    return (
      <div>
          <Nav bsStyle="tabs" justified activeKey={1} onSelect={this.handleSelect}>
            <NavItem style={navbar} eventKey={1} href="/home">Home</NavItem>
            <NavItem style={navbar} eventKey={2} title="Item">My Account</NavItem>
            <NavItem style={navbar} eventKey={3} >Shopping Cart</NavItem>
            <NavItem style={navbar} eventKey={4} >Sign up</NavItem>
          </Nav>
      </div>
    );
  }
}

class MyHeader extends Component {
  render() {
    return (
      <div className="MyHeader">
        <Table id="headerbg" cellspacing={0} cellpadding={0} width={745} border={0} align="center">
          <tr width={745}><td height={120}></td></tr>
          <tr width={745}><div id="pn"><PageNav className="mypn" /></div></tr>
          <tr width={745}>
            <td height={70}>
              <Form componentClass="fieldset" inline justified>
                <FormGroup bsSize="small">
                  <FormControl id="se0" type="text" placeholder="From" />
                  <FormControl id="se0" type="text" placeholder="To" />
                  <FormControl id="se1" type="text" placeholder="Keyword" />
                </FormGroup>
              </Form>
            </td>
          </tr>
        </Table >
      </div >
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <MyHeader />
        <div>{}</div>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
