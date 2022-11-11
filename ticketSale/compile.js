const path = require('path');
const fs = require('fs');
const solc = require('solc');
//const solc = require('solc@0.4.17');

const ticketSalePath = path.resolve(__dirname, 'contracts', 'ticektSale.sol');
const source = fs.readFileSync(ticketSalePath, 'utf8');


let input = {
  language: "Solidity",
  sources: {
    "ticektSale.sol": {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["abi", "evm.bytecode"],
      },
    },
  },
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));
const contracts = output.contracts["ticektSale.sol"];

console.log(contracts.ticektSale);

contracts 