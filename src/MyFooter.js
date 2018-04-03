import React, { Component } from 'react';
import './MyFooter.css';
import { Link } from 'react-router-dom'
import { EE0 } from './Toolbar';

class MyFooter extends Component {
  constructor(props){
    super(props);
    this.state = {
      login: false,
      power: null,
    };
    EE0.on('signIn', this.hdsi.bind(this));
    EE0.on('signOut', this.hdso.bind(this));
    EE0.on('admin', this.hdam.bind(this));
    EE0.on('customer', this.hdcs.bind(this));
  }

  hdsi(){
    this.setState({
      login: true,
    });
  }

  hdso(){
    this.setState({
      login: false,
      power: null,
    })
    this.render();
  }

  hdam(){
    this.setState({
      power: 0,
    })
    this.render();
  }

  hdcs(){
    this.setState({
      power: 1,
    })
    this.render();
  }

    render() {
      if (this.state.login === false)
      return (
        <div id="footerdiv">
          <footer><Link to="/home" id="lk"> Home</Link><span class="ch12" ></span>
            <Link to="/signUp" id="lk" >Sign Up</Link></footer>
          <img id="footerimg" src={require("./img/m53.gif")} width={136} height={26} alt="footer img" />
        </div>
      );

      if (this.state.login === true && this.state.power === 1)
      return (
        <div id="footerdiv">
          <footer><Link to="/home" id="lk"> Home</Link><span class="ch12" ></span>
            <Link to="/myAccount/historyOrder" id="lk"> History Order</Link><span class="ch12" ></span>
            <Link to="/myAccount/editInfo" id="lk" > Edit Info</Link><span class="ch12" ></span>
            <Link to="/shoppingCart" id="lk" > Shopping Cart</Link></footer>
          <img id="footerimg" src={require("./img/m53.gif")} width={136} height={26} alt="footer img" />
        </div>
      );

      if (this.state.login === true && this.state.power === 0)
      return (
        <div id="footerdiv">
          <footer><Link to="/home" id="lk"> Home</Link><span class="ch12" ></span>
            <Link to="/storehouse" id="lk"> Storehouse</Link><span class="ch12" ></span>
            <Link to="/users" id="lk" >Users</Link><span class="ch12" ></span>
            <Link to="/salse" id="lk" >Sales</Link></footer>
          <img id="footerimg" src={require("./img/m53.gif")} width={136} height={26} alt="footer img" />
        </div>
      );
    }
  }

  export { MyFooter }; 