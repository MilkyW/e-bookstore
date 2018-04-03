import React, { Component } from 'react';
import { HelpBlock, Form, FormControl, FormGroup, Button, ControlLabel } from 'react-bootstrap';
//import './SignUp.css';
import { logins, EE0 } from './Toolbar';

function FieldGroup({ vs, id, label, help, ...props }) {
    return (
      <FormGroup controlId={id} validationState={vs}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl {...props} />
        {help && <HelpBlock>{help}</HelpBlock>}
      </FormGroup>
    );
  }

class SignUp extends Component {
  constructor(props){
    super(props);
    this.state = {
      btstyle: null,
      id: null,
      pw: null,
      em: null,
      mn: null,
      idvs: null,
      pwvs: null,
      emvs: null,
      mnvs: null,
      idmsg: null,
      pwmsg: null,
      emmsg: null,
      mnmsg: null,
    };
    this.submit = this.submit.bind(this);
    this.hdid = this.hdid.bind(this);
    this.hdpw = this.hdpw.bind(this);
    this.hdem = this.hdem.bind(this);
    this.hdmn = this.hdmn.bind(this);
    this.checkem = this.checkem.bind(this);
    this.checkmn = this.checkmn.bind(this);
  }

  submit(){
    var valid = true;
    var id = this.state.id;
    if(id === null){
      valid = false;
    this.setState({
      idvs: "error",
      idmsg: "Please ENTER UserID!"
    });
  }
    if(logins.has(id)){
      valid = false;
      this.setState({
      idvs: "error",
      idmsg: "UserID has already been registered, please TRY ANOTHER!"
    });
    }


    if(this.checkpw() === 1){
      valid = false;
      this.setState({
      pwvs: "error",
      pwmsg: "You can ONLY use number(s) and letter(s)!"
    });
   }
    if(this.checkpw() === 2){
      valid = false;
      this.setState({
      pwvs: "error",
      pwmsg: "Please ENTER password!"
    });
  }
    if(this.checkpw() === 3){
      valid = false;
      this.setState({
      pwvs: "error",
      pwmsg: "The LENGTH of password should be in 6 ~ 18!"
    });
  }
    if(this.checkpw() === 4){
      valid = false;
      this.setState({
      pwvs: "error",
      pwmsg: "The password should have BOTH number(s) AND letter(s)!"
    });
  }

    if(this.checkem() === 1){
      valid = false;
      this.setState({
      emvs: "error",
      emmsg: "INVALID email address FORMAT!"
    });
  }
    if(this.checkem() === 2){
      valid = false;
      this.setState({
      emvs: "error",
      emmsg: "Please ENTER email address!"
    });
    }

    if(this.checkmn() === 1){
      valid = false;
      this.setState({
      mnvs: "error",
      mnmsg: "INVALID mobile phone number FORMAT!"
    });
  }
    if(this.checkmn() === 2){
      valid = false;
      this.setState({
        mnvs: "error",
        mnmsg: "Please ENTER mobile phone number!"
      });
    }
    if (valid) {
      this.setState({
        btstyle: "submit",
      })
      EE0.emit('signIn', this.state.id);
      EE0.emit('customer', 'Toolbar');
    }
  }

  checkpw(){
    var pw = this.state.pw;
    var number = false;
    var letter = false;
    if (pw === null) return 2;
    if (pw.length < 6 || pw.length > 18) return 3;
    for(var i = 0; i < pw.length; i++){
      if ((pw.charAt(i) >= 'A' && pw.charAt(i) <= 'Z')
      || (pw.charAt(i) >= 'a' && pw.charAt(i) <= 'z'))
      letter = true;
      else if (pw.charAt(i) >= '0' && pw.charAt(i) <= '9')
      number = true;
      else return 1;
    }
    if (!(letter && number)) return 4;
    return 0;
  }

  checkem(){
    var em = this.state.em;
    var countAt = 0;
    if (em === null) return 2;
    if (em.indexOf(".") === -1) return 1;
    if (em.indexOf(".") < em.indexOf("@")) return 1;
    if (em.charAt(em.length - 1) === '.'
    || em.charAt(em.length - 1) === '@') return 1;
    for(var i = 0; i < em.length; i++){
      if (!((em.charAt(i) >= 'A' && em.charAt(i) <= 'Z')
    || (em.charAt(i) >= 'a' && em.charAt(i) <= 'z')
    || (em.charAt(i) >= '0' && em.charAt(i) <= '9')
  || em.charAt(i) === '@' || em.charAt(i) === '.'
|| em.charAt(i) === '_')) return 1;
      if (em.charAt(i) === '@') {
        countAt++;
        if (countAt > 1) return 1;
      }
      if (em.charAt(i) === '.') {
        if (em.charAt(i - 1) === '.' || em.charAt(i - 1) === '@') return 1;
      }
    }
    return 0;
  }

  checkmn(){
    var mn = this.state.mn;
    if (mn === null) return 2;
    if (mn.length !== 11) return 1;
    for(var i = 0; i < mn.length; i++){
      if (mn.charAt(i) < '0' || mn.charAt(i) > '9') return 1;
    }
    return 0;
  }

  hdid(e){
    this.setState({
      idvs: null,      
      idmsg: null,
      id: e.target.value,
    });
  }

  hdpw(e){
    this.setState({
      pwvs: null,      
      pwmsg: null,
      pw: e.target.value,
    });
  }

  hdem(e){
    this.setState({
      emvs: null,      
      emmsg: null,
      em: e.target.value,
    });
  }

  hdmn(e){
    this.setState({
      mnvs: null,      
      mnmsg: null,
      mn: e.target.value,
    });
  }

    render(){
      return (
          <div id="formsn">
          <Form>
              <FieldGroup
      id="formControlsId"
      type="text"
      label="UserID"
      placeholder="Please enter User ID"
      value={this.state.id}
      vs={this.state.idvs}
      help={this.state.idmsg}
      onChange={this.hdid}
    />

        <FieldGroup
      id="formControlsPassword"
      label="Password"
      type="password"
      placeholder="Please enter password"
      value={this.state.pw}
      vs={this.state.pwvs}
      help={this.state.pwmsg}
      onChange={this.hdpw}
    />

    <FieldGroup
      id="formControlsEmail"
      type="email"
      label="Email"
      placeholder="Please enter Email address"
      value={this.state.em}
      vs={this.state.emvs}
      help={this.state.emmsg}
      onChange={this.hdem}
    />

    <FieldGroup
      id="formControlsMobile"
      type="mobile"
      label="Mobile Phone Number"
      placeholder="Please enter mobile phone number"
      value={this.state.mn}
      vs={this.state.mnvs}
      help={this.state.mnmsg}
      onChange={this.hdmn}
    />

    <div id="sm"><Button bsSize="large" id="smb" type={this.state.btstyle} onClick={this.submit}>
      Submit
    </Button></div>
          </Form>
          </div>
      );
    }
  }

  export { SignUp };