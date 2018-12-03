import React, { Component } from 'react';
import {Grid, Row, Col, Panel} from 'react-bootstrap';
import ReactHighcharts from 'react-highcharts';
import Pie3D from 'react-pie3d'
import axios from 'axios';
import Select from 'react-select';
import WorldMap from './WorldMap'
import Loader from 'react-loader-spinner'
import TweetService from "../services/TweetService";
axios.defaults.withCredentials = true;

export default class Analysis extends Component {

    constructor() {
        super();
        this.state = {
            config: {
                chart: {
                    type: 'column'
                },
                title: {
                    text: ''
                },
                credits: {
                    enabled: false
                },
                xAxis: {
                    title: {
                        text: 'Date',
                        style: {
                            fontWeight: 'bold'
                        }
                    }
                },
                legend: {
                    enabled: false
                },
                yAxis: {
                    min: 0,
                    allowDecimals: false,
                    title: {
                        text: '',
                        style: {
                            fontWeight: 'bold'
                        }
                    }
                },
                tooltip: {
                    enabled: false
                },
                plotOptions: {
                    series: {
                        dataLabels: {
                            enabled: true,
                            formatter: function () {
                                return this.y;
                            }
                        }
                    }
                },
                series: [
                    {
                        name: ''
                    }]
            },
            worldMapConfig : {},
            loading : false,
            languageData : []
        };

        this.handleEvent = this.handleEvent.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.fetchData = this.fetchData.bind(this);

      this.getSelectors = this.getSelectors.bind(this);
      this.filterData = this.filterData.bind(this);
      this.getQueryObject = this.getQueryObject.bind(this);
    }

  getSelectors() {
    this.cityGroup = document.querySelectorAll('.citygroup')[0];
    this.langGroup = document.querySelectorAll('.languagegroup')[0];
    console.log(this.cityGroup);
    console.log(this.langGroup);
    if(this.cityGroup){
      console.log("Event added1");
      this.cityGroup.addEventListener('change', this.filterData);
    }
    if(this.langGroup){
      console.log("Event added1");
      this.langGroup.addEventListener('change', this.filterData);
    }

  }

  getQueryObject() {
    var cities = this.cityGroup.querySelectorAll('input');
    var languages = this.langGroup.querySelectorAll('input');
    var selectedCities = [];
    var selectedLanguages = [];

    cities.forEach(function(input) {
      if(input.checked) {
        selectedCities.push(input.dataset.val);
      }
    });

    languages.forEach(function(input) {
      if(input.checked) {
        selectedLanguages.push(input.dataset.val);
      }
    });

    var queryObject = {
      selectedLanguages,
      selectedCities
    };

    return queryObject;
  }

  /*
        Filter data when filters gets changed like city, languages
  */
  filterData() {
    var queryObject = this.getQueryObject();
    this.setState({
      loading : true
    });
    this.fetchData(queryObject);
  }

    componentDidMount() {
      this.getSelectors();
      var queryObject = this.getQueryObject();
      this.fetchData(queryObject);
    }

    handleEvent(e) {
        let target = e.target && e.target.innerText, self = this, queryParam;
        if (target !== this.state.selectedFilter) {
            let mapper = {
                'Monthly': "groupby=month",
                'Yearly': "groupby=year",
                'Daily': "groupby=Date"
            };
        queryParam = mapper[target];
        queryParam += "&journal=" + self.journalInfo.selectedJournal;
        self.setState({selectedFilter: target});
        // self.fetchData(queryParam);
    }
  }

  handleKeyPress(e) {
    if(e.charCode === 13 && e.target.innerText) {
      this.handleEvent(e);
    }
  }


  fetchData(queryObject) {
    let self = this;
    queryObject = queryObject || "";
    let config = {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Tweets Volume'
      },
      credits: {
        enabled: false
      },
      xAxis: {
        title: {
          text: 'Language',
          style: {
            fontWeight: 'bold'
          }
        },
        categories: ['English', 'Hindi', 'Thai', 'French', 'Spanish']
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
        data: [40000, 20000,30470,16000,26000]
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


    TweetService.getLanguageDistribution().then(function(response){
      let languageData = response.data && response.data.languages || [];
      //let colors = ["rgb(153, 158, 255)","rgb(228, 211, 84)","rgb(124, 181, 236)","rgb(67, 67, 72)","rgb(241, 92, 128)"];
      let colors = ["green", "red", "blue", "yellow", "black"];
      let colorsObj = {
        "en" : "English",
        "fr" : "French",
        "es" : "Spanish",
        "hi" : "Hindi",
        "th" : "Thai"
      }

      // sort languageData based on count

      languageData.sort(function(a,b) {
          return b.count - a.count;
      });


      languageData.forEach(function(d, index){
        d.value = d.count;
        d.color = colors[index];
        d.label = colorsObj[d.language];
      });

      self.setState({
        config,
        worldMapConfig : queryObject,
        loading : false,
        languageData
      })
    });

  }

  render() {
    let self = this;
    var languageData = this.state.languageData;
    if(this.state.loading) {
      return (
        <div id="loader">
          <Loader
            type="Plane"
            color="#00BFFF"
            height="100"
            width="100"
          />
        </div>
      )
    }else {
      return (
        <Panel>
          <Grid fluid>
            <Row className="show-grid">
              <WorldMap config={this.state.worldMapConfig}/>
              {/*<Panel header={<h3>Tweet Volume</h3>} style={{ minHeight: 500 }}>
                <ReactHighcharts config={this.state.config}></ReactHighcharts>
              </Panel>*/}
              <Panel header={<h3>Language Wise Distribution</h3>} style={{ minHeight: 200, maxWidth: 500 }}>
              <Pie3D data={languageData}/>
              </Panel>
            </Row>
          </Grid>
        </Panel>
      )
    }
  }
}