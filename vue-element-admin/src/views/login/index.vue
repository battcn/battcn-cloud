<template>
  <div class="login-container">
    <div
      v-if="mode !== 3"
      class="login-box"
    >
      <div class="tabs">
        <div
          :class="{'active' : mode === 1}"
          class="tabs_staff"
          @click="mode = 1"
        >
          <i :class="{'staff-active' : mode === 1}" /><span>西镜</span>
        </div>
      </div>

      <div
        v-if="mode === 1"
        class="tabs_content"
      >
        <div class="tabs_content-left">
          <div class="type">
            <span
              :class="{active: type === 2}"
              @click="type = 2"
            >登录</span>
          </div>
          <div
            v-if="type === 2"
            class="content-phone"
          >
            <el-form
              ref="loginForm"
              :model="loginForm"
              :rules="loginRules"
              auto-complete="on"
            >
              <el-form-item prop="username">
                <el-input
                  v-model="loginForm.username"
                  placeholder="请输入11位手机号码"
                >
                  <template slot="prepend"><i class="icon icon-phone" /></template>
                </el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  v-model="loginForm.password"
                  type="password"
                  placeholder="请输入6-25位密码"
                  @keyup.enter.native="handleLogin"
                >
                  <template slot="prepend"><i class="icon icon-password" /></template>
                </el-input>
              </el-form-item>
              <p>
                <span @click="mode = 3; isRegister = false; from = 'staff'">忘记密码？</span>
              </p>
              <el-form-item>
                <el-button
                  :loading="loading"
                  @click.native.prevent="handleLogin"
                >登录</el-button>
              </el-form-item>
            </el-form>
          </div>

        </div>
        <div class="tabs_content-right">
          <p class="content-tit">登录帮助</p>
          <p
            v-if="type === 2"
            class="mg-type2"
          >新用户请先联系管理员注册账号，再使用账号密码登录</p>
          <p v-if="type === 2">1.联系管理员</p>
          <p v-if="type === 2">2.获取账号</p>
          <p v-if="type === 2">3.登陆系统</p>
          <p
            v-if="type === 1"
            class="load-hlep"
          />
        </div>
      </div>
    </div>

    <div
      v-if="mode === 3"
      :class="{'more-height' : isRegister}"
      class="register"
    >
      <div
        class="back"
        @click="mode = 1"
      >
        <i class="icon-back" />
        返回登录
      </div>

      <div class="content-phone">
        <p
          v-if="!isRegister"
          class="title"
        >找回密码</p>
        <p
          v-if="isRegister"
          class="title mg-title"
        >注册账号</p>
        <el-form
          ref="registerForm"
          :model="registerForm"
          :rules="registerRules"
        >
          <el-form-item
            v-if="isRegister"
            prop="name"
          >
            <el-input
              v-model="registerForm.name"
              placeholder="请输入公司名称"
            >
              <template slot="prepend"><i class="icon icon-company" /></template>
            </el-input>
          </el-form-item>
          <el-form-item
            v-if="isRegister"
            prop="shortName"
          >
            <el-input
              v-model="registerForm.shortName"
              placeholder="请输入公司简称"
            >
              <template slot="prepend"><i class="icon icon-company" /></template>
            </el-input>
          </el-form-item>
          <el-form-item
            v-if="isRegister"
            prop="address"
          >
            <el-input
              v-model="registerForm.address"
              placeholder="请输入公司地址"
            >
              <template slot="prepend"><i class="icon icon-address" /></template>
            </el-input>
          </el-form-item>
          <el-form-item
            v-if="isRegister"
            prop="phone"
          >
            <el-input
              v-model="registerForm.phone"
              placeholder="请输入11位手机号码"
              auto-complete="off"
              readonly
              onfocus="this.removeAttribute('readonly');"
              onblur="this.setAttribute('readonly',true);"
            >
              <template slot="prepend"><i class="icon icon-phone" /></template>
            </el-input>
          </el-form-item>
          <el-form-item
            v-if="!isRegister"
            prop="mobile"
          >
            <el-input
              v-model="registerForm.mobile"
              placeholder="请输入11位手机号码"
              auto-complete="off"
              readonly
              onfocus="this.removeAttribute('readonly');"
              onblur="this.setAttribute('readonly',true);"
            >
              <template slot="prepend"><i class="icon icon-phone" /></template>
            </el-input>
          </el-form-item>
          <el-form-item
            v-if="isRegister"
            prop="validCode"
            class="input-reset"
          >
            <el-input
              v-model="registerForm.validCode"
              placeholder="请输入短信验证码123"
              auto-complete="off"
              readonly
              onfocus="this.removeAttribute('readonly');"
              onblur="this.setAttribute('readonly',true);"
            >
              <template slot="prepend"><i class="icon icon-check" /></template>
            </el-input>
            <el-button
              class="get-code"
              @click="getCode"
            >{{ showCount ? `${count}S后重新获取` : '获取验证码' }}</el-button>
          </el-form-item>
          <el-form-item
            v-if="!isRegister"
            prop="code"
            class="input-reset"
          >
            <el-input
              v-model="registerForm.code"
              placeholder="请输入短信验证码"
              auto-complete="off"
              readonly
              onfocus="this.removeAttribute('readonly');"
              onblur="this.setAttribute('readonly',true);"
            >
              <template slot="prepend"><i class="icon icon-check" /></template>
            </el-input>
            <el-button
              class="get-code"
              @click="getResetCode"
            >{{ showCountReset ? `${countReset}S后重新获取` : '获取验证码' }}</el-button>
          </el-form-item>
          <el-form-item
            v-if="isRegister"
            prop="password1"
          >
            <el-input
              v-model="registerForm.password1"
              type="password"
              placeholder="请输入英文和数字组成的6-25位密码"
              auto-complete="off"
              readonly
              onfocus="this.removeAttribute('readonly');"
              onblur="this.setAttribute('readonly',true);"
            >
              <template slot="prepend"><i class="icon icon-password" /></template>
            </el-input>
          </el-form-item>
          <el-form-item
            v-if="!isRegister"
            prop="newPassword"
          >
            <el-input
              v-model="registerForm.newPassword"
              type="password"
              placeholder="请输入英文和数字组成的6-25位密码"
              auto-complete="off"
              readonly
              onfocus="this.removeAttribute('readonly');"
              onblur="this.setAttribute('readonly',true);"
            >
              <template slot="prepend"><i class="icon icon-password" /></template>
            </el-input>
          </el-form-item>
          <el-form-item
            v-if="!isRegister"
            prop="newPassword1"
          >
            <el-input
              v-model="registerForm.newPassword1"
              type="password"
              placeholder="请输入英文和数字组成的6-25位密码"
              auto-complete="off"
              readonly
              onfocus="this.removeAttribute('readonly');"
              onblur="this.setAttribute('readonly',true);"
            >
              <template slot="prepend"><i class="icon icon-password" /></template>
            </el-input>
          </el-form-item>
          <p
            v-if="isRegister"
            class="check"
          >
            <el-checkbox v-model="checked">我已阅读并接受 <router-link to="expressServiceProtocol">《全国快递服务协议》</router-link>
            </el-checkbox>
          </p>
          <el-form-item>
            <el-button
              v-if="!isRegister"
              class="submit"
              @click.native.prevent="handleReset"
            >确定</el-button>
            <el-button
              v-if="isRegister"
              :class="{'mg-submit': isRegister}"
              class="submit"
              @click.native.prevent="handleRegister"
            >注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .login-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url('../../assets/bg.png') no-repeat;

    .el-form-item__error {
      left: 70px;
    }

    .login-box {
      position: relative;
      width: 1112px;
      height: 540px;
      display: flex;
      background-color: #fff;
      border-radius: 4px;

      > img {
        position: absolute;
        width: 110px;
        top: 50px;
        left: 50px;
      }

      .tabs {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-end;
        width: 220px;
        height: 100%;
        font-family: PingFangSC-Semibold;
        background: url('../../assets/bg-left.png') no-repeat;
        cursor: pointer;
        > div {
          width: 180px;
          height: 80px;
          font-size: 18px;
          font-weight: 600;
          line-height: 18px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          margin: 5px 0;
          i {
            display: inline-block;
            width: 18px;
            height: 18px;
            margin: 0 10px 0 20px;
            vertical-align: middle;
          }
        }
        .active {
          color: #0066ff;
          background-color: #fff;
        }
        .staff-active {
          background: url('../../assets/staff_select.png') no-repeat;
          background-size: 100%;
        }
        .admin-active {
          background: url('../../assets/admin_select.png') no-repeat;
          background-size: 100%;
        }
        &_staff {
          i {
            background: url('../../assets/staff.png') no-repeat;
            background-size: 100%;
          }
        }
        &_admin {
          i {
            background: url('../../assets/admin.png') no-repeat;
            background-size: 100%;
          }
        }
      }

      .tabs_content {
        display: flex;
        .tabs_content-left {
          width: 672px;
          padding: 46px 100px 0;
          .content_title-left {
            text-align: center;
            font-size: 28px;
            line-height: 40px;
            font-weight: 700;
            margin: 4px 0 68px 0;
          }
          .type {
            width: 100%;
            display: flex;
            > span {
              display: inline-block;
              flex: 1;
              height: 52px;
              line-height: 52px;
              text-align: center;
              cursor: pointer;
              color: #666;
              border-bottom: 2px solid #ddd;
            }
            .active {
              color: #1776f6;
              border-bottom: 2px solid #1776f6;
            }
          }
          .content-erweima {
            display: flex;
            flex-direction: column;
            align-items: center;
            p {
              margin: 60px 0 25px;
            }

            img {
              width: 200px;
              height: 200px;
            }
          }
          .content-phone {
            .el-form {
              width: 100%;
            }
            .el-input {
              width: 100%;
              height: 52px;
              input {
                height: 52px;
                line-height: 52px;
              }
            }
            .el-form-item {
              margin: 60px 0 0 0;
            }

            .el-form-item__content {
              display: flex;
              justify-content: center;
            }

            p {
              display: flex;
              justify-content: space-between;
              margin: 20px 0 60px;
              span {
                font-size: 16px;
                color: #1776f6;
                cursor: pointer;
              }
            }

            button {
              font-size: 18px;
              width: 420px;
              height: 52px;
              text-align: center;
              color: #fff;
              background-color: #1776f6;
            }
          }
        }
        .tabs_content-right {
          width: 220px;
          padding: 0 25px;
          margin: 30px 0;
          box-sizing: border-box;
          border-left: 1px solid #d8d8d8;
          font-size: 14px;
          p {
            line-height: 20px;
            margin: 0 0 20px 0;
          }

          img {
            margin: 0 0 20px 0;
          }

          .content-tit {
            font-size: 18px;
            color: #333;
            font-weight: 600;
            text-align: center;
            margin: 30px 0 20px;
          }

          .mg-type1 {
            margin: 60px 0 40px;
          }

          .load-hlep {
            a {
              color: #1776f6;
            }
          }

          .mg-type2 {
            margin: 30px 0 40px;
          }
        }
      }
    }

    .register {
      width: 932px;
      height: 580px;
      position: relative;
      background-color: #fff;
      border-radius: 4px;
      padding: 0 230px;
      .back {
        position: absolute;
        left: 30px;
        top: 30px;
        color: #1776f6;
        cursor: pointer;
      }
      .input-reset {
        .el-input {
          width: 327px !important;
        }
      }
      .content-phone {
        p {
          display: flex;
          justify-content: space-between;
          margin: 30px 0 30px;
          span {
            font-size: 16px;
            color: #1776f6;
            cursor: pointer;
          }
        }
        .title {
          width: 100%;
          font-size: 28px;
          line-height: 50px;
          justify-content: center;
        }
        .mg-title {
          margin: 30px 0 0 0;
        }
        .check {
          margin: 20px 0;
          span {
            font-size: 14px;
          }
        }
        .el-form {
          width: 100%;
        }
        .el-input {
          width: 100%;
          height: 52px;
          input {
            height: 52px;
            line-height: 52px;
          }
        }
        .el-form-item {
          margin: 20px 0 0 0;
        }

        .get-code {
          width: 162px;
          margin-left: 20px;
          color: #fff;
          background-color: #1776f6;
        }

        .el-form-item__content {
          display: flex;
          justify-content: center;
        }

        .submit {
          font-size: 18px;
          width: 420px;
          height: 52px;
          text-align: center;
          color: #fff;
          background-color: #1776f6;
          margin-top: 60px;
        }

        .mg-submit {
          margin-top: 0;
        }
      }
    }

    .more-height {
      height: 640px;
    }

    .icon-phone {
      display: inline-block;
      width: 13px;
      height: 18px;
      background: url('../../assets/phone.png') no-repeat;
      background-size: 100%;
    }
    .icon-address {
      display: inline-block;
      width: 13px;
      height: 18px;
      background: url('../../assets/address.png') no-repeat;
      background-size: 100%;
    }
    .icon-password {
      display: inline-block;
      width: 13px;
      height: 16px;
      background: url('../../assets/password.png') no-repeat;
      background-size: 100%;
    }
    .icon-company {
      display: inline-block;
      width: 13px;
      height: 16px;
      background: url('../../assets/company.png') no-repeat;
      background-size: 100%;
    }
    .icon-check {
      display: inline-block;
      width: 13px;
      height: 16px;
      background: url('../../assets/check.png') no-repeat;
      background-size: 100%;
    }
    .icon-back {
      display: inline-block;
      width: 14px;
      height: 14px;
      background: url('../../assets/back.png') no-repeat;
      background-size: 100%;
      vertical-align: middle;
      margin-right: 4px;
    }
  }
</style>

<script>
import qs from 'qs'

export default {
  name: 'Login',
  data() {
    const validatePhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入手机号'))
      } else if (!/^1[3456789]\d{9}$/.test(value)) {
        callback(new Error('手机号码有误，请重填'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入密码'))
      } else if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,25}$/.test(value)) {
        callback(new Error('密码必须包含数字和字母,长度在6到25位之间'))
      } else {
        callback()
      }
    }
    const validatePass1 = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入密码'))
      } else {
        if (this.registerForm.newPassword1 !== '') {
          this.$refs.registerForm.validateField('newPassword1')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请再次输入密码'))
      } else if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,25}$/.test(value)) {
        callback(new Error('密码必须包含数字和字母,长度在6到25位之间'))
      } else if (value !== this.registerForm.newPassword) {
        callback(new Error('两次密码不一致'))
      } else {
        callback()
      }
    }
    return {
      logoImg: false,
      loginForm: {
        username: '',
        password: ''
      },
      registerForm: {
        name: '',
        phone: '',
        validCode: '',
        password1: ''
      },
      loginRules: {
        name: [
          { required: true, message: '请输入企业名称或11位手机号码', trigger: 'blur' }
        ],
        username: [
          { required: true, message: '请输入11位手机号码', trigger: 'blur' }
        ],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      registerRules: {
        name: [{ required: true, message: '请输入公司名称', trigger: 'blur' }],
        shortName: [
          { required: false, message: '请输入公司简称', trigger: 'blur' }
        ],
        mobile: [{ required: true, validator: validatePhone, trigger: 'blur' }],
        code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
        address: [
          { required: true, message: '请输入公司地址', trigger: 'blur' }
        ],
        phone: [{ required: true, validator: validatePhone, trigger: 'blur' }],
        validCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ],
        password1: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        newPassword: [
          { required: true, validator: validatePass1, trigger: 'blur' }
        ],
        newPassword1: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ]
      },
      loading: false,
      redirect: undefined,
      timer: '',
      timer1: '',
      showCount: false,
      count: 59,
      showCountReset: false,
      countReset: 59,
      mode: 1,
      type: 2,
      isRegister: true,
      input2: '',
      url: '',
      checked: false,
      timer2: null,
      from: ''
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    },
    count: {
      handler: function(n) {
        if (n < 0) {
          this.showCount = false
          clearInterval(this.timer)
          this.count = 59
        }
      },
      immediate: true
    },
    countReset: {
      handler: function(n) {
        if (n < 0) {
          this.showCountReset = false
          clearInterval(this.timer1)
          this.countReset = 59
        }
      },
      immediate: true
    },
    mode: {
      handler: function() {
        this.$refs.registerForm && this.$refs.registerForm.clearValidate()
        this.registerForm = {}
        this.$refs.loginForm &&
                    this.$refs.loginForm.password &&
                    this.$refs.loginForm.password.clearValidate()
        this.loginForm.password = ''
        if (this.$refs.loginForm) {
          this.$refs.loginForm.clearValidate()
        }
      }
    }
  },
  mounted() {
  },
  beforeDestroy() {
    this.timer2 = null
  },
  methods: {
    getCode() {
      const value = this.registerForm.phone
      if (this.showCount) {
        this.$message.error({
          message: `请在${this.count}S后再次获取`,
          duration: 2000
        })
      } else {
        if (!value) {
          this.$message.error({
            message: '请输入手机号',
            duration: 2000
          })
        } else if (!/^1[3456789]\d{9}$/.test(value)) {
          this.$message.error({
            message: '手机号码有误，请重填',
            duration: 2000
          })
        } else {
          const param = {
            mobile: value
          }
          const that = this
          this.$api.getCode(param).then(res => {
            if (res.data.code === 200) {
              this.showCount = true
              this.timer = setInterval(function() {
                that.count--
              }, 1000)
            }
          })
        }
      }
    },
    getResetCode() {
      const value = this.registerForm.mobile
      if (this.showCountReset) {
        this.$message.error({
          message: `请在${this.countReset}S后再次获取`,
          duration: 2000
        })
      } else {
        if (!value) {
          this.$message.error({
            message: '请输入手机号',
            duration: 2000
          })
        } else if (!/^1[3456789]\d{9}$/.test(value)) {
          this.$message.error({
            message: '手机号码有误，请重填',
            duration: 2000
          })
        } else {
          const param = {
            mobile: value
          }
          this.showCountReset = true
          const that = this
          this.timer1 = setInterval(function() {
            that.countReset--
          }, 1000)
          this.$api.getResetCode(param)
        }
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          const form = this.loginForm
          const params = {
            username: this.mode === 1 ? form.username : form.name,
            password: this.$options.filters.encryption(form.password),
            code: form.randomStr,
            grant_type: 'password',
            scope: 'server'
          }
          this.loading = true
          this.$store
            .dispatch('Login', qs.stringify(params))
            .then(res => {
              this.loading = false
              if (res.data.code === 200) {
                if (this.redirect) {
                  if (this.redirect.indexOf('detail') > -1) {
                    this.$router.push('/')
                  } else {
                    this.$router.push({ path: this.redirect || '/' })
                  }
                } else {
                  this.$router.push('/')
                }
              }
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          return false
        }
      })
    },
    handleRegister() {
      if (this.checked) {
        this.$refs.registerForm.validate(valid => {
          if (valid) {
            this.$api.register(this.registerForm).then(res => {
              if (res.data) {
                if (this.from === 'admin') {
                  this.mode = 2
                } else {
                  this.mode = 1
                  this.type = 2
                }
                this.loginForm.username = this.registerForm.phone
              } else {
                this.$message.error({
                  message: res.data.message,
                  duration: 2000
                })
              }
            })
          } else {
            return false
          }
        })
      } else {
        this.$message.error({
          message: '请勾选全国快递服务协议',
          duration: 2000
        })
      }
    },
    handleReset() {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          this.$api.updatePwd(this.registerForm).then(res => {
            if (res.data.code === 200) {
              this.$message.success({
                message: '修改成功',
                duration: 2000
              })
              if (this.from === 'admin') {
                this.mode = 2
              } else {
                this.mode = 1
              }
              this.loginForm.username = this.registerForm.mobile
            } else {
              this.$message.error({
                message: res.data.message,
                duration: 2000
              })
            }
          })
        }
      })
    }
  }
}
</script>
