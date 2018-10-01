import Web3 from 'web3'
import Tx from 'ethereumjs-tx'

// Bufferがないよって怒られるため定義.
declare const Buffer: any

export default class EthWrapper {
    public host: string = 'ws://localhost:7545' // local test net.
    public web3: any
    constructor() {
        this.web3 = new Web3(this.host)
    }

    public createAccount(): any {
        const account = this.web3.eth.accounts.create()
        console.log(account)
        return account
    }

    public getAccountFromPrivateKey(privateKey: string): any {
        const account = this.web3.eth.accounts.privateKeyToAccount(privateKey)
        console.log(account)
        return account
    }

    public async getBalance(address: string) {
        const balance = await this.web3.eth.getBalance(address)
        console.log(balance)
        return balance
    }

    // 署名付トランザクション.
    public async sendEthWithSign(fromAddress: string, toAddress: string, privateKey: string, amount: number) {
        const ether = this.web3.utils.toWei(`${amount}`, 'ether')
        console.log(ether)
        const gasParams = {
            from: fromAddress,
            to: toAddress,
            value: ether
        }
        const gasLimit = await this.web3.eth.estimateGas(gasParams)
        const gasPrice = await this.web3.eth.getGasPrice()
        const count = await this.web3.eth.getTransactionCount(fromAddress)
        const params = {
            nonce: count,
            gasPrice: this.web3.utils.toHex(gasPrice),
            gasLimit: this.web3.utils.toHex(gasLimit),
            to: toAddress,
            value: this.web3.utils.toHex(ether)
        }
        const tx = new Tx(params)
        tx.sign(new Buffer.from(privateKey, 'hex'))
        const rawTx = '0x' + tx.serialize().toString('hex')
        const result = await this.web3.eth.sendSignedTransaction(rawTx)
        console.log(result)
        return result
    }

    // 署名なしトランザクション ※ノードが送金元の秘密鍵知っていれば送れる.
    public async sendEth(fromAddress: string, toAddress: string, amount: number) {
        const ether = this.web3.utils.toWei(`${amount}`, 'ether')
        console.log(ether)
        const params = {
            from: fromAddress,
            to: toAddress,
            value: ether
        }
        const result = await this.web3.eth.sendTransaction(params)
        console.log(result)
        return result
    }
}
