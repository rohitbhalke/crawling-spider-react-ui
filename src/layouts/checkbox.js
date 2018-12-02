import React, { Component } from 'react';
import {Form, FormGroup, Checkbox } from 'react-bootstrap';

export default class checkbox extends Component {


  constructor() {
    super();
  }

  render() {
    return (

      <FormGroup>
          <Checkbox inline value={this.props.name} name={this.props.name} defaultChecked={this.props.isChecked} data-duration={this.props.label}>
            {this.props.name}
          </Checkbox>
      </FormGroup>
    )
  }


}