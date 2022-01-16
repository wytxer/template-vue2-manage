<template>
  <ak-container card class="common-modal-view">
    <a-button @click="$refs.drawerEmpty.showModal()">空抽屉</a-button>
    <a-button @click="$refs.drawerForm.showModal()" class="ML16">表单抽屉</a-button>

    <drawer-empty ref="drawerEmpty" />
    <drawer-form ref="drawerForm" />
  </ak-container>
</template>

<script>
import DrawerEmpty from './drawer-empty'
import DrawerForm from './drawer-form'

export default {
  components: {
    DrawerEmpty,
    DrawerForm
  }
}
</script>
