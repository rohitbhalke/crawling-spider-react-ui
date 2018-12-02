import React, { Component } from 'react';
import {Grid, Row, Col, Panel} from 'react-bootstrap';
import ReactHighcharts from 'react-highcharts';
import axios from 'axios';
import Tweet from 'react-tweet'
import Select from 'react-select';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import products from '../data/rawData'


export default class RawTweets extends Component {

  constructor() {
    super();
    this.state = {
      tweetData : products
    }
  }

  render () {
    const self = this;
    const data = self.props.data;
    const name = self.props && self.props.data && self.props.data["user.name"] || "";
    const tweet_text = self.props && self.props.data && self.props.data.summary || "";
    const city = data && data.x && data.city[0] || "";
    const followers = data && data["user.followers_count"] || 0;
    const following = data && data["user.friends_count"] || 0;
    const profileImage = data && data["user.profile_image_url"] || "";
    const location = data && data["user.location"];
    const instaGramLink = data && data["user.entities.url.urls.expanded_url"] || "";
    const handle = data && data["user.screen_name"] || "";
    var divStyle = {
      backgroundImage: 'url(' + profileImage + ')'
    };
    var followLink = "https://twitter.com/" + handle;
    return (
      <div className="twitter-card">
        <div className="row-top">
          <div className="user-wrapper">
            <span className="user-image" style={divStyle} ></span>
            <div className="profile-user">
              <span className="user">{name}</span>
              <span className="username">@{handle}</span>
            </div>
          </div>
          <a href={followLink} target="_blank" className="follow">Follow</a>
        </div>
        <p className="profile-bio">{tweet_text}</p>
        <div className="row-middle">
    <span className="profile-location">
      <i className="fas fa-map-marker-alt"></i>
      {location}
    </span>
          {instaGramLink.length > 0 &&
            <span className="profile-website">
              <i className="fas fa-link"></i>
              <a href={instaGramLink} target="_blank">{instaGramLink}</a>
            </span>
          }
        </div>
        <div className="row-bottom">
    <span className="followers-count">
      Followers
      <span className="count-meta">{followers}</span>
    </span>
        <span className="following-count">
    Following
    <span className="count-meta">{following}</span>

    </span>
        </div>
        <br/>
      </div>
    )
  }
}