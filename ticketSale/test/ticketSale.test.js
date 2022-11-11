let accounts;
let ticketSale;
beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();
  inbox = await new web3.eth.Contract(abi)
    .deploy({
      data: bytecode,
      arguments: ["Hi there!"],
    })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("ticketSale", () => {
    it("deploys a contract", () => {
      assert.ok(ticketSale.options.address);
    });
    it("has a default message", async () => {
      const message = await ticketSale.methods.message().call();
      assert.equal(message, "Hi there!");
    });
  });