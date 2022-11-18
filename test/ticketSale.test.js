const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());
const {abi, bytecode} = require('../compile');

let accounts;
let ticketSale;

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();
  //console.log(accounts);
  //console.log(accounts);
  //balance = web3.eth.getBalance(accounts[0]);
  //console.log(balance);
  ticketSale = await new web3.eth.Contract(abi)
    .deploy({
      data: bytecode,
      arguments: [100,1],
    })
    .send({ from: accounts[0], gasPrice: 8000000000, gas: 4700000});
});


describe("Ticket Sale", () => {
  it("deploys a contract with owner", () => {
    //console.log(ecomm);
    assert.ok(ticketSale.options.address);
  });
  it("verify purchase", async () => {
    ticketSale.methods.buyTicket(2).send({ from: accounts[1], gasPrice: 150000000, gas: 200000000});
    const ticketId = await ticketSale.methods.getTicketOf(accounts[1]).call();
    console.log(ticketId);
    assert.equal(ticketId, 2);
  });
});