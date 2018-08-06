App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    // Initialize web3 and set the provider to the testRPC.
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // set the provider you want from Web3.providers
      App.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545');
      web3 = new Web3(App.web3Provider);
    }

    return App.initContract();
  },

  initContract: function() {
    $.getJSON('TokenPresale.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract.
      var TutorialTokenArtifact = data;
      App.contracts.TutorialToken = TruffleContract(TutorialTokenArtifact);

      // Set the provider for our contract.
      App.contracts.TutorialToken.setProvider(App.web3Provider);

      // Use our contract to retieve and mark the adopted pets.
      return App.getBalances();
    });
    $.getJSON('TutorialToken.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract.
      var TutorialTokenArtifact = data;
      var MyContract = web3.eth.contract(data.abi);
      App.contracts.TokenContract=MyContract;
    })
    $.getJSON('TokenTimelock.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract.
      var TutorialTokenArtifact = data;
      var MyContract = web3.eth.contract(data.abi);

      App.contracts.TokenTimelockContract=MyContract;


      // Set the provider for our contract.


      // Use our contract to retieve and mark the adopted pets.


    })

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '#transferButton', App.handleTransfer);
    $(document).on('click', '#transferButton1', App.releasehandle);
  },
   releasehandle:function(event) {
    event.preventDefault();
    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.TutorialToken.deployed().then(function(instance) {
        tutorialTokenInstance = instance;

        tutorialTokenInstance.investorLock(1) //0 1 2
        .then(function(address,data) {
          console.log(address)
          console.log(data)
          TokenTimelock=App.contracts.TokenTimelockContract.at(address);

          TokenTimelock.releaseTime(function(error,body) {
            console.log(error)
            console.log('时间戳',body.c[0])

          })

          TokenTimelock.beneficiary(function(error,body) {
            console.log(error)
            console.log('账号地址',body)

          })

          TokenTimelock.release(function(error,body) {
            console.log(error)
            console.log(body)
          })


        })
        .catch((ex)=>{
          console.log(ex);
        });


      }).then(function(result) {

        console.log('解锁')
        return App.getBalances();

      }).catch(function(err) {
        console.log(err.message);
      });
    });

  },

  handleTransfer: function(event) {
    event.preventDefault();

    var amount = parseInt($('#TTTransferAmount').val());
    var toAddress = $('#TTTransferAddress').val();

    console.log('Transfer ' + amount + ' TT to ' + toAddress);

    var tutorialTokenInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.TutorialToken.deployed().then(function(instance) {
        tutorialTokenInstance = instance;

        return tutorialTokenInstance.transfer(toAddress, amount, {from: account, gas: 100000});
      }).then(function(result) {
        alert('Transfer Successful!');
        return App.getBalances();
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  },

  getBalances: function() {
    console.log('Getting balances...');

    var tutorialTokenInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];
      // var account = "0xc9cd5f7a741e91ce249dae54ed9a20e2251d2db2"
      console.log(account);

      App.contracts.TutorialToken.deployed().then(function(instance) {
        tutorialTokenInstance = instance;
        tutorialTokenInstance.tokenCap().then(function(result) {
          console.log(result)
        })
        return  tutorialTokenInstance.token().then(function(tokenaddress) {
          var contractInstance =App.contracts.TokenContract.at(tokenaddress);
          contractInstance.name(function(err,result) {
            console.log(result)

          })

          contractInstance.totalSupply(function(err,result) {
            console.log(result)

          })


          contractInstance['symbol'](function(err,result) {
            console.log(result)

          })
          contractInstance.balanceOf(account,function(err,result) {
            console.log('余额',result);
            if(result){
              balance = result.c[0];
              $('#TTBalance').text(balance);
            }else{
              console.log('没有账户')
            }

          });





        })

      }).catch(function(err) {
        console.log(err.message);
      });
    });
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
