import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { PageNav } from './PageNav';
import { Toolbar } from './Toolbar';
import './MyHeader.css';

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

  export { MyHeader };