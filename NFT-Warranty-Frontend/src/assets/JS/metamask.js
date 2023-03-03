const { sortAndDeduplicateDiagnostics } = require("typescript")

let App = {
    loading: false,
    contracts: {},
  
    load: async () => {
      await App.loadWeb3()
      await App.loadAccount()
      await App.loadContract()
      // await App.render()
    },
  
    // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
    loadWeb3: async () => {
      if (typeof web3 !== 'undefined') {
        App.web3Provider = web3.currentProvider
        web3 = new Web3(web3.currentProvider)
      } else {
        window.alert("Please connect to Metamask.")
      }
      // Modern dapp browsers...
      if (window.ethereum) {
        window.web3 = new Web3(ethereum)
        try {
          // Request account access if needed
          await ethereum.enable()
          // Acccounts now exposed
          web3.eth.sendTransaction({/* ... */ })
        } catch (error) {
          // User denied account access...
        }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        App.web3Provider = web3.currentProvider
        window.web3 = new Web3(web3.currentProvider)
        // Acccounts always exposed
        web3.eth.sendTransaction({/* ... */ })
      }
      // Non-dapp browsers...
      else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
      }
    },
  
    loadAccount: async () => {
      // Set the current blockchain account
      const accounts = await web3.eth.getAccounts();
      App.account = accounts[0];
      console.log("Current Account in use: " + App.account);
    },
  
    loadContract: async () => {
      // Create a JavaScript version of the smart contract
      const NFT = await $.getJSON('/assets/contracts/NFT.json')
      App.contracts.NFT = TruffleContract(NFT)
      App.contracts.NFT.setProvider(App.web3Provider)
  
      // Hydrate the smart contract with values from the blockchain
      App.NFT = await App.contracts.NFT.deployed()

      const NFTOps = await $.getJSON('/assets/contracts/NFTOps.json')
      App.contracts.NFTOps = TruffleContract(NFTOps)
      App.contracts.NFTOps.setProvider(App.web3Provider)
  
      // Hydrate the smart contract with values from the blockchain
      App.NFTOps = await App.contracts.NFTOps.deployed()
    },
  
    mintProduct: async () => {
      // Get the form to submit
      const form = $('#productNFT');
      token = await App.NFT.mint("", {
        brand: form.find('input[name="brand"]').val(), 
        model: form.find('input[name="model_number"]').val(),
        warrantyPeriod: 30*24*3600*parseInt(form.find('input[name="warranty_period"]').val()), 
        identifier: form.find('input[name="identifier"]').val()}, { from: App.account })
      tokenID = token.logs[0].args.tokenId.toNumber()
      await App.NFT.approve(App.NFTOps.address, tokenID, { from: App.account })
      console.log(tokenID)
      form.find('input[name="tokenID"]').val(tokenID)
      console.log(form.find('input[name="tokenID"]').val())
      // Create Badge on Ethereum network
    //   await App.issueBadge.createBadge(
    //     form.find('input[name="beneficiary_name"]').val(),
    //     form.find('input[name="beneficiary_email"]').val(),
    //     form.find('input[name="certified_for"]').val(),
    //     form.find('input[name="expiry_date"]').val(),
    //     (new Date()).toISOString(),
    //     form.find('input[name="issuer_email"]').val(),
    //     { from: App.account }).then(
    //       // Successful
    //       (result) => {
    //         // Add badgeID in the form
    //         let input = $("<input>")
    //           .attr("type", "hidden")
    //           .attr("name", "badgeID").val(result.logs[0].args[0].toNumber());
    //         form.append($(input));
    //         // Get Issuer Details from Ethereum network
    //         App.issueBadge.getIssuer(form.find('input[name="issuer_email"]').val()).then(
    //           // Successful
    //           (issuer) => {
    //             // Add issuer organization details in the form
    //             let input = $("<input>")
    //               .attr("type", "hidden")
    //               .attr("name", "issuer_organization").val(issuer.issuer_organization);
    //             form.append($(input));
    //             // Now submit the form :)
    //             form.submit();
    //           },
    //           // Error
    //           (error) => {
    //             window.alert("Some Error at Ethereum Network");
    //           }
    //         )
    //       },
    //       // Error
    //       (error) => {
    //         if (error.message.includes("NOT_ISSUER_PERMISSION")) {
    //           window.alert("Not having Enough Permission");
    //         }
    //         else {
    //           window.alert("Some Error at Ethereum Network");
    //         }
  
    //       })
     },
  }

  $(() => {
    $(window).load(() => {
      App.load()
    })
  })