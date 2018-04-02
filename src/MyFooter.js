import React, { Component } from 'react';
import './MyFooter.css';

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

  export { MyFooter }; 