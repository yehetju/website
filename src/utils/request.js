import axios from 'axios'
import { ElMessage  } from 'element-plus'

// create an axios instance
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 30000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    // if (store.getters.token) {
    //   // let each request carry token
    //   // ['X-Token'] is a custom headers key
    //   // please modify it according to the actual situation
    //   config.headers['Authorization'] = 'Bearer ' + getToken()
    // }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    hideMask()
    const res = response.data;
    return res;
    // if (res.ok && res.respCode === '0') {
    //   return res
    // } else {
    //   const msg = res.message || "未知错误"
    //   const code = response.status || 999
    //   Message({
    //     message: msg,
    //     type: 'error',
    //     duration: 5 * 1000
    //   })

    //   // res.respCode === '-1' || 暂时去掉了
    //   if (code === 400 || code === 401 || code === 403 || code === 50014) {
    //     // to re-login
    //     MessageBox.confirm('点击取消留在当前页面，或者重新登录', '登录失效', {
    //       confirmButtonText: '重新登录',
    //       cancelButtonText: '取消',
    //       type: 'warning'
    //     }).then(() => {
    //       store.dispatch('user/resetToken').then(() => {
    //         location.reload()
    //       })
    //     })
    //   }
    //   return Promise.reject(new Error(res.message || 'Error'))
    // }
  },
  error => {
    hideMask()
    console.log(error)
    const data = error.response && error.response.data
    const code = error.response && error.response.status
    // 先判断超时
    if(error.message && error.message.indexOf('timeout') > -1){
      ElMessage({
        message: '请求超时，请稍后再试！',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(error)
    }
    if (code === 403 || code === 401) { // 登录失效
      // MessageBox.confirm('登录失效，您可以留在当前页或者重新登录', '确认退出', {
      //   confirmButtonText: '重新登录',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // })
    } else {
      ElMessage({
        message: data ? (data.message || data.msg || data.header.msg) : ('网络错误：' + code),
        type: 'error',
        duration: 5 * 1000
      })
    }
    return Promise.reject(data)
  }
)
function hideMask() {
  if (window.currentMask) {
    window.currentMask.close()
    window.currentMask = null
  }
}
export default service
