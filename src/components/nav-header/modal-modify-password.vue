<template>
  <a-modal okText="确认修改" class="ak-pb0" destroyOnClose :width="width" :visible="visible" :title="title" :confirmLoading="loading" :after-close="onClosed" @cancel="onHideModal" @ok="onReset">
    <a-form-model :model="values" :rules="rules" ref="form" layout="vertical" class="ak-form" :colon="false">
      <a-form-model-item prop="oldPassword" label="原密码">
        <a-input v-model="values.oldPassword" type="password" placeholder="原密码">
          <a-icon slot="prefix" type="user" class="C999" />
        </a-input>
      </a-form-model-item>

      <a-form-model-item prop="newPassword" label="新密码">
        <a-input v-model="values.newPassword" type="password" placeholder="新密码">
          <a-icon slot="prefix" type="lock" class="C999" />
        </a-input>
      </a-form-model-item>

      <a-form-model-item prop="confirmPassword" label="确认密码">
        <a-input v-model="values.confirmPassword" type="password" placeholder="确认密码">
          <a-icon slot="prefix" type="lock" class="C999" />
        </a-input>
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>
/**
 * 修改密码弹框组件，使用入口在登录后的右上角
 */
import { modifyPassword } from '@/api/user'

export default {
  data () {
    return {
      width: 560,
      visible: false,
      title: '修改密码',
      // 提交控制
      loading: false,
      // 表单值
      values: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      // 校验规则
      rules: {
        oldPassword: [{
          validator: (rule, value, callback) => {
            if (!value) {
              return callback(new Error('请输入密码'))
            }
            return callback()
          }
        }],
        newPassword: [{
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
            if (this.values.newPassword !== value) {
              return callback(new Error('两次密码不一致'))
            }
            return callback()
          }
        }]
      }
    }
  },
  methods: {
    showModal () {
      this.visible = true
    },
    onHideModal () {
      this.visible = false
    },
    onClosed () {
      if (!this.visible) {
        this.values = this.$options.data.call(this).values
      }
    },
    onReset () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          const params = {
            ...this.values
          }
          modifyPassword(params)
            .then(() => {
              this.$message.success('密码修改成功，请重新登录')
              this.onHideModal()
              setTimeout(() => {
                location.href = `${process.env.VUE_APP_ROUTER_BASE_URL}user/login`
              }, 1000)
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
    }
  }
}
</script>
