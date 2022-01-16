<template>
  <div class="user-login-view user-view">
    <user-header title="重置密码" />
    <a-form-model :model="values" :rules="rules" ref="form">
      <a-form-model-item prop="user">
        <a-input :size="size" v-model="values.user" placeholder="手机号">
          <a-icon slot="prefix" type="user" class="C-999" />
        </a-input>
      </a-form-model-item>

      <a-form-model-item prop="imageCode" ref="imageCode">
        <div class="FB FBJC-SB">
          <a-input :size="size" v-model="values.imageCode" @change="$refs.imageCode.onFieldChange()" placeholder="图形验证码" class="FB1">
            <a-icon slot="prefix" type="safety-certificate" class="C-999" />
          </a-input>
          <a-tooltip title="看不清？换一张">
            <div class="img-code" @click="onUpdateImageCode">
              <img :src="imageCodeUrl" />
            </div>
          </a-tooltip>
        </div>
      </a-form-model-item>

      <a-form-model-item prop="smsCode" ref="smsCode">
        <div class="FB FBJC-SB">
          <a-input :size="size" v-model="values.smsCode" @change="$refs.smsCode.onFieldChange()" placeholder="短信验证码" class="FB1">
            <a-icon slot="prefix" type="mail" class="C-999" />
          </a-input>
          <a-button :size="size" :disabled="!!countdown" class="sms-code" @click="onGetSmsCode">
            {{ countdown ? `${countdown}s` : '获取验证码' }}
          </a-button>
        </div>
      </a-form-model-item>

      <a-form-model-item prop="password">
        <a-input :size="size" v-model="values.password" type="password" placeholder="新密码">
          <a-icon slot="prefix" type="lock" class="C-999" />
        </a-input>
      </a-form-model-item>
      <a-form-model-item prop="confirmPassword">
        <a-input :size="size" v-model="values.confirmPassword" type="password" placeholder="确认密码">
          <a-icon slot="prefix" type="lock" class="C-999" />
        </a-input>
      </a-form-model-item>

      <a-form-model-item class="TAC">
        <a-button :size="size" :loading="loading" @click="onReset" type="primary" class="W100">
          重置
        </a-button>
      </a-form-model-item>

      <a-form-model-item>
        <div class="FB FBJC-SB">
          <router-link to="/user/login">
            去登陆
          </router-link>
          <router-link to="/user/register">
            注册账户
          </router-link>
        </div>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import api from '@/api'
import { getSmsCode, resetPassword } from '@/api/user'
import UserHeader from './modules/user-header'

export default {
  components: {
    UserHeader
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
    }
  },
  methods: {
    onReset () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          const { user, smsCode, password } = this.values
          resetPassword({
            user, smsCode, password
          })
            .then(() => {
              this.$message.success('密码重置成功，请重新登录')
              this.$router.push('/user/login')
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
          .then(res => {
            this.$message.success('验证码发送成功，请注意查收')
            this.startCountdown()
          })
          .catch(e => {
            this.$message.error(e.message || '验证码获取失败')
            this.onUpdateImageCode()
          })
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
.user-login-view {
  .user-header-wrap {
    padding-bottom: 80px;
  }
  .img-code {
    cursor: pointer;
    width: 112px;
    height: 38px;
    border: 1px solid #d9d9d9;
    margin-left: 10px;
    border-radius: 4px;
    img {
      width: 100%;
      height: 100%;
      vertical-align: top;
    }
  }
  .sms-code {
    margin-left: 10px;
    width: 112px;
  }
}
</style>
