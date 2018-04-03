import React, { Component } from 'react';
import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router-dom'
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
        <Nav bsStyle="tabs" justified activeKey={this.state.ak} onSelect={this.handleSelect}>
          <NavItem eventKey={1} class="llk"><Link to="/">Home</Link></NavItem>
          <NavDropdown eventKey="4" title="My Account" id="nav-dropdown">
          <MenuItem eventKey="4.1" class="lllk"><Link to="/myAccount/historyOrder" class="down">History Order</Link></MenuItem>
          <MenuItem eventKey="4.2" class="lllk"><Link to="/myAccount/editInfo" class="down">Edit Info</Link></MenuItem>
          </NavDropdown>
          <NavItem eventKey={3} class="llk"><Link to="/shoppingCart">Shopping Cart</Link></NavItem>
          <NavItem eventKey={4} class="llk"><Link to="/signUp">Sign up</Link></NavItem>
        </Nav>
      </div>
    );
  }
}

export { PageNav };
