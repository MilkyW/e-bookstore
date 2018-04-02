import React, { Component } from 'react';
import { Nav, NavItem } from 'react-bootstrap';
import './PageNav.css';

class PageNav extends Component {
  constructor(props){
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
  }
  handleSelect(selectedKey) {
  }

  render() {
    return (
      <div>
        <Nav bsStyle="tabs" justified activeKey={1} onSelect={this.handleSelect}>
          <NavItem eventKey={1} href="/home">Home</NavItem>
          <NavItem eventKey={2} href="/myAccount">My Account</NavItem>
          <NavItem eventKey={3} href="/shoppingCart">Shopping Cart</NavItem>
          <NavItem eventKey={4} href="/signUp">Sign up</NavItem>
        </Nav>
      </div>
    );
  }
}

export { PageNav };
