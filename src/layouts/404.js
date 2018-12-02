import React, { Component } from 'react';
import { Panel, Grid, Row, Col } from 'react-bootstrap';

export default class NotFound extends Component {
  render() {
    return (
      <Panel>
        <Grid fluid>
          <Row className="show-grid">
            <Col md={12}>
              <div className="text-center">
                <h1>404</h1>
                <h3>This is not the web page you are looking for.</h3>
                <a href="/">Go to Home</a>
              </div>
            </Col>
          </Row>
        </Grid>
      </Panel>
    )
  }
}