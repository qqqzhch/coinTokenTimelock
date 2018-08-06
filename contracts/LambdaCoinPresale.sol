pragma solidity ^0.4.24;

import "./LambdaCoin.sol";
import "openzeppelin-solidity/contracts/token/ERC20/TokenTimelock.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "openzeppelin-solidity/contracts/token/ERC20/SafeERC20.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";



/* import "openzeppelin-solidity/contracts/crowdsale/Crowdsale.sol"; */
// 这个是和销售有关的

contract LambdaCoinPresale is Ownable {
  using SafeMath for uint256;
  using SafeERC20 for LambdaCoin;

  uint256 Capbase = 10000000 * (10 ** decimals);//1000000 * 10**uint(decimals);

  LambdaCoin public token;

  uint256 public decimals = 18; //默认18 精度
  // max tokens cap
  uint256 public tokenCap =60 * Capbase * 10 ;
  uint256 public tokenOther ;

   //investor
   address public investorWallet;
   // ico wallet
   address public icoWallet;
    // Team wallet
   address public teamWallet;
   //fund wallet
   address public fundWallet;


   uint256 [3] investorlimit = [54, 108, 108];
   uint256 [3] icolimit = [30];//时间是不是3段？
   uint256 [3] teamlimit = [34,33,33];//还是严格的33%？？？
   uint256 [3] fundlimit = [180,10,10];//还是严格的33%？？？ 无穷小数会不会少钱

   uint64 [3] teamlimittime =[uint64(now + 5 minutes),uint64(now + 10 minutes),uint64(now + 15 minutes)];
   uint64 [3] investorlimittime =[uint64(now + 5 minutes),uint64(now + 10 minutes),uint64(now + 15 minutes)];


   // team locked tokens
  TokenTimelock [3] public investorLock;
  TokenTimelock [3] public icoLock;
  TokenTimelock [3] public teamLock;
  TokenTimelock [3] public fundLock;

  /* struct itemlimit {
       uint256 limit;
       uint64 limittime;
   }
  itemlimit[3] investorlimitTest  =[
      itemlimit(54,uint64(now + 5 minutes))
      itemlimit(108,uint64(now + 10 minutes))
      itemlimit(108,uint64(now + 15 minutes))
  ] */



  /* modifier beforeEnd() {
      require(now < endTime);
      _;
  } */


  constructor(
        address _investorWallet,
        address _icoWallet,
        address _teamWallet,
        address _fundWallet
        ) public {

        require(_investorWallet != 0x0);
        require(_icoWallet != 0x0);
        require(_teamWallet != 0x0);
        require(_fundWallet != 0x0);


        investorWallet = _investorWallet;
        icoWallet = _icoWallet;
        teamWallet = _teamWallet;
        fundWallet = _fundWallet;

        // give tokens to team with lock
       token = new LambdaCoin(tokenCap);
       /* token.mint(address(this), tokenCap); */



        uint i;
        for(i=0;i<teamlimit.length;i++){
          investorLock[i] = new TokenTimelock(token, investorWallet, investorlimittime[i]);
          token.mint(address(investorLock[i]), investorlimit[i]*Capbase);
        }

       for(i=0;i<teamlimit.length;i++){
         teamLock[i] = new TokenTimelock(token, teamWallet, teamlimittime[i]  );
         token.mint(address(teamLock[i]), teamlimit[i]*Capbase);
       }

       token.mint(icoWallet, 30*Capbase);
       token.mint(fundWallet, 200*Capbase);


       token.finishMinting();

       tokenOther=tokenCap.sub(LambdaCoin(token).totalSupply());





  }
   /*
   还有一个根据名单列表列表，打币，一个账号固定定额度
   */
   /*
   还有一个是个名单列表，打币，一个账号浮动额度，额度在一个以太坊范围内
   */

  /**
    * @dev Release time-locked tokens
    */
   /* function releaseLockFounders1() public {
       teamTimeLock1.release();
   }

   function releaseLockFounders2() public {
       teamTimeLock2.release();
   }

   function releaseLockFoundation() public {
       teamTimeLock3.release();
   } */


}
