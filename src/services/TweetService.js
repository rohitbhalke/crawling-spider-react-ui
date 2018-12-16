
import axios from 'axios';
import utility from '../utils/utility';

axios.defaults.withCredentials = true;

var TweetService = {

    getTweetCount : function(obj){
      let host = utility.getHost();
      let config = {
        headers: {"Access-Control-Allow-Origin": "*","Access-Control-Allow-Credentials" : true,
          'Content-Type': 'application/x-www-form-urlencoded'}
      };

      let query = host+"/tweets/cities/count?";

      if(obj && obj.selectedCities&& obj.selectedCities.length) {
        query += "&city=" + obj.selectedCities.join(",");
      }

      if(obj && obj.selectedLanguages && obj.selectedLanguages.length) {
        query += "&lang=" + obj.selectedLanguages.join(",");
      }

      return axios.get(query, config).then(function (data) {
        return data;
      }).catch(function (error) {
        console.log("Error while fetching all tweet count");
        throw error.response;
      })
    },

    getTweets : function(obj){
      let host = utility.getHost();
      let config = {
        headers: {"Access-Control-Allow-Origin": "*","Access-Control-Allow-Credentials" : true,
          'Content-Type': 'application/x-www-form-urlencoded'}
      };
      let start = obj.start;


      let query = host+"/tweets/list?docs=10&start="+start;

      if(obj && obj.selectedCities&& obj.selectedCities.length) {
        query += "&city=" + obj.selectedCities.join(",");
      }

      if(obj && obj.selectedLanguages && obj.selectedLanguages.length) {
        query += "&lang=" + obj.selectedLanguages.join(",");
      }

      if(obj && obj.selectedHashtags && obj.selectedHashtags.length) {
        let hashtags = obj.selectedHashtags.join(" ");
        query += "&search=" + encodeURIComponent(hashtags);
      }

      if(obj && obj.search && obj.search.length) {
        query += "&search=" + obj.search;
      }

      return axios.get(query, config).then(function (data) {
        return data;
      }).catch(function (error) {
        console.log("Error while fetching all tweet count");
        throw error.response;
      })
    },

    getHashTags : function() {
      let host = utility.getHost();
      let config = {
        headers: {"Access-Control-Allow-Origin": "*","Access-Control-Allow-Credentials" : true,
          'Content-Type': 'application/x-www-form-urlencoded'}
      };

      let query = host+"/tweets/hashtags/list";

      return axios.get(query, config).then(function (data) {
        return data;
      }).catch(function (error) {
        console.log("Error while fetching all tweet count");
        throw error.response;
      })
    },

    getWeekwiseSentiments(city, topic) {
      let host = utility.getHost();
      let config = {
        headers: {"Access-Control-Allow-Origin": "*","Access-Control-Allow-Credentials" : true,
          'Content-Type': 'application/x-www-form-urlencoded'}
      };

      let query = host+"/tweets/cityTopicWeeklySentiments?";
      city = city || "nyc";
      topic = topic || "infra";

      query += "city="+city;
      query += "&topic="+topic;

      return axios.get(query, config).then(function (data) {
        return data;
      }).catch(function (error) {
        console.log("Error while fetching all tweet count");
        throw error.response;
      })
    },

    getLanguageDistribution : function() {
      let host = utility.getHost();
      let config = {
        headers: {"Access-Control-Allow-Origin": "*","Access-Control-Allow-Credentials" : true,
          'Content-Type': 'application/x-www-form-urlencoded'}
      };

      let query = host+"/tweets/languages/count?";

      // if(obj && obj.selectedCities&& obj.selectedCities.length) {
      //   query += "&city=" + obj.selectedCities.join(",");
      // }
      //
      // if(obj && obj.selectedLanguages && obj.selectedLanguages.length) {
      //   query += "&lang=" + obj.selectedLanguages.join(",");
      // }

      return axios.get(query, config).then(function (data) {
        return data;
      }).catch(function (error) {
        console.log("Error while fetching all tweet count");
        throw error.response;
      })
    }

};

export default TweetService;