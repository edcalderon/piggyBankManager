import localForage from 'localforage'
import EthWrapper from '@/wrapper/EthWrapper'

export default class WalletModel {
    public balance: number = 0
    public address: string = ''
    public privateKey: string = ''

    private eth = new EthWrapper()
    private localStorageKey = 'eth-wallet'

    constructor() {
        // クラス生成時にローカルストレージからアカウント情報を取得
        this.load()
        .then((result) => {
            console.log(result)
            if (result === null) {
                const account = this.eth.createAccount()
                this.address = account.address
                this.privateKey = account.privateKey
                this.save()
            } else {
                this.address = result.address
                this.privateKey = result.privateKey
                this.getAccount()
            }
        }).catch((error) => {
            console.error(error)
        })
    }

    // ローカルストレージへ保存
    public async save() {
        return await localForage.setItem(this.localStorageKey, this.toJSON())
    }

    // ローカルストレージから取得
    public async load() {
        const result: any = await localForage.getItem(this.localStorageKey)
        if (result !== null) {
            this.address = result.address
            this.privateKey = result.privateKey
        }
        return result
    }

    // ローカルストレージから削除
    public async remove() {
        return await localForage.removeItem(this.localStorageKey)
    }

    // アカウント情報を取得
    public async getAccount() {
        this.balance = await this.eth.getBalance(this.address)
    }

    // 送金(ETH)
    public async sendEth(toAddress: string, amount: number)  {
        return await this.eth.sendEthWithSign(this.address, toAddress, this.privateKey, amount)
    }

    public toJSON() {
        return {
            address: this.address,
            privateKey: this.privateKey,
        }
    }
}
