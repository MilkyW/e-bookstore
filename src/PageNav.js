import React, { Component } from 'react';
import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import './PageNav.css';

window.page = 1;

class PageNav extends Component {
  constructor(props){
    super(props);
    this.state = {
      ak: 1,
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(selectedKey) {
    this.setState({
      ak: selectedKey,
    });
  }

  render() {
    return (
      <div>
        <Nav bsStyle="tabs" justified activeHref={window.location.pathname} onSelect={this.handleSelect}>
          <NavItem eventKey={1} href="/">Home</NavItem>
          <NavDropdown eventKey="4" title="My Account" id="nav-dropdown">
          <MenuItem eventKey="4.1" href="/myAccount/historyOrder">History Order</MenuItem>
          <MenuItem eventKey="4.2" href="/myAccount/editInfo">Edit Info</MenuItem>
          </NavDropdown>
          <NavItem eventKey={3} href="/shoppingCart">Shopping Cart</NavItem>
          <NavItem eventKey={4} href="/signUp">Sign up</NavItem>
        </Nav>
      </div>
    );
  }
}

export { PageNav };
