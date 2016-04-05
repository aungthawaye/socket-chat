const path        = require ('path');

// Root directory of this application
const ROOT_DIR    = path.normalize(__dirname + "/../");

console.log("inside constants.js");
console.log("root dir : " + ROOT_DIR);

exports.DirConstants = {
  ROOT_DIR : ROOT_DIR,
  HTML_DIR : ROOT_DIR + "html"
}

exports.UrlPathConstants = {
  /*
    URL path names:
  */
  HOME_PAGE : "/",
  CHAT_ROOM_PAGE : "/room"
}

console.log("html dir : " + exports.DirConstants.HTML_DIR);
