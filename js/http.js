var http = (function(){
  var baseUrl = '/api';
  var requestCount = 0;
  if(typeof mui != 'undefined'){
    var mask = mui.createMask(function(){ return false; });  //callback为用户点击蒙版时自动执行的回调；
    mask[0].id = 'mask';
    $(mask[0]).append('<span class="mui-icon mui-icon-spinner mui-spin"></span>')
    
  }
  
  function request(opt){
    requestCount++;
    opt.mask && mask.show();//显示遮罩
    
    var newOption = {
      url: baseUrl + opt.url,
      timeout: opt.timeout || 5000,
      type: opt.type,
      data: opt.data || {},
      dataType: 'json',
      success: function(res){
        if(res.ok){
          opt.success && opt.success(res);
        }else{
          handleErr(res);
        }
      },
      error: function(err){
        handleErr(err);
      },
      complete: function(res){
        requestCount--;
        if(requestCount==0){
          $('#mask').hide();
        }
        opt.complete && opt.complete(res);
      }
    };
    if(opt.type=='post'){
      newOption.contentType = 'application/json;charset=UTF-8';
      newOption.data = JSON.stringify(newOption.data);
      newOption.traditional = true;
    }
    
    setTimeout(function(){
      $.ajax(newOption)
    }, 200);
  }
  
  function get(opt) {
    opt = opt || {};
    opt.type = 'get';
    request(opt);
  }
  
  function post(opt) {
    opt = opt || {};
    opt.type = 'post';
    request(opt);
  }
  
  function handleErr(res){
    if(res.message){
      alert(res.message);
    }else{
      alert('网络错误，请稍后再试！');
    }
  }
  
  function getImgPath(fileId){
    if(fileId){
      return baseUrl + '/sys/file/' + fileId + '/download';
    }else{
      return './img/defaultAvatar.png'
    }
  }
  
  function deepClone(source) {
    if (!source && typeof source !== 'object') {
      throw new Error('error arguments', 'deepClone')
    }
    const targetObj = source.constructor === Array ? [] : {}
    Object.keys(source).forEach(keys => {
      if (source[keys] && typeof source[keys] === 'object') {
        targetObj[keys] = deepClone(source[keys])
      } else {
        targetObj[keys] = source[keys]
      }
    })
    return targetObj
  }
  
  Date.prototype.format = function(format){
  	 var o = {
  	 "M+" : this.getMonth()+1, //month
  	 "d+" : this.getDate(),    //day
  	 "h+" : this.getHours(),   //hour
  	 "m+" : this.getMinutes(), //minute
  	 "s+" : this.getSeconds(), //second
  	 "q+" : Math.floor((this.getMonth()+3)/3),  //quarter
  	 "S" : this.getMilliseconds() //millisecond
  	 }
  	 if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
  	 (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  	 for(var k in o)if(new RegExp("("+ k +")").test(format))
  	 format = format.replace(RegExp.$1,
  	 RegExp.$1.length==1 ? o[k] :
  	 ("00"+ o[k]).substr((""+ o[k]).length));
  	 return format;
  }
  
  function jsonp(opt){
    return $.ajax({
      url: 'http://app.xinxiangbin.club/jsonp.php',
      type: 'get',
      data: { url: opt.url, encode: opt.encode }, 
      success: function(res){
        try{
          var json = JSON.parse(res.replace(/<div.*<\/div>/g, ''));
        }
        catch(e){
          var json = res;
        }
        
        if(opt.success){
          opt.success(json)
        }
      },
      error: function(e){
        if(opt.error){
          opt.error(e)
        }
      }
    })
  }
  
  return {
    baseUrl: baseUrl,
    getImgPath: getImgPath,
    deepClone: deepClone,
    get: get,
    post: post,
    jsonp: jsonp
  }
})();