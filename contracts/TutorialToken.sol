pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/MintableToken.sol";

contract TutorialToken is MintableToken {
  string public name = "TutorialToken";
  string public symbol = "TT";
  uint256 public decimals = 1;
  /* uint256 public maxSupply  = 100000000 * (10 ** decimals); */

  constructor(uint256 maxSupply) public {
    totalSupply_ = maxSupply;
    /* balances[msg.sender] = INITIAL_SUPPLY; */
  }

  modifier canTransfer(address _from, uint _value) {
        require(mintingFinished);
        _;
  }

  function transfer(address _to, uint _value) canTransfer(msg.sender, _value) public returns (bool) {
        return super.transfer(_to, _value);
  }

  function transferFrom(address _from, address _to, uint _value) canTransfer(_from, _value) public returns (bool) {
        return super.transferFrom(_from, _to, _value);
  }


}
