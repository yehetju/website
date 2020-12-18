<template>
  <div class="navbar">
    <div class="title">Aloys Just for Fun!</div>
    <el-menu
      :default-active="activeIndex"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      class="menu">
      <el-menu-item v-for="(r, index) in routes" :index="index+''">
        {{r.meta.name}}
      </el-menu-item>
    </el-menu>
    <div>
      <dictionary />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { getRoutes, router } from '../router/index.js'
import Dictionary from './Dictionary.vue'
export default {
  components: { Dictionary },
  setup(props, ctx){
    let routes = getRoutes();
    let activeIndex = ref('0')

    function handleSelect(key, keyPath) {
      router.push(routes[key]);
    }
    
    onMounted(() => {
      routes.forEach((r, index) => {
        if(r.path == window.location.pathname){
          activeIndex.value = index.toString();
        }
      })
    })

    return {activeIndex, handleSelect, routes}
  }
}
</script>

<style scoped>
.navbar{
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: rgb(84, 92, 100);
  color: white;
}
.navbar .title{
  /* position: absolute;
  left: 0; */
  line-height: 60px;
  font-size: 24rem;
  padding: 0 20px;
  display: flex;
}
.navbar .menu{
  display: flex;
}
.navbar .search{
  display: flex;
}
:deep(.el-menu.el-menu--horizontal){
  border-bottom: none;
}
</style>
