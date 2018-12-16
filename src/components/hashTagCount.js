import React, { Component } from 'react';
import {Grid, Row, Col, Panel} from 'react-bootstrap';
import ReactHighcharts from 'react-highcharts';
import Pie3D from 'react-pie3d'
import axios from 'axios';
import Select from 'react-select';
import WorldMap from './WorldMap'
import WeeklySentiments from "./weeklySentiments"
import Loader from 'react-loader-spinner'
import TweetService from "../services/TweetService";

axios.defaults.withCredentials = true;

export default class Analysis extends Component {

  constructor() {
    super();
    this.state = {
      config : []
    };
    this.getHashTags = this.getHashTags.bind(this);
    this.getConfig = this.getConfig.bind(this);
    this.getHashTags();
  }


  getConfig() {
    let config = {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Hahtags Tweets Volume'
      },
      credits: {
        enabled: false
      },
      xAxis: {
        title: {
          text: 'Hashtags List',
          style: {
            fontWeight: 'bold'
          }
        },
        categories: []
      },
      legend: {
        enabled: false
      },
      yAxis: {
        min: 0,
        allowDecimals: false,
        title: {
          text: 'No of tweets',
          style: {
            fontWeight: 'bold'
          }
        }
      },
      series: [{
        name : "Hashtags",
        data: []
      }],
      plotOptions: {
        series: {
          cursor: 'pointer',
          point: {
            events: {
              click: function () {
                console.log('X: ' + this.x + ', Y: ' + this.y);
                //call function passing this values as arguments
              }
            }
          }
        }
      },
    };
    return config;
  }

  getHashTags() {

    this.state.config = this.getConfig();
    let state = this.state;
    let self = this;

    TweetService.getHashTags().then(function(response){
        let data = response.data;
        let names = [];
        let count = [];

        data.forEach((d)=>{
          names.push(d.name);
        });

        data.forEach((d)=>{
          count.push(d.count);
        })
        if(state){
          state.config.xAxis.categories = names;
          state.config.series[0].data = count;
          self.setState({
            state
          })
        }



    })
  }



  render() {
    return (
      <div>
        <ReactHighcharts config={this.state.config}></ReactHighcharts>
      </div>
    )
  }

}