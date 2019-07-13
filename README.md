# Ethereum Wallet
> This is Ethereum Wallet.

<a href="https://imgur.com/IGVIKg2"><img src="https://i.imgur.com/IGVIKg2.png" width="40%" height="40%" /></a>

# Application
[https://hukusuke1007.github.io/eth-wallet/](https://hukusuke1007.github.io/eth-wallet/)

## Usage for developer

### Project setup
Install libraries.

```
yarn
```

### Prepare Infura API
Please preare [Infura](https://infura.io/) API.<br>

Rename file to ".env" from "dotenvsample" and set Infura API in .env.

``` bash
ETH_PROVIDER_URL = 'wss://ropsten.infura.io/ws/v3/XXXXXX'
```

Ropsten is test net in Ethereum network.<br>

### Run localhost.
Please run the following command. Then run Ethereum wallet in localhost.
``` bash
# serve with hot reload at localhost:8080
yarn serve
```

### Prepare MetaMask.
Please install [MetaMask](https://metamask.io/) in Google Extension.<br>
It is wallet for etheream and could get ETH for test net from MetaMask.

### Get "ETH" for Roposten test net
You could get ETH for Roposten test net from [MetaMask Ether Faucet](https://faucet.metamask.io/).

## Author
shohei<br>
[Twitter](https://twitter.com/hobbydevelop)<br>
[MOKU dev](https://mokudev.connpass.com/)
