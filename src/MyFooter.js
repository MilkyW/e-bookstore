import React, { Component } from 'react';
import './MyFooter.css';
import { Link } from 'react-router-dom'

class MyFooter extends Component {
    render() {
      return (
        <div id="footerdiv">
          <footer><Link to="/" class="lk"> Home</Link><span class="ch12" ></span>
            <Link to="/myAccount/historyOrder" class="lk"> History Order</Link><span class="ch12" ></span>
            <Link to="/myAccount/editInfo" class="lk" > Edit Info</Link><span class="ch12" ></span>
            <Link to="/shoppingCart" class="lk" > Shopping Cart</Link><span class="ch12" ></span>
            <Link to="/signUp" class="lk" >Sign Up</Link></footer>
          <img id="footerimg" src={require("./img/m53.gif")} width={136} height={26} alt="footer img" />
        </div>
      )
    }
  }

  export { MyFooter }; 