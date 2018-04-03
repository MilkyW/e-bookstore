import React, { Component } from 'react';
import { Table, Form, FormControl, Button , ListGroup, ListGroupItem } from 'react-bootstrap';
import './ShoppingCart.css';
import { EE } from './Home';

const useful = 4;
const quan = 3;
const cart = 4;

class ShoppingCart extends Component {
    static defaultProps = {
      headers: [
        "Book", "Author", "Price", "Quantity", "Buy"
      ],
      initialData: [
        ["The Lord of the Rings", "J.R.R.Tolkien", 11, 2, ""],
        ["Le Petit Prince (The Little Prince)", "Antoine de Saint-Exupery", 22, 2, ""],
        ["Harry Potter and the Philosopher's Stone", "J.K.Rowling", 33, 1, ""],
        ["And Then There Were None", "Agatha Christie", 44, 3, ""],
        ["Dream of the Red Chamber", "Cao Xueqin", 55, 5, ""],
        ["The Hobbit", "J.R.R.Tolkien", 66, 4, ""],
        ["She: A History of Adventure", "H.Rider Haggard", 77, 1, ""]
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
      this.deleteItem = this.deleteItem.bind(this);
      this.showEditor = this.showEditor.bind(this);
      this.save = this.save.bind(this);
      EE.on('pushSearch', this.toggleSearch.bind(this));
    }

    showEditor(e) {
        if (e.target.cellIndex === quan)
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

    deleteItem(e){
        var data = this.state.data;
        data.splice(e.target.getAttribute('row'), 1);
        this.setState({
            data: data,
        })
        this.render();
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
                      <Button row={rowidx} bsStyle="danger" bsSize="xsmall" onClick={this.deleteItem}>Delete</Button>
                      </td>
                    );
                  }, this)}</tr>
                );
              }, this)}
            </tbody>
          </Table>
          {this.renderSum()}
          <div id="sm"><Button block bsSize="large" onClick={this.submit}>Checkout</Button></div>
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
  
    renderSum(){
        var sum = 0;
        for(var i = 0; i < this.state.data.length; i++){
          sum += this.state.data[i][quan] * this.state.data[i][quan - 1];
        }
        return(
          <ListGroup>
          <ListGroupItem bsStyle="info">Total: {sum}</ListGroupItem>
        </ListGroup>
        );
      }

    render() {
      return (
        this.renderTable()
      );
    }
  }

  export {ShoppingCart};