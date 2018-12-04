import React, { Component } from "react";
import { Grid, Row, Col, Panel, ButtonToolbar, MenuItem, DropdownButton, SplitButton } from "react-bootstrap";
import ReactHighcharts from "react-highcharts";
import Pie3D from "react-pie3d";
import axios from "axios";
import Select from "react-select";
import WorldMap from "./WorldMap";
import Loader from "react-loader-spinner";
import TweetService from "../services/TweetService";
import HighMap from "./highmap";

axios.defaults.withCredentials = true;

export default class WeeklySentiments extends Component {
    constructor() {
      super();
      this.state = {
        config: {},
        topics : {
          data  : ["environment", "infra", "crime","politics","social unrest"],
          active : "infra"
        },
        cities : {
          data : ["nyc", "delhi","paris","bangkok", "mexico city"],
          active : "nyc"
        }
      };
      this.fetchWeeklySentiments = this.fetchWeeklySentiments.bind(this);
      this.handleCityChange = this.handleCityChange.bind(this);
      this.handleTopicChange = this.handleTopicChange.bind(this);

      this.state.config = this.getConfig();

    }

    getConfig(){
    var config = {
          chart: {
            type: 'line'
          },
          title: {
            text: 'Sentiment Analysis'
          },
          credits: {
            enabled: false
          },
          xAxis: {
            title: {
              categories: []
            }
          },
          legend: {
            enabled: true
          },
          yAxis: {
            min: 0,
            allowDecimals: false,
            title: {
              text: 'Number of tweets',
              style: {
                fontWeight: 'bold'
              }
            }
          },
          tooltip: {
            enabled: true
          },
        plotOptions: {
          line: {
            dataLabels: {
              enabled: true
            },
            enableMouseTracking: true
          }
        },
        series: []
    };
    return config
    }

  componentDidMount() {
    this.fetchWeeklySentiments();
  }

  fetchWeeklySentiments(city, topic) {
      let self = this;
      let state = self.state;
      return TweetService.getWeekwiseSentiments(city, topic).then(function(response){
        let data = response.data;
        let weeks = [];
        let positives = [], negatives = [], neutrals = [];

        data.forEach(function(d) {
          weeks.push(d.startDate + "  " + d.endDate);
          positives.push(d.positiveCount);
          negatives.push(d.negativeCount);
          neutrals.push(d.neutralCount);
        });

        state.config.xAxis.categories = weeks;
        state.config.series = [];
        state.config.series.push({
          name: 'Positive',
          data: positives
        });
        state.config.series.push({
          name: 'Negative',
          data: negatives
        });
        state.config.series.push({
          name: 'Neutral',
          data: neutrals
        });
        self.setState({
          state
        });
      })
  }

  handleTopicChange(e) {
      console.log("Hello");
      let state = this.state;
      state.topics.active = e;
      this.fetchWeeklySentiments(state.cities.active, state.topics.active);
  }

  handleCityChange(e) {
      this.state.cities.active = e;
      let state = this.state;
      state.cities.active = e;
      this.fetchWeeklySentiments(state.cities.active, state.topics.active);
  }

  render() {
    let self = this;
    return(
      <Panel header={<h3>Sentiment Analysis Over Period Of Time</h3>} style={{ minHeight: 500, maxWidth: 1000 }}>
        <ButtonToolbar>
          <SplitButton
            bsStyle="primary"
            title={self.state.topics.active}
            key=""
            onSelect={this.handleTopicChange}
            id="a"
            pullRight
          >
            {self.state.topics.data.map(function(topic) {
              return <MenuItem eventKey={topic}>{topic}</MenuItem>
            })}
          </SplitButton>
        </ButtonToolbar>
        <ButtonToolbar>
          <SplitButton
            bsStyle="primary"
            title={self.state.cities.active}
            key=""
            onSelect={this.handleCityChange}
            id="b"
            pullRight
          >
            {self.state.cities.data.map(function(topic) {
              return <MenuItem eventKey={topic}>{topic}</MenuItem>
            })}
          </SplitButton>
        </ButtonToolbar>
        <ReactHighcharts config={self.state.config}></ReactHighcharts>
      </Panel>
    )
  }
}