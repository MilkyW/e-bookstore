import React, { Component } from 'react';
import "./Users.css";
import { Table, Form, FormControl, FormGroup, Button } from 'react-bootstrap';
import { EE } from './Home';

const useful = 2;
const del = 2;
const dis = 3;
const act = 4;

class Users extends Component {
    static defaultProps = {
        headers: [
          "UserID", "Power", "Delete", "Disable", "Activate"
        ],
        initialData: [
          ["admin", "0", "", "", ""],
          ["customer", "1", "", "", ""],
        ],
    };
      constructor(props) {
        super(props);
        this.state = {
          rowidx: null,
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
        this.showEditor = this.showEditor.bind(this);
        this.save = this.save.bind(this);
        this.renderTable = this.renderTable.bind(this);
        this.renderSearch = this.renderSearch.bind(this);
        this.renderAdd = this.renderAdd.bind(this);
        this.search = this.search.bind(this);
        this.add = this.add.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        EE.on('pushSearch', this.toggleSearch.bind(this));
        EE.on('add', this.toggleAdd.bind(this));
      }
    
      sort(e) {
        if (e.target.cellIndex < useful){
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
      }
    
      showEditor(e) {
          if (e.target.cellIndex < useful)
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
          for (var i = 0; i < useful; i++){
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
              var temp = this.state.adds;
              for(i = useful; i < this.props.headers.length; i++){
                  temp.push("");
              }
            data.push(temp);
            this.setState({
              add: false,
              data: data,
              adds: new Array(useful),
            });
          }
        }
        else {
            var empty = new Array(useful);
          for (i = 0; i < useful; i++){
            empty[i] = null;
          }
          this.setState({
            adds: empty,
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

      deleteUser(e){
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
                {this.renderAdd()}
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
                      if (idx === del)
                      return (
                        <td key={idx} data-row={rowidx}>
                        <Button row={rowidx} bsStyle="danger" bsSize="xsmall" onClick={this.deleteUser}>Delete</Button>
                        </td>
                      );
                      if (idx === dis)
                      return (
                        <td key={idx} data-row={rowidx}><Button row={rowidx} bsStyle="warning" bsSize="xsmall">Disable</Button></td>
                      );
                      if (idx === act)
                      return (
                        <td key={idx} data-row={rowidx}><Button row={rowidx} bsStyle="success" bsSize="xsmall">Activate</Button></td>
                      );
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
              if (idx < useful)
            return (
              <td key={idx}><FormGroup validationState={this.state.addvs[idx]}><FormControl id="editInput" type="text" data-idx={idx} /></FormGroup></td>
            )
            return (
                <td key={idx}></td>
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
            if (idx < useful)
            return (
              <td key={idx}><FormControl id="editInput" type="text" data-idx={idx} /></td>
            )
            return (
                <td key={idx}></td>
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

export { Users };