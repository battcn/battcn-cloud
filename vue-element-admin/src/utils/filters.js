import Vue from 'vue'
import CryptoJS from 'crypto-js'
// import {
//   Message
// } from 'element-ui'

/**
 *  秒转成时分秒
 */
Vue.filter('formatTime', function(time) {
  if (!time) {
    return ''
  } else if (time < 0) {
    return '已延时'
  } else if (time < 60) {
    return time + '秒'
  } else if (time < 3600) {
    return Math.floor(time / 60) + '分钟' + (time % 60) + '秒'
  } else if (time < 86400) {
    return (
      Math.floor(time / 3600) +
      '小时' +
      Math.floor((time % 3600) / 60) +
      '分' +
      (time % 60) +
      '秒'
    )
  } else {
    return '大于1天'
  }
})

Vue.filter('analysis', function(str) {
  const parseStr = [
    '省',
    '市',
    '区',
    '旗',
    '盟',
    '号',
    '路',
    '镇',
    '乡',
    '村',
    '组'
  ]
  const pattern1 = new RegExp('[\u4E00-\u9FA5]+')
  const pattern2 = new RegExp('[A-Za-z]+')
  const pattern3 = new RegExp('[0-9]+') // 匹配数字
  const pattern4 = /^(([0123456789]\d{2,4}-\d{7,12})|([123456789]\d{7,15}))$/

  const arr = [] // 3段式每段长度
  const addressStr = str.trim()
  const strArr = addressStr.split('')
  const splitList = []
  strArr.map((x, i) => {
    if (!(pattern1.test(x) || pattern2.test(x) || pattern3.test(x))) {
      if (strArr[i - 1]) {
        if (
          (pattern1.test(strArr[i - 1]) && pattern1.test(strArr[i + 1])) ||
          (pattern2.test(strArr[i - 1]) && pattern1.test(strArr[i + 1])) ||
          (pattern1.test(strArr[i - 1]) && pattern2.test(strArr[i + 1]))
        ) {
          splitList.push(i)
        }
        if (
          (pattern1.test(strArr[i - 1]) && pattern3.test(strArr[i + 1])) ||
          (pattern2.test(strArr[i - 1]) && pattern3.test(strArr[i + 1]))
        ) {
          let temp = 0
          strArr.map((y, j) => {
            if (strArr[i + 8] && j > i && j < i + 5) {
              if (!pattern3.test(y)) {
                temp++
              }
            }
          })
          if (temp < 2 && strArr[i + 5]) {
            splitList.push(i)
          }
        }
        if (
          (pattern3.test(strArr[i - 1]) && pattern1.test(strArr[i + 1])) ||
          (pattern3.test(strArr[i - 1]) && pattern2.test(strArr[i + 1]))
        ) {
          let temp = true
          strArr.map((y, j) => {
            if (strArr[i - 8] && j < i && j > i - 5) {
              if (!pattern3.test(y)) {
                temp = false
              }
            }
          })
          if (temp) {
            splitList.push(i)
          }
        }
      }
    }
  })
  if (splitList.length === 1) {
    arr.push(addressStr.slice(0, splitList[0]))
    arr.push(addressStr.slice(splitList[0] + 1, addressStr.length))
  } else if (splitList.length === 2) {
    arr.push(addressStr.slice(0, splitList[0]))
    arr.push(addressStr.slice(splitList[0] + 1, splitList[1]))
    arr.push(addressStr.slice(splitList[1] + 1, addressStr.length))
    console.log(arr)
  }

  const returnArr = []
  const arrLen = []

  if (arr.length) {
    arr.map((x, i) => {
      arrLen.push(x.length)
      if (pattern4.test(x)) {
        returnArr[1] = i
      }
    })
    if (typeof (returnArr[1]) === 'number') {
      const temp = arr.splice(returnArr[1], 1)[0].trim()
      returnArr[1] = temp
      if (arr.length > 1) {
        if (arr[0].length > arr[1].length) {
          returnArr[0] = arr[1].trim()
          returnArr[2] = arr[0].trim()
        } else {
          returnArr[0] = arr[0].trim()
          returnArr[2] = arr[1].trim()
        }
      } else {
        let num = 0
        parseStr.map(y => {
          if (arr[0].indexOf(y) > -1) {
            num++
          }
        })
        if (num > 1) {
          returnArr[2] = arr[0].trim()
        } else {
          returnArr[0] = arr[0].trim()
        }
      }
    } else {
      arr.map(x => {
        let num = 0
        parseStr.map(y => {
          if (x.indexOf(y) > -1) {
            num++
          }
        })
        if (num > 1) {
          returnArr[2] = x
        }
      })
    }
  }

  return returnArr
})

/**
 *  时间格式转换
 */
Vue.filter('parseTime', function(time, cFormat) {
  if (!time) {
    return ''
  }

  if (arguments.length === 0) {
    return null
  }

  if ((time + '').length === 10) {
    time = +time * 1000
  }

  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    date = new Date(parseInt(time))
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') {
      return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return timeStr
})

/**
 * 根据key获取对应数字匹配的value
 */
Vue.filter('findValFromArray', function(val, key, arr, attr) {
  for (let i = 0; i < arr.length; i++) {
    const ele = arr[i]
    if (ele[key] === val) {
      return ele[attr]
    }
  }
})

/**
 * 登录请求加密处理
 */
Vue.filter('encryption', function(params) {
  const key = CryptoJS.enc.Latin1.parse('ksudiksudiksudix')
  const encrypted = CryptoJS.AES.encrypt(params, key, {
    iv: key,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding
  })
  console.log(encrypted.toString())
  return encrypted.toString()
})

/**
 * 员工类型
 */
Vue.filter('userType', function(val) {
  const hardwareType = {
    valid: '有效',
    reviewing: '待审',
    invalid: '无效'
  }
  return hardwareType[val] || ''
})
