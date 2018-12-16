import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { Grid, Row, Col, Panel, PanelGroup, ListGroup, Label, Checkbox,  FieldGroup } from 'react-bootstrap';
import Header from './header';
import Analysis from '../components/analysis';
import AboutUs from '../components/aboutUs'
import PageNotFound from './404';
import $ from 'jquery';
import WorldMap from '../components/WorldMap'
import RawTweets from '../components/rawTweets'
import TweetService from '../services/TweetService'

import Footer from './footer'


export default class Layout extends Component {
  constructor (props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
    this.selectedNav = this.selectedNav.bind(this);
    this.enterAboutUS = this.enterAboutUS.bind(this);
    this.filterCity = this.filterCity.bind(this);
    this.searchHashtags = this.searchHashtags.bind(this);
    this.fetchHashTags = this.fetchHashTags.bind(this);
    this.state = {
      hashTags : []
    };
    this.fetchHashTags();
  }

  componentDidMount() {
    this.activeNav();
  }

  fetchHashTags() {
    let self = this;
    let state = self.state;
    TweetService.getHashTags().then(function(response) {
      state.hashTags = response.data;
      self.setState({state});
    }).catch(function(err) {
      console.log("Error while fetching the hashtags list")
    })
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

  enterAboutUS() {
    window.location = "aboutUs"
    // eventKey is not getting thus removing 'in' class.
  }

  render() {
    let self = this;
    this.state.feedbackURL = '';
    this.state.activeKey = 2;

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
                <Panel header="Hashtags" eventKey="2" bsStyle="primary" onEnter={this.enterPanel} className="hashtags">
                  {/*<Panel eventKey="1" bsStyle="primary" onEnter={this.enterPanel}>*/}
                  <ul className="navlist hashtagsgroup list-group">
                    {
                      self.state.hashTags.map(function(mapObj, index) {
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

                </Panel>
              </PanelGroup>
              <PanelGroup defaultActiveKey={this.state.activeKey} accordion onSelect={this.selectedNav}>
                <Panel header="About Us" eventKey="2" bsStyle="primary" onEnter={this.enterAboutUS} className="About Us">
                  <Link to='/aboutUs'/>
                </Panel>
              </PanelGroup>
            </Panel>
          </Col>
          <Col md={9}>
            <Row className="show-grid" id="hideMe">
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
              <Route path="/aboutUs" component={AboutUs} />
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