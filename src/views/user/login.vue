<template>
  <div class="page-login">
    <user-header />
    <div :class="['error-tips', {'is-active': !!message}]">
      <a-alert v-if="message" :message="message" banner closable @close="onAlertClose" type="error" />
    </div>
    <a-form-model ref="form" :model="values" :rules="rules">
      <a-form-model-item prop="user">
        <a-input :size="size" v-model="values.user" placeholder="手机号">
          <a-icon slot="prefix" type="user" class="C999" />
        </a-input>

      </a-form-model-item>
      <a-form-model-item prop="password">
        <a-input :size="size" v-model="values.password" type="password" placeholder="密码">
          <a-icon slot="prefix" type="lock" class="C999" />
        </a-input>
      </a-form-model-item>

      <a-form-model-item prop="auto">
        <a-checkbox v-model="values.auto">自动登录</a-checkbox>
      </a-form-model-item>

      <a-form-model-item class="TAC">
        <a-button :size="size" :loading="loading" @click="onLogin" type="primary" class="W100">
          登录
        </a-button>
      </a-form-model-item>

      <a-form-model-item>
        <div class="FB FBJC-SB">
          <router-link to="/user/reset-password">
            忘记密码
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
import { mapActions } from 'vuex'
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
        password: '',
        auto: true
      },
      // 接口返回的错误提示
      message: '',
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
        password: [{
          validator: (rule, value, callback) => {
            if (!value) {
              return callback(new Error('请输入密码'))
            }
            // 密码强度校验
            if (!this.$utils.testPassword(value)) {
              return callback(new Error('密码必须是 8 至 16 位大小写字母数字下划线组合'))
            }
            return callback()
          }
        }]
      }
    }
  },
  methods: {
    ...mapActions(['login']),
    onLogin () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          this.login(this.values)
            .then(() => {
              const { query } = this.$route
              this.loading = false
              this.$router.push(query.redirect || '/')
            })
            .catch(e => {
              this.message = e.message || '账号或密码错误'
            })
            .finally(() => {
              this.loading = false
            })
        } else {
          return false
        }
      })
    },
    onAlertClose () {
      this.message = ''
    }
  }
}
</script>
<style lang="less" scoped>
.page-login {
  width: 100%;
  .error-tips {
    margin: 33px 0 10px;
    height: 37px;
    opacity: 0;
    transition: opacity 0.25s ease-in;
    &.is-active {
      opacity: 1;
    }
  }
}
</style>
