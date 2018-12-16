import React, { Component } from 'react';
import { Button, Card, CardBody, CardImage, CardTitle, CardText, Col } from 'mdbreact';
import {Grid, Row, Panel} from 'react-bootstrap';

import axios from 'axios';
axios.defaults.withCredentials = true;

export default class AboutUs extends Component {

  constructor() {
    super();
    this.state = {

    }
    this.formCards = this.formCards.bind(this);
    this.formCards();
  }

  formCards() {
    setTimeout(function(){
      let hideMe = document.getElementById("hideMe");
      if(hideMe)
        hideMe.classList.add("hide");
    }, 1000);

  }

  render() {
    return (
      <Col>
        <Row>
        </Row>
        {/*<Card style={{ width: "22rem" }}>
          <CardImage
            className="img-fluid"
            src="rohit.jpg"
            waves
          />
          <CardBody>
            <CardTitle>Rohit Bhalke</CardTitle>
          </CardBody>
        </Card>
        <Card style={{ width: "22rem" }}>
          <CardImage
            className="img-fluid"
            src="/pooja.jpg"
            waves
          />
          <CardBody>
            <CardTitle>Pooja Shingavi</CardTitle>
          </CardBody>
        </Card>
        <Card style={{ width: "22rem" }}>
          <CardImage
            className="img-fluid"
            src="/madhushri.jpg"
            waves
          />
          <CardBody>
            <CardTitle>Madhushri Patil</CardTitle>
          </CardBody>
        </Card>
        <Card style={{ width: "22rem" }}>
          <CardImage
            className="img-fluid"
            src="/tushar.jpg"
            waves
          />
          <CardBody>
            <CardTitle>Tushar Vaidya</CardTitle>
          </CardBody>
        </Card>*/}
        <Card style={{ width: "1000px" }}>
          <CardImage
            className="img-fluid"
            src="group.jpg"
            waves
          />
          <CardBody>
            <CardTitle>Team - Crawling Spider</CardTitle>
          </CardBody>
        </Card>
      </Col>
    )
  }

}