import LayoutBlock from '@/layouts/block'

export default [{
  path: 'modal',
  component: LayoutBlock,
  meta: {
    title: '弹框',
    icon: 'alert'
  },
  children: [{
    path: 'modal-common',
    component: () => import('@/views/template/src/modal/modal.vue'),
    meta: {
      title: '弹框'
    }
  }, {
    path: 'modal-drawer',
    component: () => import('@/views/template/src/drawer/drawer.vue'),
    meta: {
      title: '抽屉'
    }
  }]
}, {
  path: 'table',
  component: LayoutBlock,
  meta: {
    title: '列表',
    icon: 'table'
  },
  children: [{
    path: 'table-base',
    component: () => import('@/views/template/src/table/table-base.vue'),
    meta: {
      title: '简单列表'
    }
  }, {
    path: 'table-middle',
    component: () => import('@/views/template/src/table/table-middle.vue'),
    meta: {
      title: '中等列表'
    }
  }, {
    path: 'table-complex',
    component: () => import('@/views/template/src/table/table-complex.vue'),
    meta: {
      title: '复杂列表'
    }
  }, {
    path: 'table-tabs-nav',
    component: () => import('@/views/template/src/table/table-tabs-nav.vue'),
    meta: {
      title: '卡片列表'
    }
  }, {
    path: 'table-drag',
    component: () => import('@/views/template/src/table/table-drag.vue'),
    meta: {
      title: '拖拽列表'
    }
  }]
}, {
  path: 'detail',
  component: LayoutBlock,
  meta: {
    title: '详情',
    icon: 'profile'
  },
  children: [{
    path: 'base',
    component: () => import('@/views/template/src/detail/detail-base.vue'),
    meta: {
      title: '基础详情'
    }
  }, {
    path: 'common',
    component: () => import('@/views/template/src/detail/detail-common.vue'),
    meta: {
      title: '普通详情'
    }
  }]
}, {
  path: 'form',
  component: LayoutBlock,
  meta: {
    title: '表单',
    icon: 'form'
  },
  children: [
    {
      path: 'single',
      component: () => import('@/views/template/src/form/form-single.vue'),
      meta: {
        title: '单列表单'
      }
    }, {
      path: 'horizontal',
      component: () => import('@/views/template/src/form/form-horizontal.vue'),
      meta: {
        title: '单列左对齐表单'
      }
    }, {
      path: 'double',
      component: () => import('@/views/template/src/form/form-double.vue'),
      meta: {
        title: '双列表单'
      }
    }, {
      path: 'normal',
      component: () => import('@/views/template/src/form/form-normal.vue'),
      meta: {
        title: '三列表单'
      }
    }, {
      path: 'complex',
      component: () => import('@/views/template/src/form/form-complex.vue'),
      meta: {
        title: '复杂表单'
      }
    }, {
      path: 'step',
      component: () => import('@/views/template/src/form/form-step.vue'),
      meta: {
        title: '分步表单'
      }
    }]
}, {
  path: 'components',
  component: () => import('@/views/template/src/components.vue'),
  meta: {
    title: '模板组件',
    icon: 'build'
  }
}]
