import React, { Component } from 'react';
import logo from './logo.svg';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/css/bootstrap-theme.min.css'
import './App.css';
import { Button, ButtonToolbar, Table, Nav, Navbar, NavItem, NavDropdown, DropdownButton, MenuItem, Form, FormGroup, FormControl } from 'react-bootstrap';

const headers = [
  "Book", "Author", "Language", "Published", "Sales"
];

const data = [
  ["The Lord of the Rings", "J.R.R.Tolkien", "English", "1954-1955", "150 million"],
  ["Le Petit Prince (The Little Prince)", "Antoine de Saint-Exupery", "French", "1943", "140 million"],
  ["Harry Potter and the Philosopher's Stone", "J.K.Rowling", "English", "1997", "107 millon"],
  ["And Then There Were None", "Agatha Christie", "English", "1939", "100 million"],
  ["Dream of the Red Chamber", "Cao Xueqin", "Chinese", "1754-1791", "100 million"],
  ["The Hobbit", "J.R.R.Tolkien", "English", "1937", "100 million"],
  ["She: A History of Adventure", "H.Rider Haggard", "English", "1887", "100 million"]
];

class Excel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: this.props.initialData
    };
    this.sort = this.sort.bind(this);
  }

  sort(e) {
    var column = e.target.cellIndex;
    var data = Array.from(this.state.data);
    data.sort(function (a, b) {
      return a[column] > b[column] ? 1: -1;
    });
    this.setState({
      data:data,
    });
  }

  render() {
    return (
      <div id="table">
        <Table striped bordered condensed hover>
          <thead onClick={this.sort}>
            <tr>
              {this.props.headers.map(function (title, idx) { return <th id="thh" key={idx}>{title}{" "}</th> })}
            </tr>
          </thead>
          <tbody>
            {this.state.data.map(function (row, idx) {
              return (
                <tr key={idx}>{row.map(function (cell, idx) {
                  return (<td key={idx}>{cell}</td>);
                })}</tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}

class PageNav extends Component {
  handleSelect(selectedKey) {
  }

  render() {
    return (
      <div>
        <Nav bsStyle="tabs" justified activeKey={1} onSelect={this.handleSelect}>
          <NavItem eventKey={1} href="/home">Home</NavItem>
          <NavItem eventKey={2} title="Item">My Account</NavItem>
          <NavItem eventKey={3} >Shopping Cart</NavItem>
          <NavItem eventKey={4} >Sign up</NavItem>
        </Nav>
      </div>
    );
  }
}

class Search extends Component {
  submitSearch() {
  }
  constructor(props) {
    super(props);
    this.state = {
      start: -1,
      end: -1,
      key: ""
    };
  }
  render() {
    return (
      <div>
        <Form componentClass="fieldset" inline justified>
          <FormGroup bsSize="small">
            <FormControl id="se0" type="text" placeholder="From" />
            <FormControl id="se0" type="text" placeholder="To" />
            <FormControl id="se1" type="text" placeholder="Keyword" />
            {/* <Button onClick={this.submitSearch} type="submit">Submit</Button> */}
          </FormGroup>
        </Form>
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
              <Search />
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
        <Excel headers={headers} initialData={data} />
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
