pragma solidity ^0.4.26;

contract ticketSale {

    // <contract_variables>
    
    address private owner;
    mapping (address => uint) tickets;
    mapping (uint => address) ticketsSold;
    uint ticketCount;
    uint private ticketPrice;
    mapping (address => address) swapOffers;
    
    // </contract_variables>

    constructor(uint numTickets, uint price) public {
        ticketCount = numTickets;
        owner = msg.sender;
        ticketPrice = price;
    }

    function buyTicket(uint ticketId) public payable {
        require(ticketId >= 1 && ticketId <= ticketCount); 
        require(ticketsSold[ticketId] == 0); 
        require(tickets[msg.sender] == 0); 
        require(msg.value == ticketPrice); 
        tickets[msg.sender] = ticketId;
        ticketsSold[ticketId] = msg.sender;
    }

    function getTicketOf(address person) public view returns (uint) {
        return tickets[person];
    }

    function offerSwap(address partner) public {
        require(tickets[msg.sender] > 0); 
        require(partner != msg.sender); 
        swapOffers[msg.sender] = partner;
    }

    function acceptSwap(address partner) public {
        require(tickets[msg.sender] > 0); 
        require(swapOffers[partner] == msg.sender); 
        (tickets[msg.sender], tickets[partner]) = (tickets[partner], tickets[msg.sender]); 
        ticketsSold[tickets[msg.sender]] = msg.sender;
        ticketsSold[tickets[partner]] = partner;
        swapOffers[partner] = 0;
    }
}