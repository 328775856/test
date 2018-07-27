<template>
  <div class="admin">
    <Button type="primary" @click="modal1 = true">Display dialog box</Button>
    <Modal
      v-model="modal1"
      title="Common Modal dialog box title"
      @on-ok="ok"
      @on-cancel="cancel">
      <p>Content of dialog</p>
      <p>Content of dialog</p>
      <p>Content of dialog</p>
    </Modal>
  </div>
</template>
<script>
  import {Modal, Button} from 'iview'

  export default {
    name: 'Admin',
    components: {
      Modal, Button
    },
    data() {
      return {
        modal1: false
      }
    },
    methods: {
      ok() {
        this.$Message.info('Clicked ok');
        this.api.get('http://api.map.baidu.com/telematics/v3/weather?location=%E5%8C%97%E4%BA%AC&output=json&ak=EGgzZ22dsboWQEcPQ6KDQLknQd3YkkkP').then((res) => {
            alert(res.data)
        })
      },
      cancel() {
        this.$Message.info('Clicked cancel');
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
