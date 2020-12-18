<template>
  <div>
    <!-- <div class="region">
      <div class="region-head">通用词典 &emsp;<span id="dictState"></span></div>
      <div class="region-content constrain">
        <div class="search">
          <el-input v-model="kwd" placeholder="可输入汉字/词/成语/英语单词" class="form-control" style="width: 250px;display: inline-block;" />
          <el-button type="primary" @click="startDict">查找</el-button>
        </div>
        <div v-html="dictResult" style="overflow: hidden;">
          
        </div>
      </div>
    </div> -->
    <div class="region">
      <div class="region-head">每日诗词</div>
      <div id="sentence" class="region-content constrain episode">
        <div class="title">{{art.title}}</div>
        <div class="author">{{art.dynasty + '·' + art.author}}</div>
        <div class="content">
          <p v-for="p in art.content">{{p}}</p>
        </div>
      </div>
      
    </div>
    <div class="region">
      <div class="region-head">每日英语</div>
      <div id="english" class="region-content">
        <p class="english-img"><img :src="dailyEnglish.imgUrl" /></p>
        <p>{{dailyEnglish.content}}</p>
        <p>{{dailyEnglish.translation}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import request from "../utils/request.js"
import http from "../utils/http.js"
import $ from "jquery"
import { reactive, ref } from "vue"
export default {
  setup() {
    var today = new Date().format('yyyy-MM-dd');
    
    const art = reactive({});
    
    if(!localStorage.getItem(today)){
      request({
        url: 'https://v2.jinrishici.com/one.json',
        method: 'get'
      }).then(function(res) {
        // 自己的处理逻辑
        let data = res.data.origin;
        Object.assign(art, data);
        localStorage.setItem(today, JSON.stringify(data));
      });
    }else{
       let data = JSON.parse(localStorage.getItem(today));
       Object.assign(art, data);
    }
    
    const dailyEnglish = reactive({})
    http.jsonp({
      url: 'https://apiv3.shanbay.com/weapps/dailyquote/quote/?date=' + today
    }).then(res => {
      try{
        var res = JSON.parse(res.replace(/<div.*<\/div>/g, ''));
      }
      catch(e){
        var res = res;
      }
      let img = res.origin_img_urls[0];
      dailyEnglish.imgUrl = img;
      Object.assign(dailyEnglish, res);
    })
    
    let kwd = ref("");
    let dictResult = ref("");
    const startDict = () => {
      var word = kwd.value;
      if(/^[a-zA-Z]+$/.test(word)){
        searchEN(word).then(res => {
          var data = $(res).find('.Content_content__MqclS');
          data.find('.Content_left__3sMc7, .TabList_tab__af76P, .jsx-1500050861, .Mean_word__3SsvB>img, .FoldBox_more__2m4cl').remove();
          dictResult.value = data[0].outerHTML;
        })
      }else{
        search(word).then(res => {
          var data = $(res).find('.dictionaries');
          data.find('.copyright, h3, .zdict:last-of-type, .adsbygoogle, .zib-title, .zyzx, .mpuslot_b-container').remove(); // 去掉评论区
          data.find('a').each(function(i,a){
            if(a.href && a.href.indexOf('/hans/') > -1){
              a.href = 'javascript: search("'+ a.innerText +'")';
              $(a).css('margin-right', '10px');
            }else{
              a.href = '#';
            }
          })
          
          data.find('h2').css('font-size','1.1em');
          dictResult.value = data[0].outerHTML;
        })
      }
    }
    
    return {
      kwd, dictResult, art, dailyEnglish, startDict
    }
  }
}
  
function search(kwd){
  return http.jsonp({
    url: 'http://www.zdic.net/hans/' + kwd
  })
}

function searchEN(kwd){
  return http.jsonp({
    url: 'http://www.iciba.com/word?w=' + kwd
  })
}
</script>

<style>
@import url("../styles/index.css");
</style>
