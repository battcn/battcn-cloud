
import userApi from './User'

// 在给 api 方法命名时,方法名唯一,不要使用如下的命名方式, 如:
// Module1 中定义 getInfo 方法,且 Module2 中也定义 getInfo 方法.
// 会造成命名冲突

export default {
  ...userApi
}
