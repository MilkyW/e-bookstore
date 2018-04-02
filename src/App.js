import React, { Component } from 'react';
import logo from './logo.svg';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/css/bootstrap-theme.min.css'
import './App.css';
import { ControlLabel, Button, Table, Nav, NavItem, Form, FormGroup, FormControl } from 'react-bootstrap';

var EventEmitter = require('eventemitter3');
var EE = new EventEmitter();

const logins = new Map([['admin', 'admin']]);

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
      data: this.props.initialData,
      sortby: null,
      DESC: false,
      edit: null, //{row: index, cell: index}
      search: false,
      preSearchData: null,
    };
    this.sort = this.sort.bind(this);
    this.showEditor = this.showEditor.bind(this);
    this.save = this.save.bind(this);
    this.renderTable = this.renderTable.bind(this);
    this.renderSearch = this.renderSearch.bind(this);
    this.search = this.search.bind(this);
    EE.on('pushSearch', this.toggleSearch.bind(this));
  }

  sort(e) {
    var column = e.target.cellIndex;
    var data = Array.from(this.state.data);
    var DESC = this.state.sortby === column && !this.state.DESC;
    data.sort(function (a, b) {
      return DESC
        ? (a[column] < b[column] ? 1 : -1)
        : (a[column] > b[column] ? 1 : -1);
    });
    this.setState({
      data: data,
      sortby: column,
      DESC: DESC,
    });
  }

  showEditor(e) {
    this.setState({
      edit: {
        row: parseInt(e.target.dataset.row, 10),
        cell: e.target.cellIndex,
      }
    }
    )
  }

  save(e) {
    e.preventDefault();
    var input = e.target.firstChild;
    var data = Array.from(this.state.data);
    data[this.state.edit.row][this.state.edit.cell] = input.value;
    this.setState({
      edit: null,
      data: data,
    })
  }

  toggleSearch() {
    if (this.state.search) {
      this.setState({
        data: this.state.preSearchData,
        search: false,
        preSearchData: null,
      });
    }
    else {
      this.setState({
        preSearchData: this.state.data,
        search: true,
      });
    }
  }

  search(e) {
    var needle = e.target.value.toLowerCase();
    if (!needle) {
      this.setState({
        data: this.state.preSearchData,
      });
      return;
    }
    var idx = e.target.dataset.idx;
    var searchdata = this.state.preSearchData.filter(function (row) {
      return row[idx].toString().toLowerCase().indexOf(needle) > -1;
    });
    this.setState({
      data: searchdata,
    });
  }

  renderTable() {
    return (
      <div id="table">
        <Table striped bordered condensed hover>
          <thead onClick={this.sort}>
            <tr>
              {this.props.headers.map(function (title, idx) {
                if (this.state.sortby === idx) {
                  title += this.state.DESC ? '\u2191' : '\u2193'
                }
                return (<th id="thh" key={idx}>{title}{" "}</th>);
              }, this)}
            </tr>
          </thead>
          <tbody onDoubleClick={this.showEditor}>
            {this.renderSearch()}
            {this.state.data.map(function (row, rowidx) {
              return (
                <tr key={rowidx}>{row.map(function (cell, idx) {
                  var content = cell;
                  var edit = this.state.edit;
                  if (edit && edit.row === rowidx && edit.cell === idx) {
                    content = <Form onSubmit={this.save}>
                      <FormControl id="editInput" type="text" defaultValue={content} />                    </Form>
                  }
                  return (<td key={idx} data-row={rowidx}>{content}</td>);
                }, this)}</tr>
              );
            }, this)}
          </tbody>
        </Table>
      </div>
    );
  }

  renderSearch() {
    if (!this.state.search) {
      return null;
    }
    return (
      <tr onChange={this.search}>{this.props.headers.map(function (_ignore, idx) {
        return (
          <td key={idx}><FormControl id="editInput" type="text" data-idx={idx} /></td>
        )
      })}</tr>
    );
  }

  render() {
    return (
      this.renderTable()
    );
  }
}

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

class MyHeader extends Component {
  render() {
    return (
      <div className="MyHeader">
        <Table id="headerbg" cellspacing={0} cellpadding={0} width={745} border={0} align="center">
          <tr width={745}><td height={120}></td></tr>
          <tr width={745}><div id="pn"><PageNav className="mypn" /></div></tr>
          <tr width={745}>
            <td height={70}>
              <Toolbar />
            </td>
          </tr>
        </Table >
      </div >
    );
  }
}

class MyFooter extends Component {
  render() {
    return (
      <div id="footerdiv">
        <footer><a href="/home" class="ml7" > Home</a><span class="ch12" ></span>
          <a href="/myAccount" class="ml7" > My Account</a><span class="ch12" ></span>
          <a href="/shoppingCart" class="ml7" > Shopping Cart</a><span class="ch12" ></span>
          <a href="/signUp" class="ml7" >Sign Up</a></footer>
        <img id="footerimg" src={require("./img/m53.gif")} width={136} height={26} alt="footer img" />
      </div>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <MyHeader />
        <Excel headers={headers} initialData={data} />
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
