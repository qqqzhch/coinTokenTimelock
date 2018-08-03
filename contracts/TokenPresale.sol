pragma solidity ^0.4.24;
import "./TutorialToken.sol";
/* import "openzeppelin-solidity/contracts/crowdsale/Crowdsale.sol"; */
import "openzeppelin-solidity/contracts/token/ERC20/TokenTimelock.sol";


contract TokenPresale is Ownable {
  using SafeMath for uint256;
  using SafeERC20 for TutorialToken;


  TutorialToken public token;

  uint256 public decimals = 1;
  // max tokens cap
  uint256 public tokenCap = 10000000 * (10 ** decimals);

    // Team wallet
   address public teamWallet;
   // Advisor wallet
   address public advisorWallet;

   // Company wallet
   address public companyWallet;
   // Bounty wallet
   address public bountyWallet;
   //investor
   address public investorWallet;

   // reserved tokens
   uint256 public teamTokensPart1 		= 	10000000 * (10 ** decimals);
   uint256 public teamTokensPart2 		= 	10000000 * (10 ** decimals);
   uint256 public teamTokensPart3 		= 	10000000 * (10 ** decimals);

   uint256 public advisorTokens 	= 	10000000 * (10 ** decimals);
   uint256 public companyTokens 	= 	27000000 * (10 ** decimals);
   uint256 public bountyTokens 	= 	3000000 * (10 ** decimals);
   uint256 public investorTokens 	= 	10000000 * (10 ** decimals);

   // team locked tokens
  TokenTimelock public teamTimeLock1;
  TokenTimelock public teamTimeLock2;
  TokenTimelock public teamTimeLock3;
  // advisor locked tokens
  TokenTimelock public advisorTimeLock;
  // company locked tokens
  TokenTimelock public companyTimeLock;

  /* modifier beforeEnd() {
      require(now < endTime);
      _;
  } */


  constructor(
        address _teamWallet
        ) public {

        require(_teamWallet != 0x0);

        teamWallet = _teamWallet;
        // give tokens to team with lock
       token = new TutorialToken(tokenCap);
       /* token.mint(address(this), tokenCap); */


       teamTimeLock1 = new TokenTimelock(token, teamWallet, uint64(now + 5 minutes));
       token.mint(address(teamTimeLock1), teamTokensPart1);

       teamTimeLock2 = new TokenTimelock(token, teamWallet, uint64(now + 10 minutes));
       token.mint(address(teamTimeLock2), teamTokensPart2);

       teamTimeLock3 = new TokenTimelock(token, teamWallet, uint64(now + 15 minutes));
       token.mint(address(teamTimeLock3), teamTokensPart3);

       token.finishMinting();





  }
  /**
    * @dev Release time-locked tokens
    */
   function releaseLockFounders1() public {
       teamTimeLock1.release();
   }

   function releaseLockFounders2() public {
       teamTimeLock2.release();
   }

   function releaseLockFoundation() public {
       teamTimeLock3.release();
   }


}
