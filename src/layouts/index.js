import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { Grid, Row, Col, Panel, PanelGroup, ListGroup, Label, Checkbox,  FieldGroup } from 'react-bootstrap';
import Header from './header';
import Analysis from '../components/analysis';
import PageNotFound from './404';
import $ from 'jquery';
import WorldMap from '../components/WorldMap'
import RawTweets from '../components/rawTweets'

import Footer from './footer'


export default class Layout extends Component {
  constructor (props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
    this.selectedNav = this.selectedNav.bind(this);
    this.enterPanel = this.enterPanel.bind(this);
    this.filterCity = this.filterCity.bind(this);
    this.searchHashtags = this.searchHashtags.bind(this);
    this.hashTags = [
        {
          "count": 1689,
          "name": "DrainTheSwamp"
        },
        {
          "count": 849,
          "name": "Emmys"
        },
        {
          "count": 595,
          "name": "30millionsdamis"
        },
        {
          "count": 595,
          "name": "justicepourfudji"
        },
        {
          "count": 580,
          "name": "เรื่องเล่าเช้านี้"
        },
        {
          "count": 555,
          "name": "Macron"
        },
        {
          "count": 472,
          "name": "Benalla"
        },
        {
          "count": 411,
          "name": "Luton"
        },
        {
          "count": 411,
          "name": "TommyRobinson"
        },
        {
          "count": 401,
          "name": "JusticeForSantoshKoli"
        },
        {
          "count": 365,
          "name": "BJP"
        },
        {
          "count": 290,
          "name": "PrescientInfo"
        },
        {
          "count": 287,
          "name": "Kavanaugh"
        },
        {
          "count": 275,
          "name": "BharatBandh"
        },
        {
          "count": 255,
          "name": "Florence"
        },
        {
          "count": 243,
          "name": "ClimateAction"
        },
        {
          "count": 231,
          "name": "Nature"
        },
        {
          "count": 231,
          "name": "Travel"
        },
        {
          "count": 228,
          "name": "ข่าวสด"
        },
        {
          "count": 202,
          "name": "Trump"
        }
      ]

  }

  componentDidMount() {
    this.activeNav();
  }

  activeNav() {
    let routeURL = (window.location.href).split('/').splice(-1)[0];
    routeURL = (routeURL === "dashboard") ? "" : routeURL;
    $("ul.navlist a").removeClass('active-nav');
    $('div.panel-collapse').removeClass('in');
    $("ul.navlist a").each(function () {
      let href=$(this).prop('href');
      $(this).parents('div.panel-collapse').addClass('in');
      if (routeURL !== "" && href.indexOf(routeURL) > -1) {
        $(this).addClass('active-nav');
      }
    });
  }

  filterCity(e) {
    let target = e.currentTarget;
    let inputs = target.querySelectorAll('input');
    let selected = "";
    inputs.forEach(function(input) {
      if(input.checked) {
        selected +=input.dataset.val;
        selected += ",";
      }
    });
    let length = selected.length - 1;
    selected = selected.substr(0, length);
    console.log(selected);

    let queryObj = {
      cityQuery : selected
    }
    //this.refs.rawTweets.fetchData(queryObj);
  }

  searchHashtags(){

  }


  clickHandler(e) {
    $("ul.navlist a").removeClass('active-nav');
    let target = e.target;
    if(target.classList && !target.classList.contains('active-nav')) {
      target.classList.add('active-nav');
    }
  }

  selectedNav(activeKey, eventKey) {
    this.setState({ activeKey });
  }

  enterPanel() {
    $('div.panel-collapse').removeClass('in');
    // eventKey is not getting thus removing 'in' class.
  }

  render() {
    let self = this;
    this.state = {
      feedbackURL: '',
      activeKey: '2'
    }
    return (
      <Grid fluid className="height100">
        <Row className="show-grid">
          <Col md={12}>
            <Header url={this.state.feedbackURL} />
          </Col>
        </Row>
        <Row className="show-grid custom-container height100">
          <Col md={3} className="height100">
            <Panel id="sidebar" className="height100">
              <PanelGroup defaultActiveKey={this.state.activeKey} accordion onSelect={this.selectedNav}>
                <Panel header="City" eventKey="2" bsStyle="primary" onEnter={this.enterPanel}>
                {/*<Panel eventKey="1" bsStyle="primary" onEnter={this.enterPanel}>*/}
                  <ListGroup componentClass="ul" style={{marginBottom:'0'}} className="navlist citygroup" onChange={this.filterCity}>
                      <Checkbox md={3} className="list-group-item" data-val="nyc">New York</Checkbox>
                      <Checkbox className="list-group-item" data-val="delhi">Delhi</Checkbox>
                      <Checkbox className="list-group-item" data-val="paris">Paris</Checkbox>
                      <Checkbox className="list-group-item" data-val="mexico">Mexico City</Checkbox>
                      <Checkbox className="list-group-item" data-val="bangkok">Bangkok</Checkbox>
                  </ListGroup>
                </Panel>
              </PanelGroup>
              <PanelGroup defaultActiveKey={this.state.activeKey} accordion onSelect={this.selectedNav}>
                <Panel header="Language" eventKey="2" bsStyle="primary" onEnter={this.enterPanel}>
                  {/*<Panel eventKey="1" bsStyle="primary" onEnter={this.enterPanel}>*/}
                  <ListGroup componentClass="ul" style={{marginBottom:'0'}} className="navlist languagegroup">
                    <Checkbox md={3} className="list-group-item" data-val="en">English</Checkbox>
                    <Checkbox className="list-group-item" data-val="fr">French</Checkbox>
                    <Checkbox className="list-group-item" data-val="hi">Hindi</Checkbox>
                    <Checkbox className="list-group-item" data-val="th">Thai</Checkbox>
                    <Checkbox className="list-group-item" data-val="es">Spanish</Checkbox>
                  </ListGroup>
                </Panel>
              </PanelGroup>
              <PanelGroup defaultActiveKey={this.state.activeKey} accordion onSelect={this.selectedNav}>
                <Panel header="Hastags" eventKey="2" bsStyle="primary" onEnter={this.enterPanel} className="hashtags">
                  {/*<Panel eventKey="1" bsStyle="primary" onEnter={this.enterPanel}>*/}
                  <ul className="navlist hashtagsgroup list-group">
                    {
                      self.hashTags.map(function(mapObj, index) {
                        let dataVal = "#"+mapObj.name;
                        return <div className="list-group-item checkbox">
                          <label title="">
                            <input type="checkbox" data-val={dataVal} value="on"></input>
                            {mapObj.name}
                          </label>
                          <span className="badge badge-primary badge-pill">{mapObj.count}</span>
                        </div>
                      })
                    }
                  </ul>

                  {/*<ListGroup componentClass="ul" style={{marginBottom:'0'}} className="navlist languagegroup">
                    <Checkbox className="list-group-item" data-val="#DrainTheSwamp">DrainTheSwamp super
                    </Checkbox>
                    <span className="badge badge-primary badge-pill">1689</span>
                    <Checkbox className="list-group-item" data-val="#Emmys">Emmys
                      <span className="badge badge-primary badge-pill">849</span>
                    </Checkbox>
                    <Checkbox className="list-group-item" data-val="#30millionsdamis">30millionsdamis
                      <span className="badge badge-primary badge-pill">595</span>
                    </Checkbox>
                    <Checkbox className="list-group-item" data-val="#justicepourfudji">justicepourfudji
                      <span className="badge badge-primary badge-pill">595</span>
                    </Checkbox>
                    <Checkbox className="list-group-item" data-val="#เรื่องเล่าเช้านี้">เรื่องเล่าเช้านี้
                      <span className="badge badge-primary badge-pill">580</span>
                    </Checkbox>
                    <Checkbox className="list-group-item" data-val="#Macron้">Macron้
                      <span className="badge badge-primary badge-pill">555</span>
                    </Checkbox>
                    <Checkbox className="list-group-item" data-val="#Benalla">Benalla
                      <span className="badge badge-primary badge-pill">472</span>
                    </Checkbox>
                    <Checkbox className="list-group-item" data-val="#Luton">Luton
                      <span className="badge badge-primary badge-pill">411</span>
                    </Checkbox>
                    <Checkbox className="list-group-item" data-val="#TommyRobinson">TommyRobinson
                      <span className="badge badge-primary badge-pill">411</span>
                    </Checkbox>
                    <Checkbox className="list-group-item" data-val="#JusticeForSantoshKoli">JusticeForSantoshKoli
                      <span className="badge badge-primary badge-pill">401</span>
                    </Checkbox>
                    <Checkbox className="list-group-item" data-val="#BJP">BJP
                      <span className="badge badge-primary badge-pill">365</span>
                    </Checkbox>
                    <Checkbox className="list-group-item" data-val="#PrescientInfo">PrescientInfo
                      <span className="badge badge-primary badge-pill">290</span>
                    </Checkbox>
                    <Checkbox className="list-group-item" data-val="#Kavanaugh">Kavanaugh
                      <span className="badge badge-primary badge-pill">287</span>
                    </Checkbox>
                    <Checkbox className="list-group-item" data-val="#BharatBandh">BharatBandh
                      <span className="badge badge-primary badge-pill">14</span>
                    </Checkbox>
                    <Checkbox className="list-group-item" data-val="#Florence">Florence
                      <span className="badge badge-primary badge-pill">275</span>
                    </Checkbox>
                    <Checkbox className="list-group-item" data-val="#ClimateAction">ClimateAction
                      <span className="badge badge-primary badge-pill">255</span>
                    </Checkbox>
                    <Checkbox className="list-group-item" data-val="#ClimateAction">ClimateAction
                      <span className="badge badge-primary badge-pill">243</span>
                    </Checkbox>
                    <Checkbox className="list-group-item" data-val="#Nature">Nature
                      <span className="badge badge-primary badge-pill">231</span>
                    </Checkbox>
                    <Checkbox className="list-group-item" data-val="#Travel">Travel
                      <span className="badge badge-primary badge-pill">231</span>
                    </Checkbox>
                    <Checkbox className="list-group-item" data-val="#ข่าวสด">ข่าวสด
                      <span className="badge badge-primary badge-pill">228</span>
                    </Checkbox>
                    <Checkbox className="list-group-item" data-val="#Trump">Trump
                      <span className="badge badge-primary badge-pill">202</span>
                    </Checkbox>
                  </ListGroup>*/}
                </Panel>
              </PanelGroup>
            </Panel>
          </Col>
          <Col md={9}>
            <Row className="show-grid">
              <Col md={6} className="right-padding-zero">
                  <Link to='/RawTweets' className="list-group-item" onClick={this.clickHandler}>
                    What people are talking about?
                  </Link>
              </Col>
              <Col md={6} className="left-padding-zero">
              <Link to='/analysis' className="list-group-item active-nav" onClick={this.clickHandler}>
                At a glance
              </Link>
              </Col>
            </Row>
            <Switch>
              <Route path='/worldMap' component={WorldMap} ref={'worldMap'}/>
              <Route path='/analysis' component={Analysis} />
              <Route path='/'  component={RawTweets} ref={'rawTweets'}/>
              <Route path="*" component={PageNotFound} />
              <Route
                exact
                path={this.props.match.url}
                render={() =>
                  <Analysis />
                }
              />
            </Switch>
          </Col>
        </Row>
        <Row className="show-grid">
          <Col md={12} className="footer-fluid">
            <Footer />
          </Col>
        </Row>
      </Grid>
    )
  }
}