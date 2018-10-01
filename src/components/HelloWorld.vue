<template>
  <div class="hello">
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import WalletModel from '@/model/WalletModel'

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string
  private wallet?: WalletModel

  private created() {
    this.wallet = new WalletModel()
  }
  
  private mounted () {
    // const fromAddress = ''
    // const privateKey = ''
    // const toAddress = ''
    // const eth = new EthWrapper()
    // eth.sendEthWithSign(fromAddress, toAddress, privateKey, 0.1)
    // eth.sendEth(fromAddress, toAddress, 0.1, 'message')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
h3
  margin 40px 0 0

ul
  list-style-type none
  padding 0

li
  display inline-block
  margin 0 10px

a
  color #42b983
</style>
