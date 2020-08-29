import web3 from './web3';

const address = '0x1A6117EABd118b180A5716526eDCdaB7050dE267' // THE CONTRACT ADDRESS
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