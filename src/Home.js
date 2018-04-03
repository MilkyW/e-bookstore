import React, { Component } from 'react';
import { Table, Form, FormControl, FormGroup } from 'react-bootstrap';
import './Home.css';

var EventEmitter = require('eventemitter3');
var EE = new EventEmitter();

class Home extends Component {
    static defaultProps = {
      headers: [
        "Book", "Author", "Language", "Published", "Sales"
      ],
      initialData: [
        ["The Lord of the Rings", "J.R.R.Tolkien", "English", "1954-1955", "150 million"],
        ["Le Petit Prince (The Little Prince)", "Antoine de Saint-Exupery", "French", "1943", "140 million"],
        ["Harry Potter and the Philosopher's Stone", "J.K.Rowling", "English", "1997", "107 millon"],
        ["And Then There Were None", "Agatha Christie", "English", "1939", "100 million"],
        ["Dream of the Red Chamber", "Cao Xueqin", "Chinese", "1754-1791", "100 million"],
        ["The Hobbit", "J.R.R.Tolkien", "English", "1937", "100 million"],
        ["She: A History of Adventure", "H.Rider Haggard", "English", "1887", "100 million"]
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
        needles: new Array(this.props.headers.length),
        adds: new Array(this.props.headers.length),
        addvs: new Array(this.props.headers.length),
      };
      this.sort = this.sort.bind(this);
      this.showEditor = this.showEditor.bind(this);
      this.save = this.save.bind(this);
      this.renderTable = this.renderTable.bind(this);
      this.renderSearch = this.renderSearch.bind(this);
      this.renderAdd = this.renderAdd.bind(this);
      this.search = this.search.bind(this);
      this.add = this.add.bind(this);
      EE.on('pushSearch', this.toggleSearch.bind(this));
      EE.on('add', this.toggleAdd.bind(this));
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

    toggleAdd() {
      if (this.state.add) {
        var allempty = true;
        var allfull = true;
        var data = this.state.data;
        for (var i = 0; i < this.state.adds.length; i++){
          if (this.state.adds[i] !== null){
            allempty = false;
          }
          else{
            allfull = false;
          }
        }
        if (allempty)
        this.setState({
          add: false,
        });
        if (allfull){
          data.push(this.state.adds);
          this.setState({
            add: false,
            data: data,
            adds: new Array(this.props.headers.length),
          });
        }
      }
      else {
        for (var i = 0; i < this.props.headers.length; i++){
          this.state.adds[i] = null;
        }
        this.setState({
          add: true,
        });
      }
    }

    add(e){
      var needle = e.target.value;
      var adds = this.state.adds;
      adds[e.target.dataset.idx] = needle;

    }
  
    search(e) {
      var needle = e.target.value.toLowerCase();
      var needles = this.state.needles;
      var data = this.state.preSearchData;
      needles[e.target.dataset.idx] = needle;
      for (var i = 0; i < needles.length; i++){
        needle = needles[i];
        if (needle){
          data = data.filter(function (row) {
            return row[i].toString().toLowerCase().indexOf(needle) > -1;
          });
        }
      }
      this.setState({
        data: data,
        needles: needles, 
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
              {this.renderAdd()}
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
  
    renderAdd() {
      if (!this.state.add) {
        return null;
      }
      return (
        <tr onChange={this.add}>{this.props.headers.map(function (_ignore, idx) {
          return (
            <td key={idx}><FormGroup validationState={this.state.addvs[idx]}><FormControl id="editInput" type="text" data-idx={idx} /></FormGroup></td>
          )
        }.bind(this))}</tr>
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