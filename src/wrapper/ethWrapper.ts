import Web3 from 'web3';

export default class ethWrapper {
    public host: string = 'ws://localhost:7545';
    public web3: any;
    constructor() {
        this.web3 = new Web3(this.host);
        const account = this.web3.eth.accounts.create();
        console.log(account);
    }
}