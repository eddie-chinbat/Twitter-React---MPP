var env = {
    BASE: "http://localhost:8080/api/user",
    BASE_WALL: "http://localhost:8080/api/tweet",

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