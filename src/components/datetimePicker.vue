<template>
  <datetime :title="title" class="" @on-change="dateChange">
  </datetime>
</template>

<script>
import { Datetime } from 'vux'
export default {
  props: ['title'],

  components: {
    Datetime
  },
  methods: {
    dateChange(val) {
      this.$emit('dateChange',val)
    }
  }
}
</script>

<style scoped>

</style>
