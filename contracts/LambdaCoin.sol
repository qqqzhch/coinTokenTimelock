pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/CappedToken.sol";


contract LambdaCoin is CappedToken {
  string public name = "LambdaCoin";
  string public symbol = "Lambda";
  uint256 public decimals;
  /* uint256 public maxSupply  = 100000000 * (10 ** decimals); */



  constructor(uint256 _cap, uint256 _decimals) public CappedToken(_cap) {
   decimals=_decimals;
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
