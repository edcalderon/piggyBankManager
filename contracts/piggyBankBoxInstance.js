import web3 from './web3';

const address = '0x7AF7E6adbeDd4A910f732e1bC201A5E313dF41b3' // THE CONTRACT ADDRESS
const abi =[
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_description",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_startBalance",
				"type": "uint256"
			}
		],
		"name": "createPiggy",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "piggys",
		"outputs": [
			{
				"internalType": "contract Piggy",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "returnAllPiggys",
		"outputs": [
			{
				"internalType": "contract Piggy[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]// THE ABI

const instance = new web3.eth.Contract(abi, address);

export default instance;