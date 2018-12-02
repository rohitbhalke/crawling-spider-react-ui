import React, { Component } from 'react';
import {Grid, Row, Col, Panel} from 'react-bootstrap';
import TweetService from '../services/TweetService'
import ReactHighcharts from 'react-highcharts';
import HighMap from './highmap'
import RawTweets from './rawTweets';
import TweetsFormatted from './tweetFormatted';
import axios from 'axios';
import Select from 'react-select';
axios.defaults.withCredentials = true;



export default class WorldMap extends Component {

  constructor() {
    super();
    this.state = {
      config: {
       data : [[]]
      }
    };


    this.fetchData = this.fetchData.bind(this);

  }

  componentDidMount() {
    var queryObject =  this.props && this.props.config;
    this.fetchData(queryObject);
  }

  componentWillReceiveProps(nextProps){
    var queryObject =  nextProps && nextProps.config;
    if(queryObject){
      this.fetchData(queryObject);
    }
  }

  fetchData(queryObject) {
    let self = this;
    return TweetService.getTweetCount(queryObject).then(function (response) {
      var mappedSyb = {
        "nyc" : "us",
        "paris" : "fr",
        "delhi" : "in",
        "mexico" : "mx",
        "bangkok" : "th"
      };
      var cities = response.data.cities;
      var data = {};
      var dataArr = [];
      cities.forEach(function(city){
        dataArr.push([mappedSyb[city.city], city.tweetCount]);
      });
      self.state.config.data = dataArr;
      var config = self.state.config;
      self.setState({
        config
      });
    });

  }

  render() {
    let self = this;
    return(
        <Panel header={<h3>World wide tweet count</h3>} style={{minHeight: 500}}>
          {/*<ReactHighcharts config={this.state.config}></ReactHighcharts>*/}
          <HighMap data={self.state.config.data}/>
        </Panel>
    )
  }
}