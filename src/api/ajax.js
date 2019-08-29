/**
Ajax请求函数模块
返回值：promise对象(异步返回的数据是response.data数据)
*/
// 使用axios发送请求   先把axios下载下来
import axios from 'axios'

// 向外默认暴露一个函数
export default function ajax(url, data = {}, type = 'GET') {

  // 高阶函数
  return new Promise(function (resolve, reject) {
    // 执行异步Ajax函数

    let promise
    if (type === 'GET') {
      // 准备 url query 参数数据
      let dataStr = '' //数据拼接字符串
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })
      if (dataStr !== '') {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
        url = url + '?' + dataStr
      }
      // 发送 get 请求
      promise = axios.get(url) //类似于response
    } else {
      // 发送 post 请求
      promise = axios.post(url, data)
    }
    promise.then(function (response) {
      //成功调用 resolve（）
      resolve(response.data)
    }).catch(function (error) {
      // 失败调用 reject（）
      reject(error)
    })
  })

//   return promise
}


/**
const response = await ajax()
const result = response.data
想实现的效果
const resule = await ajax()

*/
