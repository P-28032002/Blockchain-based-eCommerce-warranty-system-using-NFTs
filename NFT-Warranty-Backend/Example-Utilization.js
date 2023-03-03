// First load contract
const NFT_JSON = await $.getJSON('truffle-contract/build/NFT.json') // Here passing relative location of contract
NFT = TruffleContract(NFT_JSON) // Build truffle contract object
NFT.setProvider(App.web3Provider) // set provider/signer of contract
NFT = await NFT.deployed() // Get SDK for deployed smart contract

const NFTOps_JSON = await $.getJSON('truffle-contract/build/NFTOps.json') // Here passing relative location of contract
NFTOps = TruffleContract(NFTOps_JSON) // Build truffle contract object
NFTOps.setProvider(App.web3Provider) // set provider/signer of contract
NFTOps = await NFTOps.deployed() // Get SDK for deployed smart contract

// Miniting
token = await NFT.mint("Product URL (optional)", {brand: "Moto", model: "G82", warrantyPeriod: 100000, identifier: "QFK2X924XJ2"})
tokenID = token.logs[0].args.tokenId.toNumber()
await NFT.approve(NFTOps.address, tokenID)
transfer = await NFTOps.softTransfer(NFT.address,tokenID,{user: "0x0000000000000000000000000000000000000000", uuid: "", mobileNo: "917709915693", email: "abhi@gmail.com"}, 100000, 100000)

// To get Product URL/token URI
tokenURI = await NFT.tokenURI(tokenID)
// To get metadata e.g. brand, model, etc...
tokenMetadata = await NFT.getMetadata(tokenID)
// Here                               ^   this is the previously minted NFT token ID
// token ID start from 0 and go on increasing

// String to fixed sixe byte array conversion
String.prototype.byteEncode = function(byte_size){
    byte_arr = Array.from(in_str,(x) => x.charCodeAt(0))
    for(var i = in_str.length; i < byte_size; i++){
        byte_arr.push(0)
    }
    return byte_arr
}
// String to hex
String.prototype.hexEncode = function(byte_size){
    let result = "";
    for (let i=0; i < byte_size; i++){
        for (; i<this.length; i++) {
            result += this.charCodeAt(i).toString(16);
        }
        result += "00"
    }
    return "0x"+result
}
// Hex to string
String.prototype.hexDecode = function(){
    let hexes = this.match(/.{1,2}/g) || [];
    let result = "";
    for(let j = 1; j<hexes.length; j++) {
        if(hexes[j] == "00"){continue}
        result += String.fromCharCode(parseInt(hexes[j], 16));
    }
    return result;
}
// Sort of DB like access to events
// Return promise for past events
event1 = await NFTOps.getPastEvents('softTransfered',{filter:{mobileNo:'917709915693'},fromBlock: 0, toBlock: 'latest'})
// return promise for future event subscription
events = await NFTOps.softTransfered({filter:{mobileNo:'917709915693'},fromBlock: 0, toBlock: 'latest'}, function(error, events){ console.log(events); })