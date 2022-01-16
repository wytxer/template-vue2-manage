<template>
  <span>
    <a-button type="danger" size="small" icon="bug" class="MR16" @click.native="visible = true"></a-button>

    <a-modal width="768px" title="错误日志" :visible.sync="visible" @cancel="visible = false">
      <div slot="footer">
        <a-button type="primary" icon="delete" @click="clearAll">全部删除</a-button>
      </div>
      <template v-if="logs.length">
        <div v-for="(item, index) in logs" :key="index" class="error-list-item">
          <ak-text-tag color="warning" tagText="报错信息" :text="item.error.message" />
          <ak-text-tag color="warning" tagText="报错组件" class="MT10" :text="`${item.tag}（${item.info}）`" />
          <ak-text-tag color="success" tagText="报错页面" class="MT10" :text="item.url" />
          <div class="FB MT10">
            <a-tag style="height: 22px">堆栈信息</a-tag>
            <div class="FB1">{{ item.error.stack }}</div>
          </div>
        </div>
      </template>
      <a-list v-else :data-source="[]" />
    </a-modal>
  </span>
</template>

<script>
/**
 * 全局的错误日志组件，开启全局错误捕获后展示
 */
import { mapState } from 'vuex'

export default {
  name: 'modal-error',
  data () {
    return {
      visible: false
    }
  },
  computed: {
    ...mapState({
      logs: state => state.errorLog.logs
    })
  },
  methods: {
    clearAll () {
      this.visible = false
      this.$store.dispatch('clearErrorLog')
    }
  }
}
</script>

<style lang="less" scoped>
.error-list-item {
  transition: all 0.25s;
  padding: 8px;
  border-radius: 4px;
  &:hover {
    background-color: @primary-1;
  }
}
</style>
