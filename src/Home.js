import React, { Component } from 'react';
import { Table, Form, FormControl, Button } from 'react-bootstrap';
import './Home.css';
import { loginID } from "./Toolbar";

var EventEmitter = require('eventemitter3');
var EE = new EventEmitter();

const useful = 4;
const cart = 4;

class Home extends Component {
    static defaultProps = {
      headers: [
        "Book", "Author", "Published", "Price", "Buy"
      ],
      initialData: [
        ["The Lord of the Rings", "J.R.R.Tolkien", "1954-1955", 11, ""],
        ["Le Petit Prince (The Little Prince)", "Antoine de Saint-Exupery", "1943", 22, ""],
        ["Harry Potter and the Philosopher's Stone", "J.K.Rowling", "1997", 33, ""],
        ["And Then There Were None", "Agatha Christie", "1939", 44, ""],
        ["Dream of the Red Chamber", "Cao Xueqin", "1754-1791", 55, ""],
        ["The Hobbit", "J.R.R.Tolkien", "1937", 66, ""],
        ["She: A History of Adventure", "H.Rider Haggard", "1887", 77, ""]
      ],
  };
    constructor(props) {
      super(props);
      this.state = {
        btstyle: null,
        data: this.props.initialData,
        sortby: null,
        DESC: false,
        edit: null, //{row: index, cell: index}
        search: false,
        add: false,
        preSearchData: null,
        needles: new Array(useful),
        adds: new Array(useful),
        addvs: new Array(useful),
      };
      this.sort = this.sort.bind(this);
      this.renderTable = this.renderTable.bind(this);
      this.renderSearch = this.renderSearch.bind(this);
      this.search = this.search.bind(this);
      this.addToCart = this.addToCart.bind(this);
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
      var needles = this.state.needles;
      var data = this.state.preSearchData;
      needles[e.target.dataset.idx] = needle;
      var see = function (row) {
          return row[i].toString().toLowerCase().indexOf(needle) > -1;
        };
      for (var i = 0; i < useful; i++){
        needle = needles[i];
        if (needle){
          data = data.filter(see);
        }
      }
      this.setState({
        data: data,
        needles: needles, 
      });
    }

    addToCart(e){
      // var data = this.state.data;
      // data.splice(e.target.getAttribute('row'), 1);
      // this.setState({
      //     data: data,
      // })
      // this.render();
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
                    if (idx < useful){
                      if (edit && edit.row === rowidx && edit.cell === idx) {
                          content = <Form onSubmit={this.save}>
                            <FormControl id="editInput" type="text" defaultValue={content} />                    </Form>
                        }
                        return (<td key={idx} data-row={rowidx}>{content}</td>);
                    }
                    if (idx === cart)
                    return (
                      <td key={idx} data-row={rowidx}>
                      <Button row={rowidx} bsStyle="primary" bsSize="xsmall" onClick={this.addToCart}>Add To Cart</Button>
                      </td>
                    );
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

  export {Home, EE};