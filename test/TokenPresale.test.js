// 1 假设

var LambdaCoinPresale = artifacts.require("./LambdaCoinPresale.sol");
var TutorialToken = artifacts.require("./LambdaCoin.sol");
var TokenTimelock = artifacts.require("./TokenTimelock.sol");


// import "openzeppelin-solidity/contracts/token/ERC20/TokenTimelock.sol";

// const assertThrows = require('./utils/assertThrows')
// const { goal } = require('./utils/common')


  // before(async () => {
  //   presaleCrowdsale = await SelfKeyCrowdsale.new(start, end, goal)
  //   const token = await presaleCrowdsale.token.call()
  //   presaleToken = await SelfKeyToken.at(token)
  // })

contract('TokenPresale',async(accounts)=>{
  let instancePresale,tokeninstance;
  var investorWallet=accounts[0];
  var icoWallet=accounts[1];
  var teamWallet=accounts[2];
  var fundWallet=accounts[3];
  before(async () => {
      instancePresale = await LambdaCoinPresale.new(
      investorWallet,
      icoWallet,
      teamWallet,
      fundWallet,
    )

    tokenaddress = await instancePresale.token.call();
    tokeninstance = await TutorialToken.at(tokenaddress);

 })

  it("token的总量 60 亿个 ",async()=>{
       let  totalSupply = await tokeninstance.totalSupply.call();
       assert.equal(6000000000,totalSupply.c[0])
  })
  it("token的 精度是0 ",async()=> {
      let  decimals = await tokeninstance.decimals.call();
      assert.equal(0,decimals)
  })
  it("token初始化后 账号份额是校对 ",async()=> {

     let investorbalance = await tokeninstance.balanceOf.call(investorWallet);
     let icobalance = await tokeninstance.balanceOf.call(icoWallet);
     let teambalance = await tokeninstance.balanceOf.call(teamWallet);
     let fundbalance = await tokeninstance.balanceOf.call(fundWallet);

     assert.equal(0,investorbalance.c[0])

     assert.equal(0,teambalance.c[0])

     assert.equal(2000000000,fundbalance.c[0])
     assert.equal(300000000,icobalance.c[0])





  })


  it("锁仓的份额",async()=> {
  let getbalanceOf = async(name,index)=>{
    let investorLockAddress = await  instancePresale[name].call(index);
    let TokenTimelockinstance = await TokenTimelock.at(investorLockAddress);
    let lockbalance = await tokeninstance.balanceOf.call(TokenTimelockinstance.address);
    return lockbalance.c[0]
    }
    // let investorLockAddress = await  instancePresale.investorLock.call(0);
    // let TokenTimelockinstance = await TokenTimelock.at(investorLockAddress);
    // let lockbalance = await tokeninstance.balanceOf.call(TokenTimelockinstance.address);
    var num=await  getbalanceOf('investorLock',0)
    assert.equal(540000000,num)
       num=await getbalanceOf('investorLock',1)
    assert.equal(1080000000,num)
       num=await getbalanceOf('investorLock',2)
    assert.equal(1080000000,num)
    //
    // num=await getbalanceOf('icoLock',0)
    // assert.equal(210000000,num)
    // num=await getbalanceOf('icoLock',1)
    // assert.equal(90000000,num)


    num=await getbalanceOf('teamLock',0)
    assert.equal(340000000,num)
    num=await getbalanceOf('teamLock',1)
    assert.equal(330000000,num)
    num=await getbalanceOf('teamLock',2)
    assert.equal(330000000,num)

    //现在基金会的没有锁

    // assert.equal(540000000,lockbalance)



    //let lockTime = await  TokenTimelockinstance.releaseTime.call()
    //TokenTimelock.address  根据这个地址差锁起来的份额
    //TokenTimelock.releaseTime 解锁时间
    //TokenTimelock.release
    //1 验证 地址
    //2 验证 份额
    //3 验证 时间


  })


  it("解锁时间验证 ",async()=> {

    let gettimeOf = async(name,index)=>{
      let investorLockAddress = await  instancePresale[name].call(index);
      let TokenTimelockinstance = await TokenTimelock.at(investorLockAddress);
      let lockTime = await  TokenTimelockinstance.releaseTime.call()
      return lockTime.c[0]
      }

      var timestart=1538323200; //9月1号的时间戳
      var days=86400;

      var num=await gettimeOf('investorLock',0)
      assert.equal(timestart+days*60,num)
      num=await gettimeOf('investorLock',1)
      assert.equal(timestart+days*180,num)
      num=await gettimeOf('investorLock',2)
      assert.equal(timestart+days*300,num)

      num=await gettimeOf('teamLock',0)
      assert.equal(timestart+days*365,num)


      num=await gettimeOf('teamLock',1)
      assert.equal(timestart+days*365*2,num)

      num=await gettimeOf('teamLock',2)
      assert.equal(timestart+days*365*3,num)

  })
  //
  // it("转账 小数  转账失败 ",function() {
  //
  // })


})
