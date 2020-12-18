<template>
  <div class="search">
    <el-input v-model="kwd" placeholder="可输入汉字/词/成语/英语单词" class="form-control" style="width: 250px;display: inline-block;"
      @keyup.enter.native="startDict"
    >
      <template #suffix>
        <i class="el-input__icon el-icon-search" @click="startDict"></i>
      </template>
    </el-input>
  </div>
  <el-dialog
    title="查询结果"
    v-model="visible"
    :class="'dialog-constrain'"
    :before-close="handleClose">
    <div v-html="dictResult" style="overflow: hidden;">
      
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button size="mini" @click="visible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="visible = false">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { ElMessageBox } from "element-plus"
import http from "../utils/http.js"
import $ from "jquery"
import { reactive, ref } from "vue"
export default {
  setup() {
    let visible = ref(false)
    let kwd = ref("");
    let dictResult = ref("");
    const startDict = () => {
      var word = kwd.value;
      if(/^[a-zA-Z]+$/.test(word)){
        searchEN(word).then(res => {
          var data = $(res).find('.Content_content__MqclS');
          data.find('.Content_left__3sMc7, .TabList_tab__af76P, .jsx-1500050861, .Mean_word__3SsvB>img, .FoldBox_more__2m4cl').remove();
          dictResult.value = data[0].outerHTML;
          visible.value = true;
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
          visible.value = true;
        })
      }
    }
    
    return {
      kwd, dictResult, startDict, visible
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

<style scoped>
.search{
  padding: 10px;
}
:deep(.el-input__inner) {
  background-color: transparent;
  border-radius: 20px;
  border-color: rgb(220, 223, 230, 0.3);
  color: white;
}
</style>
