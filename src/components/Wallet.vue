<template>
<div class="wallet">
    <v-flex xs12 sm6 offset-sm3>
    <v-card>
      <v-container fluid>
        <v-card flat>
          <v-card-actions>
            <v-card-title><b>残高</b></v-card-title>
            <v-spacer />
            <v-btn fab small flat @click="getAccount()" :loading="isLoading"><v-icon>cached</v-icon></v-btn>
          </v-card-actions>
          <v-card-text>{{ wallet.balance }} eth</v-card-text>
          <v-card-title><b>送金先アドレス</b></v-card-title>
          <v-card-text>{{ wallet.address }}</v-card-text>
          <v-card flat>
            <qriously v-model="qrJson" :size="qrSize" />
          </v-card>
        </v-card>
        <v-card flat>
          <div v-for="(item, index) in validation" :key="index" class="errorLabel">
            <div v-if="item!==true">{{ item }}</div>
          </div>
          <v-card-title><b>送金</b></v-card-title>
            <v-text-field
              label="送金先"
              v-model="toAddr"
              :counter="42"
              required
              placeholder="例. 0x26d88305D5f16f5763E4bAcB15e106Dd22014F16"
            ></v-text-field>
            <v-text-field
              label="ETH"
              v-model="toAmount"
              type="number"
              required
            ></v-text-field>
          <v-flex>
            <v-btn
              color="blue"
              class="white--text"
              @click="tapSend()"
              :loading="isLoading"
              :disabled="isLoading">送金</v-btn>
          </v-flex>
        </v-card>
      </v-container>
    </v-card>
    </v-flex>
</div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'
import WalletModel from '@/model/WalletModel'

@Component
export default class Wallet extends Vue {
    private isLoading: boolean = false
    private wallet: WalletModel = new WalletModel()
    private qrSize: number = 200
    private toAmount: number = 0
    private toAddr: string = ''
    private qrJson: string = ''
    private validation: any[] = []
    private rules: any = {
      senderAddrLimit: (value: string) => (value && (value.length === 42)) || '送金先アドレスは0x含めた42文字です。',
      senderAddrInput: (value: string) => {
        const pattern = /^[a-zA-Z0-9-]+$/
        return pattern.test(value) || '送金先の入力が不正です'
      },
      amountLimit: (value: number) => (value >= 0) || '数量を入力してください',
      amountInput: (value: string) => {
        const pattern = /^[0-9.]+$/
        return (pattern.test(value) && !isNaN(Number(value))) || '数量の入力が不正です'
      },
      messageRules: (value: string) => (value.length <= 1024) || 'メッセージの最大文字数が超えています。',
    }

    @Watch('wallet.address')
    private onValueChange(newValue: string, oldValue: string): void {
      console.log(`watch: ${newValue}, ${oldValue}`)
      this.qrJson = 'ethereum:\n' + newValue
    }

    private mounted() {
      console.log('hello')
      Vue.prototype.$toast('Hello eth wallet')
    }

    private async getAccount() {
      this.isLoading = true
      await this.wallet.getAccount()
      this.isLoading = false
    }

    private async tapSend() {
      if (this.isValidation() === true) {
        console.log('OK')
        this.isLoading = true
        try {
          const result = await this.wallet.sendEth(this.toAddr, this.toAmount)
          const message = `送金しました\n${result.transactionHash}`
          Vue.prototype.$toast(message)
        } catch (error) {
          console.error(error)
          Vue.prototype.$toast(error)
        }
        this.isLoading = false
      }
      console.log(this.isValidation())
    }

    private isValidation(): boolean {
      this.validation = []
      this.validation.push(this.rules.senderAddrLimit(this.toAddr))
      this.validation.push(this.rules.senderAddrInput(this.toAddr))
      this.validation.push(this.rules.amountLimit(this.toAmount))
      this.validation.push(this.rules.amountInput(`${this.toAmount}`))
      const error: any[] = this.validation.filter((obj: any) => obj !== true )
      return (error.length === 0) ? true : false
    }
}
</script>
<style scoped>
.wallet {
  word-break: break-all;
}
.errorLabel {
  color: red;
}
</style>
