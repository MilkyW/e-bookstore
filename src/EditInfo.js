import React, { Component } from 'react';
import { HelpBlock, Form, FormControl, FormGroup, Button, ControlLabel } from 'react-bootstrap';
import './EditInfo.css';

function FieldGroup({ id, label, help, ...props }) {
    return (
        <FormGroup controlId={id}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl {...props} />
        {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    );
  }

class EditInfo extends Component {
    constructor(props){
        super(props);
        this.submit = this.submit.bind(this);
    }

    submit(){
        return null;
    }

    render(){
      return (
        <Form>
        <FieldGroup
        id="formControlsFile"
        type="file"
        label="Head Picture"
        help=""
      />
              <FieldGroup
        id="formControlsFile"
        type="file"
        label="Bookcover Picture"
        help=""
      />
    <FormGroup controlId="formControlsTextarea">
      <ControlLabel>Brief Introduction</ControlLabel>
      <FormControl componentClass="textarea" placeholder="textarea" />
    </FormGroup>
      <div id="sm">
      <Button bsSize="large" id="smb" onClick={this.submit}>
      Submit
    </Button>
    </div>
    </Form>
      );
    }
  }

  export { EditInfo };