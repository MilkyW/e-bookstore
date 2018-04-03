import React, { Component } from 'react';
import './Sales.css';
import { Table, Form, FormControl, ListGroup, ListGroupItem } from 'react-bootstrap';
import { EE } from './Home';

class Sales extends Component {
    static defaultProps = {
      headers: [
        "Book", "Author", "Language", "Published", "Sales"
      ],
      initialData: [
        ["The Lord of the Rings", "J.R.R.Tolkien", "English", "1954-1955", "150"],
        ["Le Petit Prince (The Little Prince)", "Antoine de Saint-Exupery", "French", "1943", "140"],
        ["Harry Potter and the Philosopher's Stone", "J.K.Rowling", "English", "1997", "107"],
        ["And Then There Were None", "Agatha Christie", "English", "1939", "100"],
        ["Dream of the Red Chamber", "Cao Xueqin", "Chinese", "1754-1791", "100"],
        ["The Hobbit", "J.R.R.Tolkien", "English", "1937", "100"],
        ["She: A History of Adventure", "H.Rider Haggard", "English", "1887", "100"]
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
      this.renderTable = this.renderTable.bind(this);
      this.renderSearch = this.renderSearch.bind(this);
      this.renderSales = this.renderSales.bind(this);
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
      for (var i = 0; i < needles.length; i++){
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
          {this.renderSales()}
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

    renderSales(){
      var sum = 0;
      for(var i = 0; i < this.state.data.length; i++){
        sum += parseInt(this.state.data[i][4]);
      }
      return(
        <ListGroup>
        <ListGroupItem bsStyle="info">Sales: {sum}</ListGroupItem>
      </ListGroup>
      );
    }
  
    render() {
      return (
        this.renderTable()
      );
    }
  }

  export { Sales };