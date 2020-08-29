<template>
  <div class="wallet">
    <v-flex xs12 sm6 offset-sm3>
    <v-card>
      <v-container fluid>
      <div class="b-row">
        <div>
          <h1>
            Create a Piggy Bank
            <span></span>  
          </h1>
          <br>
          <div>
           <v-text-field
              label="Name for your Piggy bank:"
              v-model="title"
              required
              placeholder="Name"
            ></v-text-field>
          </div>
          <div>
            <v-text-field
              label="Initial deposit for your piggy (can be 0):"
              v-model="startBalance"
              required
              placeholder="Number of Eths"
            ></v-text-field>
          </div>
        </div>
      </div>
      <div class="b-row">
        <div>
          <label for="Description">
            Description
          </label>
          <br>
          <b-form-textarea
            id="Description"
            v-model="description"
            rows="5"
            placeholder="Enter a description or a goal for your piggy bank"
          />
        </div>
      </div>
      <hr>
      <div class="b-row">
        <div>
          <b-button
            :variant="'primary'"
            @click="createPiggyBank"
          >
            {{ createStatus }}
          </b-button>
          <img
            v-show="isLoad"
            src="https://media.giphy.com/media/2A6xoqXc9qML9gzBUE/giphy.gif"
          >
        </div>
      </div>
      <div v-show="isShow">
        <hr>
        <b-card-group
          columns
          class="mb-3"
        >
          <b-card v-for="(piggy, index) in auctionCard"
            :title="piggy.name"
            :sub-title="'Balance: ' + piggy.balance + ' ETH'"
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
          >
            <hr>
            <p class="card-text, mt-3">
              {{ piggy.description }}
            </p>
            <p class="card-text, mt-3">
              Deposits: {{ bidders }} 
            </p>
            <div>
              <form >
                <b-input-group>
                  <b-form-input
                    v-model="addFundsValue[index]"
                  />
                  <b-input-group-append>
                     <b-button
                      class="mt-0"
                      variant="outline-success"
                      @click="handleAddFunds(piggy.address,index)"
                    >
                      Add Funds
                    </b-button>
                    <img
                      v-show="isFunding[index]"
                      src="https://media.giphy.com/media/2A6xoqXc9qML9gzBUE/giphy.gif"
                    >
                  </b-input-group-append>
                </b-input-group>
              </form>
            </div>
            <b-button
              class="mt-3"
              variant="outline-danger"
              @click="handleWithdraw(piggy.address,index)"
            >
              {{ finalizeStatus }}
            </b-button>
            <img
              v-show="isWithdrawing[index]"
              src="https://media.giphy.com/media/2A6xoqXc9qML9gzBUE/giphy.gif"
            >
          </b-card>
        </b-card-group>
      </div>
     </v-container>  
    </v-card> 
    </v-flex>
  </div>
</template>

<script>
import web3 from '../../contracts/web3';
import piggy from '../../contracts/piggyInstance';
import piggyBankBox from '../../contracts/piggyBankBoxInstance';

export default {
  name: 'PiggyBank',
  data() {
    return {
      title: '',
      startBalance: '',
      description: '',
      amount: 0,
      auctionCard: [],
      auctionCardDev: [],
      isShow: false,
      isLoad: false,
      isFunding: [],
      isWithdrawing: [],
      addFundsValue: [],
      withdrawPrice: '',
      auctionAddress: '',
      bidders: 0,
      finalizeStatus: 'Withdraw Piggy',
      createStatus: 'CREATE',
    };
  },
  beforeMount() {
    // retrieve piggys from the contract
    this.fetchPiggys()
  },
  methods: {
    fetchPiggys(){
      piggyBankBox.methods
        .returnAllPiggys()
        .call()
        .then((piggys) => {
          console.log(piggys);
          const index = piggys.length - 1;
          let pigs = []
          console.log(piggys[index]);
          // get the contract address of the previous auction
          this.auctionAddress = piggys[index];
          // set the amount of auctions
          console.log(piggys[0]);
          class Piggy {
              constructor(name, description, balance, address) {
                this.name= name
                this.description = description
                this.balance = balance
                this.address = address
              }
          }; 
          // set the address as the parameter
          for (let index = 0; index < piggys.length; index++) {
            const piggyInstance = piggy(piggys[index]);
            this.isWithdrawing[index] = false;
            piggyInstance.methods.returnContents().call().then((lists) => {
              const balance = web3.utils.fromWei(lists[2], 'ether');
              const piggy = new Piggy(lists[0],lists[1], balance, piggys[index]);
              pigs.push(piggy)
            }) 
          }
          return pigs
      }).then((lists) => {
            this.auctionCard = lists;
            console.log(this.auctionCard)
            // show up the auction at the bottom of the page
            this.isShow = true;
            this.amount += 1;
      })
    },
    createPiggyBank() {
      // get accounts
      web3.eth.getAccounts().then((accounts) => {
        // convert 'ether' to 'wei'
        console.log(this.startBalance)
        const startBalanceWei = web3.utils.toWei(this.startBalance, 'ether');
        // createPiggyin piggybankBox contract
        this.isLoad = true;
        return piggyBankBox.methods.createPiggy(this.title, this.description, startBalanceWei)
          .send({
            from: accounts[0],
            value: startBalanceWei
          });
      }).then(() => {
        // initialize forms
        this.isLoad = false;
        this.title = '';
        this.description = '';
        // get the previous auction
        return piggyBankBox.methods.returnAllPiggys().call();
      }).then((piggys) => {
        const index = piggys.length - 1;
        console.log(piggys[index]);
        // get the contract address of the previous auction
        this.auctionAddress = piggys[index];
        // set the address as the parameter
        const piggyInstance = piggy(piggys[index]);
        return piggyInstance.methods.returnContents().call();
      })
        .then((lists) => {
          console.log(lists);
          const auctionlists = lists;
          // convert 'wei' to 'ether'
          auctionlists[1] = web3.utils.fromWei('1', 'ether');
          this.auctionCard = auctionlists;
          // show up the auction at the bottom of the page
          this.isShow = true;
          this.amount += 1;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleAddFunds(pig,index) {
      // convert 'ether' to 'wei'
      const bidPriceWei = web3.utils.toWei(this.addFundsValue[index], 'ether');
      // get the wallet adddress
      const fromAddress = web3.eth.accounts.givenProvider.selectedAddress;
      // set the address as the parameter
      const selectedPiggy = piggy(pig);
      this.isFunding[index] = true
      console.log(this.isFunding[index])
      // placeBid in Auction contract
      selectedPiggy.methods
        .addBalance()
        .send({
          from: fromAddress,
          value: bidPriceWei,
        })
        .then(() => {
          this.isFunding[index] = false;
          // increase the number of deposits and fecth
          this.bidders += 1;
          this.fetchPiggys()
        });
    },
    handleWithdraw(pig,index) {
      // get accounts
      web3.eth.getAccounts().then((accounts) => {

        this.isWithdrawing[index] = true;
        // set the address as the parameter
        const selectedPiggy = piggy(pig);

        // withdraw Piggy in piggy contract
        selectedPiggy.methods
          .withdrawFunds()
          .send({
            from: accounts[0]
          })
          .then(() => {
            this.isWithdrawing[index] = false;
            this.finalizeStatus = 'finalized';
            this.fetchPiggys()
          });
      });
    },
    handleFinalize() {
      // convert 'ether' to 'wei'
      const withdrawPriceWei = web3.utils.toWei(this.withdrawPrice, 'ether');
      // get accounts
      web3.eth.getAccounts().then((accounts) => {
        // set the address as the parameter
        const selectedAuction = piggy(this.auctionAddress);
        this.isFin = true;
        // finalizeAuction in Auction contract
        selectedAuction.methods
          .finalizePiggy()
          .send({ from: accounts[0]})
          .then(() => {
            this.isFin = false;
            this.finalizeStatus = 'Empty';
          });
      });
    },
  },
};
</script>

<style>
#container {
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  padding: 24px;
}
.errorLabel{
  color:red;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
button {
  background-color: #008cba;
  color: white;
}
button:hover {
  background-color: white; /* Green */
  color: #008cba;
  border: #008cba 3px solid;
}
img {
  width: 32px;
}
#isBid, #isFin {
  height: 32px;
  margin-top: 16px;
  margin-left: 8px;
}
</style>