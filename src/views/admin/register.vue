<template>
  <div class="page-register">
    <admin-header title="注册" />
    <a-steps :current="currentStep" style="width: 592px">
      <a-step title="手机号验证" />
      <a-step title="设置密码" />
      <a-step title="完成" />
    </a-steps>

    <div class="admin-form">
      <a-form-model v-show="currentStep < 2" :model="values" :rules="rules" ref="form">
        <div v-show="currentStep === 0">
          <a-form-model-item prop="user">
            <a-input :size="size" v-model="values.user" placeholder="手机号">
              <a-icon slot="prefix" type="user" class="C999" />
            </a-input>
          </a-form-model-item>

          <a-form-model-item prop="imageCode" ref="imageCode">
            <div class="FB FBJC-SB">
              <a-input :size="size" v-model="values.imageCode" @change="$refs.imageCode.onFieldChange()" placeholder="图形验证码" class="FB1">
                <a-icon slot="prefix" type="safety-certificate" class="C999" />
              </a-input>
              <a-tooltip title="看不清？换一张">
                <div class="img-code" @click="onUpdateImageCode">
                  <img class="img-code-url" :src="imageCodeUrl" />
                </div>
              </a-tooltip>
            </div>
          </a-form-model-item>

          <a-form-model-item prop="smsCode" ref="smsCode">
            <div class="FB FBJC-SB">
              <a-input :size="size" v-model="values.smsCode" @change="$refs.smsCode.onFieldChange()" placeholder="短信验证码" class="FB1">
                <a-icon slot="prefix" type="mail" class="C999" />
              </a-input>
              <a-button :size="size" :disabled="!!countdown" class="sms-code" @click="onGetSmsCode">
                {{ countdown ? `${countdown}s` : '获取验证码' }}
              </a-button>
            </div>
          </a-form-model-item>

          <a-form-model-item class="TAC">
            <a-button :size="size" @click="onGotoNextTwo" type="primary" class="W100">
              去设置密码
            </a-button>
          </a-form-model-item>
        </div>

        <div v-show="currentStep === 1">
          <a-popover :trigger="['focus']" :getPopupContainer="trigger => trigger.parentElement" v-model="passwordLevelChecked" placement="rightTop">
            <template slot="content">
              <div class="password-tips">
                <div :class="`password-tips-${passwordLevelClassName}`">
                  强度：{{ passwordLevelName }}
                </div>
                <a-progress :percent="passwordPercent" :showInfo="false" :strokeColor="passwordLevelColor" />
                <div class="MT10">
                  密码必须是 8 至 16 位大小写字母数字下划线特殊字符组合。
                </div>
              </div>
            </template>
            <a-form-model-item prop="password">
              <a-input :size="size" v-model="values.password" @click="onPasswordClick" type="password" placeholder="新密码">
                <a-icon slot="prefix" type="lock" class="C999" />
              </a-input>
            </a-form-model-item>
          </a-popover>

          <a-form-model-item prop="confirmPassword">
            <a-input :size="size" v-model="values.confirmPassword" type="password" placeholder="确认密码">
              <a-icon slot="prefix" type="lock" class="C999" />
            </a-input>
          </a-form-model-item>

          <a-form-model-item class="TAC">
            <a-button :size="size" :loading="loading" @click="onRegister" type="primary" class="W100">
              注册
            </a-button>
          </a-form-model-item>
        </div>

        <a-form-model-item>
          <div style="overflow: hidden">
            <a v-show="currentStep === 1" @click="onGoBackOne" href="javascript:;" class="C-OK" style="float: left">
              上一步
            </a>
            <router-link to="/admin/login" style="float: right">
              使用已有账户登录
            </router-link>
          </div>
        </a-form-model-item>
      </a-form-model>

      <div v-show="currentStep === 2" class="register-success">
        <span class="ok-icon">
          <a-icon type="check" />
        </span>
        <div class="ok-tips">注册成功</div>
        <router-link to="/admin/login">
          <a-button type="primary" :size="size">
            马上登录
          </a-button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api'
import { getSmsCode, register } from '@/api/user'
import AdminHeader from './modules/admin-header'

const levelNames = {
  0: '低',
  1: '低',
  2: '中',
  3: '强'
}
const levelClassNames = {
  0: 'error',
  1: 'error',
  2: 'warning',
  3: 'success'
}
const levelColors = {
  0: '#ff0000',
  1: '#ff0000',
  2: '#ff7e05',
  3: '#52c41a'
}

export default {
  components: {
    AdminHeader
  },
  data () {
    return {
      // 提交控制
      loading: false,
      // 表单尺寸，账户模块的表单都统一使用大号的
      size: 'large',
      // 表单值
      values: {
        user: '',
        imageCode: '',
        smsCode: '',
        password: '',
        confirmPassword: ''
      },
      // 生成一个唯一标识，用来刷新图形验证码
      id: this.$utils.createId(),
      // 倒计时
      countdown: 0,
      // 当前所在的步骤
      currentStep: 0,
      // 密码强度
      passwordLevel: 0,
      // 是否显示密码强度提示
      passwordLevelChecked: false,
      // 密码强度进度条
      passwordPercent: 10,
      // 校验规则
      rules: {
        user: [{
          validator: (rule, value, callback) => {
            if (!value) {
              return callback(new Error('请输入手机号'))
            }
            if (!this.$utils.testMobile(value)) {
              return callback(new Error('手机号格式错误'))
            }
            return callback()
          }
        }],
        imageCode: [{
          validator: (rule, value, callback) => {
            if (!value) {
              return callback(new Error('请输入图形验证码'))
            }
            if (!/^\w{4}$/.test(value)) {
              return callback(new Error('图形验证码必须是 4 位大小写字母数字组合'))
            }
            return callback()
          }
        }],
        smsCode: [{
          validator: (rule, value, callback) => {
            if (!value) {
              return callback(new Error('请输入短信验证码'))
            }
            if (!/^\d{6}$/.test(value)) {
              return callback(new Error('短信验证码必须是 6 位数字'))
            }
            return callback()
          }
        }],
        password: [{
          validator: (rule, value, callback) => {
            let level = 0

            // 判断这个字符串中有没有数字
            if (/[0-9]/.test(value)) {
              level += 1
            }
            // 判断字符串中有没有字母
            if (/[a-zA-Z]/.test(value)) {
              level += 1
            }
            // 判断字符串中有没有特殊符号
            if (/[`~!@#$%^&*()_+<>?:"{},.\\/;'[\]]/.test(value)) {
              level += 1
            }
            this.passwordLevel = level
            if (level === 0) {
              this.passwordPercent = 10
            } else if (level >= 3) {
              this.passwordPercent = 100
            } else {
              this.passwordPercent = level * 30
            }

            if (!value) {
              return callback(new Error('请输入密码'))
            }
            if (!this.$utils.testPassword(value)) {
              return callback(new Error('密码必须是 8 至 16 位大小写字母数字下划线特殊字符组合'))
            }
            return callback()
          }
        }],
        confirmPassword: [{
          validator: (rule, value, callback) => {
            if (!value) {
              return callback(new Error('请输入密码'))
            }
            if (!this.$utils.testPassword(value)) {
              return callback(new Error('密码必须是 8 至 16 位大小写字母数字下划线特殊字符组合'))
            }
            if (this.values.password !== value) {
              return callback(new Error('新旧密码不一致'))
            }
            return callback()
          }
        }]
      }
    }
  },
  computed: {
    imageCodeUrl () {
      return `${api.imageCode}?secret=${this.id}&action=3`
    },
    passwordLevelClassName () {
      return levelClassNames[this.passwordLevel]
    },
    passwordLevelName () {
      return levelNames[this.passwordLevel]
    },
    passwordLevelColor () {
      return levelColors[this.passwordLevel]
    }
  },
  methods: {
    // 去设置密码
    onGotoNextTwo () {
      let error = null
      this.$refs.form.validateField(
        ['user', 'imageCode', 'smsCode'], tips => (error = tips)
      )
      if (!error) {
        this.currentStep = 1
      }
    },
    // 回到第一步
    onGoBackOne () {
      this.currentStep = 0
    },
    // 到第三步
    onGotoNextThree () {
      this.currentStep = 2
    },
    // 注册
    onRegister () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.passwordLevelChecked = false
          this.loading = true
          const { user, smsCode, password } = this.values
          register({
            user, smsCode, password: this.$utils.encryptPassword(password)
          })
            .then(() => {
              this.$message.success('注册成功')
              this.onGotoNextThree()
              this.loading = false
            })
            .catch(e => {
              this.$message.error(e.message || '服务器异常')
            })
            .finally(() => {
              this.loading = false
            })
        } else {
          return false
        }
      })
    },
    // 获取短信验证码
    onGetSmsCode () {
      let error = null
      // validateField() 方法设置多个字段的话，回调方法也会调用多次，请求不能直接放到回调里面
      this.$refs.form.validateField(['user', 'imageCode'], tips => (error = tips))
      if (!error) {
        const { user, imageCode } = this.values
        getSmsCode({
          secret: this.id, user, imageCode
        })
          .then(() => {
            this.$message.success('验证码发送成功，请注意查收')
            this.startCountdown()
          })
          .catch(e => {
            this.$message.error(e.message || '验证码获取失败')
            this.onUpdateImageCode()
          })
      }
    },
    // 点击了密码框弹出密码强度提示
    onPasswordClick () {
      if (!this.passwordLevelChecked) {
        this.passwordLevelChecked = true
      }
    },
    // 刷新图形验证码
    onUpdateImageCode () {
      this.id = this.$utils.createId()
    },
    // 开始倒计时
    startCountdown () {
      this.countdown = 60
      this.timer = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown -= 1
        } else {
          clearInterval(this.timer)
          this.timer = null
        }
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
.page-register {
  :deep(.admin-header-wrap) {
    padding-bottom: 80px;
  }
  .admin-form {
    width: 410px;
    margin: 0 auto;
    padding: 48px 0 100px;
  }
  .img-code {
    cursor: pointer;
    width: 112px;
    height: 38px;
    border: 1px solid #d9d9d9;
    margin-left: 10px;
    border-radius: 4px;
    &-url {
      width: 100%;
      height: 100%;
      vertical-align: top;
    }
  }
  .sms-code {
    margin-left: 10px;
    width: 112px;
  }
  .register-success {
    text-align: center;
    .ok-icon {
      display: inline-block;
      width: 66px;
      height: 64px;
      line-height: 48px;
      padding: 8px;
      text-align: center;
      background-color: @success-color;
      border-radius: 50%;
      color: #fff;
      font-size: 48px;
    }
    .ok-tips {
      padding: 32px 0;
      font-size: 20px;
      font-weight: bold;
    }
  }
  .password-tips {
    width: 260px;
    &-error {
      color: #ff0000;
    }
    &-warning {
      color: #ff7e05;
    }
    &-success {
      color: #52c41a;
    }
  }
}
</style>
