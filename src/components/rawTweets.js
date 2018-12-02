import React, { Component } from 'react';
import {Grid, Row, Col, Panel} from 'react-bootstrap';
import ReactHighcharts from 'react-highcharts';
import axios from 'axios';
import Select from 'react-select';
import Loader from 'react-loader-spinner'
import ReactPaginate from 'react-paginate';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import products from '../data/rawData'
import TweetsFormatted from './tweetFormatted'
import TweetService from "../services/TweetService";

export default class RawTweets extends Component {

  constructor() {
    super();
    this.state = {
      rawTweets : [],
      pageCount : 10,
      pagination : {

      },
      loading: false
    };
    this.fetchData = this.fetchData.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.getSelectors = this.getSelectors.bind(this);
    this.filterData = this.filterData.bind(this);
    this.getQueryObject = this.getQueryObject.bind(this);
  }

  getSelectors() {
    this.cityGroup = document.querySelectorAll('.citygroup')[0];
    this.langGroup = document.querySelectorAll('.languagegroup')[0];
    this.hashTags = document.querySelectorAll('.hashtags')[0];
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
    if(this.hashTags){
      console.log("Event added1");
      this.hashTags.addEventListener('change', this.filterData);
    }
  }

  getQueryObject() {
    var cities = this.cityGroup.querySelectorAll('input');
    var languages = this.langGroup.querySelectorAll('input');
    var hashtags = this.hashTags.querySelectorAll('input');
    var selectedCities = [];
    var selectedLanguages = [];
    var selectedHashtags = [];

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

    hashtags.forEach(function(input) {
      if(input.checked) {
        selectedHashtags.push(input.dataset.val);
      }
    });

    var queryObject = {
      selectedLanguages,
      selectedCities,
      selectedHashtags
    };

    return queryObject;
  }

  /*
        Filter data when filters gets changed like city, languages
  */
  filterData() {
    var queryObject = this.getQueryObject();
    this.fetchData(queryObject);
  }

  componentDidMount() {
    this.getSelectors();
    var queryObject = this.getQueryObject();
    this.fetchData(queryObject);
  }

  handlePageClick(data){
    var queryObject = this.getQueryObject();
    let selected = data.selected;

    queryObject.start = selected;
    this.fetchData(queryObject);
  }

  fetchData(queryObj) {
    let self = this;

    self.setState({
      loading : true
    });

    queryObj.start = queryObj.start || 0;
    return TweetService.getTweets(queryObj).then(function(response) {
      var tweets = response.data.tweets;
      var total = response.data.total;
      var pageCount = total / 10;
      self.setState({
        rawTweets : tweets,
        pagination: {
          pageCount,
          paginationActive : queryObj.start
        },
        loading : false
      });
      console.log(response);
    }).catch(function (err) {
      console.log(err);
    })
  }

  render() {
    var tweets = this.state.rawTweets;
    const loading = this.state.loading;
    {/*<Loader*/}
      {/*type="Plane"*/}
      {/*color="#00BFFF"*/}
      {/*height="100"*/}
      {/*width="100"*/}
    {/*/>*/}

    let content;
    /*if(loading) {
      content = <Loader
      type="Plane"
      color="#00BFFF"
      height="100"
      width="100"
      />
    }*/

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
        <div>
          <ReactPaginate previousLabel={"previous"}
                         nextLabel={"next"}
                         forcePage={this.state.pagination.paginationActive}
                         breakLabel={"..."}
                         breakClassName={"break-me"}
                         pageCount={this.state.pagination.pageCount}
                         marginPagesDisplayed={2}
                         pageRangeDisplayed={5}
                         onPageChange={this.handlePageClick}
                         containerClassName={"pagination"}
                         subContainerClassName={"pages pagination"}
                         activeClassName={"active"} />
          {tweets.map(function(i) {
            return <TweetsFormatted data={i}/>
          })}

          {/*<BootstrapTable*/}
          {/*data={ tweets }*/}
          {/*pagination>*/}
          {/*<TableHeaderColumn dataField='id' isKey>Product ID</TableHeaderColumn>*/}
          {/*<TableHeaderColumn dataField='text' filter={ { type: 'TextFilter', defaultValue: '' } }>Product Name</TableHeaderColumn>*/}
          {/*<TableHeaderColumn dataField='price'>Product Price</TableHeaderColumn>*/}
          {/*</BootstrapTable>*/}
        </div>
      );
    }
  }
}