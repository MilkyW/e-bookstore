import React, { Component } from 'react';
import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom'
import './PageNav.css';
import { EE0 } from './Toolbar';

class PageNav extends Component {
  constructor(props){
    super(props);
    this.state = {
      ak: 1,
      login: false,
      power: null,
    };
    this.handleSelect = this.handleSelect.bind(this);
    EE0.on('signIn', this.hdsi.bind(this));
    EE0.on('signOut', this.hdso.bind(this));
    EE0.on('admin', this.hdam.bind(this));
    EE0.on('customer', this.hdcs.bind(this));
  }

  hdsi(){
    this.setState({
      login: true,
      ak: 1,
    });
  }

  hdso(){
    this.setState({
      login: false,
      power: null,
      ak: 1,
    })
    this.render();
  }

  hdam(){
    this.setState({
      power: 0,
    })
    this.render();
  }

  hdcs(){
    this.setState({
      power: 1,
    })
    this.render();
  }

  handleSelect(selectedKey) {
    this.setState({
      ak: selectedKey,
    });
  }

  render() {
    if (this.state.login === false)
    return (
      <div>
        <Redirect to="/home"/>
        <Nav bsStyle="tabs" justified activeKey={this.state.ak} onSelect={this.handleSelect}>
          <NavItem eventKey={1} class="llk"><Link to="/home">Home</Link></NavItem>
          <NavItem eventKey={4} class="llk"><Link to="/signUp">Sign up</Link></NavItem>
        </Nav>
      </div>
    );

    if (this.state.login === true && this.state.power === 1)
    return (
      <div>
        <Redirect to="/home"/>
        <Nav bsStyle="tabs" justified activeKey={this.state.ak} onSelect={this.handleSelect}>
          <NavItem eventKey={1} class="llk"><Link to="/home">Home</Link></NavItem>
          <NavDropdown eventKey="4" title="My Account" id="nav-dropdown">
          <MenuItem eventKey="4.1" class="lllk"><Link to="/myAccount/historyOrder" class="down">History Order</Link></MenuItem>
          <MenuItem eventKey="4.2" class="lllk"><Link to="/myAccount/editInfo" class="down">Edit Info</Link></MenuItem>
          </NavDropdown>
          <NavItem eventKey={3} class="llk"><Link to="/shoppingCart">Shopping Cart</Link></NavItem>
        </Nav>
      </div>
    );

    if (this.state.login === true && this.state.power === 0)
    return (
      <div>
        <Nav bsStyle="tabs" justified activeKey={this.state.ak} onSelect={this.handleSelect}>
          <NavItem eventKey={1} class="llk"><Link to="/home">Home</Link></NavItem>
          <NavItem eventKey={2} class="llk"><Link to="/storehouse">Storehouse</Link></NavItem>
          <NavItem eventKey={3} class="llk"><Link to="/users">Users</Link></NavItem>
          <NavItem eventKey={4} class="llk"><Link to="/sales">Sales</Link></NavItem>
        </Nav>
      </div>
    );
  }
}

export { PageNav };
