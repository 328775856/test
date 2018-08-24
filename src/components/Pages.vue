<template>
  <div class="page">
    <Page :total="total" :current="pageNo" @on-change="change($event)"/>
  </div>
</template>

<script>
  import {Page} from 'iview'

  export default {
    name: "Pages",
    components: {Page},
    props: ['total', 'pageNo'],
    data() {
      return {}
    },
    methods: {
      change(e) {
        this.axios.get('/getUserInfo', {params: {pageNo: e}})
          .then((res) => {
            // console.log(res)
            this.$emit('callback', res.data.data)
            this.total = ~~(res.data.total)
            // console.log(this.total)
            this.loading = false
          })
      }
    }
  }
</script>

<style scoped>
.page{
  width: 90%;
  margin-top: 20px;
}
</style>
