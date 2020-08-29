<template>
  <v-app>
    <header>
      <span>{{ title }} </span>
    </header>
    <main>   
    <div>
      <b-tabs content-class="mt-3">
        <b-tab title="Web Wallet" active><Wallet/></b-tab>
        <b-tab title="PiggyBanks Manager"> <PiggyBank/></b-tab>
      </b-tabs>
    </div> 
     <!--  <router-view></router-view> -->
    </main>
  </v-app>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Wallet from '@/components/Wallet.vue'; // @ is an alias to /src
import PiggyBank from '@/components/PiggyBank.vue';

@Component({
  components: {
    Wallet,
    PiggyBank,
  },
})
export default class App extends Vue {
  private title = 'Ethereum Piggy Bank'
}
</script>
<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  body {
    margin: 0;
  }
  main {
    text-align: center;
    margin-top: 40px;
    margin-bottom: 40px;
  }
  header {
    margin: 0;
    height: 56px;
    padding: 0 16px 0 24px;
    background-color: #3c3c3d;
    color: #fff;
    span {
      display: block;
      position: relative;
      font-size: 22px;
      line-height: 1;
      letter-spacing: 0.02em;
      font-weight: 700;
      box-sizing: border-box;
      padding-top: 16px;
      text-align: left;
    }
  }
</style>
