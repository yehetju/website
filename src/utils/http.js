import request from "./request.js"
var http = (function(){
  function jsonp(opt){
    return request({
      url: 'http://api.aloys.group/jsonp.php',
      method: 'get',
      params: { url: opt.url, encode: opt.encode }
    })
  }
  
  return {
    jsonp: jsonp
  }
})();

export default http;