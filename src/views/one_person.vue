<template>
  <div id="head" class="region">
    <div class="region-head">{{showCategory?'章节列表':info.chapterList[info.current].name}}</div>
    <div v-show="showCategory" class="region-content">
      <ul><li v-for="(c, index) in info.chapterList" @click="goChap(index)">{{c.name}}</li></ul>
    </div>
    <div v-if="!showCategory">
      <img v-for="img in info.result" :src="img" style="width: 100%;" />
    </div>
    <div v-if="!showCategory">
      <el-button type="primary" class="btn btn-default" @click="prev()">上一章</el-button>
      <el-button type="primary" class="btn btn-default" @click="showCategory = true">目录</el-button>
      <el-button type="primary" class="btn btn-default" @click="next()">下一章</el-button>
    </div>
  </div>
</template>

<script>
import request from "../utils/request.js"
import http from "../utils/http.js"
import base64decode from "../utils/base64decode.js"
import $ from "jquery"
import { reactive, ref } from "vue"
export default {
  setup() {
    const showCategory = ref(true);
    const info = reactive({
      chapterList: [],
      current: 0,
      result: []
    })
    
    http.jsonp({
      url: 'http://www.taduo.net/manhua/2/',
      encode: 'gb2312'
    }).then(res => {
      var data = $(res).find('.plist');
      var chapters = data.find('a');
      var ul = $('<ul></ul>');
      chapters.each(function(i,item){
        let index = (chapters.length-i-1);
        info.chapterList.unshift({
          index: index,
          url: item.pathname,
          name: item.innerText
        });
      })
      console.log(info.chapterList)
      if(localStorage['oneperson_cur']){
        var record = JSON.parse(localStorage['oneperson_cur']);
        goChap(record.index);
      }
    })
    
    function goChap(index){
      var url = info.chapterList[index].url;
      info.result = [];
      info.current = index;
      // 改变标题
      http.jsonp({
        url: 'http://m.taduo.net' + url
      }).then(function(res){
        var reg_g = /cp="(.+?)"/g
        var result = reg_g.exec(res);
        var data = result[1];
        // 解析数据，获得packedarr
        var arrData = eval(base64decode(data).slice(4));
        var images = eval(arrData.substr(arrData.indexOf('[')));
        for(var i in images){
          if(images[i].indexOf('/c8.jpg')>-1) continue;
          info.result.push('http://mh.lianzhixiu.com/' + images[i]);
        }
        showCategory.value = false;
        // 记录当前进度
        localStorage['oneperson_cur'] = JSON.stringify(info.chapterList[info.current]);
      })
    }
    function next(){
      goChap(info.current+1);
    }
    function prev(){
      goChap(info.current-1);
    }
    
    return {
      info, showCategory, goChap, next, prev
    }
  }
}



</script>

<style scoped>
li{
  list-style:none; /* 将默认的列表符号去掉 */
  float: none;
  width: 23%;
  min-width: 200px;
  display: inline-block;
  padding: 10px;
  cursor: pointer;
}
li:hover{
  background-color: #3A8EE6;
  color: white;
}
</style>
