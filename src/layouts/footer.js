import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

export default class Footer extends Component {

  render() {
    return (
      <footer id="footer">
        <Grid fluid>
          <Row className="show-grid">
            <Col md={3} className="pl0">
              {/*<img src={logo} alt="Springer Nature" className="pull-left footer-logo" />*/}
            </Col>
            <Col md={8}>
              <p>@Developed By Team Crawling Spyder</p>
            </Col>
          </Row>
        </Grid>
      </footer>
    )
  }
}