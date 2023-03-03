let mylog, myerror;
App = {
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
    const issueBadge = await $.getJSON('IssueBadge.json')
    App.contracts.issueBadge = TruffleContract(issueBadge)
    App.contracts.issueBadge.setProvider(App.web3Provider)

    // Hydrate the smart contract with values from the blockchain
    App.issueBadge = await App.contracts.issueBadge.deployed()
  },

  render: async () => {
    // Prevent double render
    if (App.loading) {
      return
    }

    // Render Account
    console.log(App.account.address)

    // Render Tasks
    await App.renderBadge();

  },

  renderBadge: async () => {

    // Render out each task with a new task template
    console.log(App.issueBadge.getBadge(1));
    console.log(App.issueBadge.getIssuer("abmore@mitaoe.ac.in"));
  },

  createBadge: async () => {
    // Get the form to submit
    const form = $('#badgeIssueForm');
    // Create Badge on Ethereum network
    await App.issueBadge.createBadge(
      form.find('input[name="beneficiary_name"]').val(),
      form.find('input[name="beneficiary_email"]').val(),
      form.find('input[name="certified_for"]').val(),
      form.find('input[name="expiry_date"]').val(),
      (new Date()).toISOString(),
      form.find('input[name="issuer_email"]').val(),
      { from: App.account }).then(
        // Successful
        (result) => {
          // Add badgeID in the form
          let input = $("<input>")
            .attr("type", "hidden")
            .attr("name", "badgeID").val(result.logs[0].args[0].toNumber());
          form.append($(input));
          // Get Issuer Details from Ethereum network
          App.issueBadge.getIssuer(form.find('input[name="issuer_email"]').val()).then(
            // Successful
            (issuer) => {
              // Add issuer organization details in the form
              let input = $("<input>")
                .attr("type", "hidden")
                .attr("name", "issuer_organization").val(issuer.issuer_organization);
              form.append($(input));
              // Now submit the form :)
              form.submit();
            },
            // Error
            (error) => {
              window.alert("Some Error at Ethereum Network");
            }
          )
        },
        // Error
        (error) => {
          if (error.message.includes("NOT_ISSUER_PERMISSION")) {
            window.alert("Not having Enough Permission");
          }
          else {
            window.alert("Some Error at Ethereum Network");
          }

        })
  },
}

$(() => {
  $(window).load(() => {
    App.load()
  })
})