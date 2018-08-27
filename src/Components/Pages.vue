<template>
  <div class="page">
    <Page ref="page" :total="total" :page-size="10" :current="pageNo" @on-change="change"/>
  </div>
</template>

<script>
  import {Page} from 'iview'

  export default {
    name: "Pages",
    components: {Page},
    props: ['total', 'pageNo'],
    data() {
      return {
      }
    },
    created() {
    },
    methods: {
      change(e) {
        this.axios.get(`/get${this.$route.name}Info`, {params: {pageNo: e}})
          .then((res) => {
            // console.log(res)
            this.$emit('callback', res.data.data)
            this.$emit('callbackNum', e)
            //  console.log(this.total)
            this.loading = false
          })
      }
    }
  }
</script>

<style scoped>
  .page {
    width: 90%;
    margin-top: 20px;
  }
</style>
