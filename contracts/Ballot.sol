// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Ballot{
    struct Voter{
        bool votingRight;
        bool voted;
        address votedPerson;
        uint voteIndex;
    }

    struct Proposal{
        string name;
        uint count;
    }
    Proposal[] proposals;
    mapping(address => Voter) Voters;
    address public chairperson;
    string [] public winners;
    constructor (string[] memory propsalName) {
        chairperson = msg.sender;
        for(uint i; i<propsalName.length; i++){
            proposals.push(Proposal({
                name: propsalName[i],
                count:0
            }));
        }
    }

    function rightToVote(address voter) public {
        require(msg.sender == chairperson,"You don't have the authority to give the right");
        require(!Voters[voter].votingRight,"Voter already has a right to vote");
        require(!Voters[voter].voted,"Voter has already voted");
        Voters[voter].votingRight = true;
    }

    function vote(uint proposalIndex) public{
        require(Voters[msg.sender].votingRight,"You don't have a right to vote");
        require(!Voters[msg.sender].voted,"You have already voted");
        proposals[proposalIndex].count +=1;
        Voters[msg.sender].voted = true;
        Voters[msg.sender].voteIndex = proposalIndex;
    }

    function _winingProposal() public   {
        require(msg.sender == chairperson,"You cannot call the Winner !!");
        uint winingCount =0;
        for (uint p; p< proposals.length; p++){
            if(winingCount<proposals[p].count){
                winingCount = proposals[p].count;
            }
        }

        for (uint w; w< proposals.length; w++){
            if(winingCount == proposals[w].count){
                winners.push(proposals[w].name);
            }
        }
    }

    function winner() public  view returns(string[] memory){
        return winners;
    }
}