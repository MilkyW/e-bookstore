import React, { Component } from 'react';
import { Nav, NavItem } from 'react-bootstrap';
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
          <NavItem eventKey={2} href="/myAccount">My Account</NavItem>
          <NavItem eventKey={3} href="/shoppingCart">Shopping Cart</NavItem>
          <NavItem eventKey={4} href="/signUp">Sign up</NavItem>
        </Nav>
      </div>
    );
  }
}

export { PageNav };
