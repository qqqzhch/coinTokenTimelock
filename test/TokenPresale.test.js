// 1 假设

var TokenPresale = artifacts.require("./TokenPresale.sol");
var TutorialToken = artifacts.require("./TutorialToken.sol");

// const assertThrows = require('./utils/assertThrows')
// const { goal } = require('./utils/common')


  // before(async () => {
  //   presaleCrowdsale = await SelfKeyCrowdsale.new(start, end, goal)
  //   const token = await presaleCrowdsale.token.call()
  //   presaleToken = await SelfKeyToken.at(token)
  // })

contract('TokenPresale',async(accounts)=>{
  let instance,tokeninstance;

  before(async () => {
    let instance =await TokenPresale.new(
      '0x3b9170c9fa9e12cce546d5681c0be6f1a63eefda',//_investorWallet
      '0x774efe189ddd5cd476f7611d44a61984feaa93a8',//_icoWallet
      '0x22c823b0aa08b901eea8ea228790ccb389b6208a',//_teamWallet
      '0x8731c19d6041295cab8be3b9985bfd6cc9e9d2ba' //_fundWallet
    )

    tokenaddress = await instance.token.call();
    tokeninstance = await TutorialToken.at(tokenaddress);

 })

  it("token的总量 60 亿个 ",async()=>{
       let  totalSupply = await tokeninstance.totalSupply.call();
       assert.equal(6000000000,totalSupply)
  })
  it("token的 精度是1 ",function() {

  })
  it("token初始化后 锁仓份额是多少 ",function() {

  })


  it("需要解锁的份额数量和时间限制",function () {

  })


  it("可以转账 整数 例如 转账100 ",function() {

  })

  it("转账 小数  转账失败 ",function() {

  })


})
