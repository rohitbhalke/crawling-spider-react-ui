var Utility = {

  getHost : function(){
    if(this.isDevelopmentEnv()){
      return "http://localhost:5000";
    }else {
      return "http://crawlingspiders-env-1.ineekwwziv.us-east-2.elasticbeanstalk.com";
    }

  },

    isDevelopmentEnv : function() {
        console.log("Dev Env : ", process.env.NODE_ENV);
        return process.env.NODE_ENV === 'development' || !process.env.NODE_ENV;
    }
};

export default Utility;