var env = {
    BASE: "http://10.10.71.76:8080/api/user",
    BASE_WALL: "http://10.10.71.76:8080/api/tweet",
    BASEV2: "http://10.10.71.76:8080/v2/api/user",
    BASE_WALLV2: "http://10.10.71.76:8080/v2/api/tweet",

    //POST
    signup          : "/signup",
    userUpdate      : "/update",
    tweetPost       : "/post/",
    //GET
    getFollower     : "/getfollowers?userid=",
    getFollowing    : "/getfollowing?userid=",
    getUser         : "/user?userid=",
    signin          : "/signin?",
    changePassword  : "changepassword?",
    getWall         : "/post/wall/",
    getMyTweet      : "/post?userid=",
    // setUserFollow   : "",
    // setUserUnFollow : "", 
};
export {env};