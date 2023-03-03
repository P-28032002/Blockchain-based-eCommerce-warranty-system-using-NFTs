import { Component, OnInit, ViewChild } from '@angular/core';
import { 
  addDoc,
  Firestore,
  collection
} from '@angular/fire/firestore'
import { Injectable } from '@angular/core';
import Web3 from 'web3';
import TruffleContract from 'truffle-contract';
import '../../assets/JS/metamask.js';
declare const window: any;
declare var App: any;

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent implements OnInit {
  window:any;
  // public contracts: any;
  // public web3Provider: any;
  // public NFT: any;
  constructor(public firestore: Firestore) { 

  }
  @ViewChild('mybrand') ipbrand: any;
  @ViewChild('mytitle') iptitle: any;
  @ViewChild('mymodelnumber') ipmodelnumber: any;
  @ViewChild('myreturnperiod') ipreturnperiod : any;
  @ViewChild('mywarrantyperiod') ipwarrantyperiod : any;
  @ViewChild('myidentifier') ipidentifier : any;
  @ViewChild('mylaunchdate') iplaunchdate : any;
  @ViewChild('mypurchasedate') ippurchasedate : any;
  @ViewChild('myproductimg') ipproductimg : any;
  @ViewChild('myhidden') iphidden : any;


//   private getAccounts = async () => {
//     try {
//         return await window.ethereum.request({ method: 'eth_accounts' });
//     } catch (e) {
//         return [];
//     }
// }

// public openMetamask = async () => {
//     window.web3 = new Web3(window.ethereum);
//     let addresses = await this.getAccounts();
//     console.log("service",addresses)
//     if (!addresses.length) {
//         try {
//             addresses = await window.ethereum.enable();
//         } catch (e) {
//             return false;
//         }
//     }
//     return addresses.length ? addresses[0] : null;
// }

//  public loadContract = async () => {
//   const NFT = await $.getJSON('/assets/contracts/NFT.json')
//   this.contracts.NFT = TruffleContract(NFT)
//   this.contracts.NFT.setProvider(window.web3.currentProvider)

//   // Hydrate the smart contract with values from the blockchain
//   this.NFT = await this.contracts.NFT.deployed()
//  }
//  async delay(ms: number) {
//   return new Promise( resolve => setTimeout(resolve, ms) );
// }
  async addData(){
    const dbInsance = collection(this.firestore, 'items');
    var brand = this.ipbrand.nativeElement.value;
    var title = this.iptitle.nativeElement.value;
    var modelnumber = this.ipmodelnumber.nativeElement.value;
    var returnperiod = this.ipreturnperiod.nativeElement.value;
    var warrantyperiod = this.ipwarrantyperiod.nativeElement.value;
    var identifier = this.ipidentifier.nativeElement.value;
    var productimg = this.ipproductimg.nativeElement.value;
    var launchdate = this.iplaunchdate.nativeElement.value;
    var purchasedate = this.ippurchasedate.nativeElement.value;
    var tokenID = this.iphidden.nativeElement.value;
    // while(tokenID == "")
    // {
    //   await this.delay(1000);
    //   tokenID = this.iphidden.nativeElement.value;
    // }
    console.log(tokenID)
    addDoc(dbInsance,{
      brand: brand.toString(),
      title: title.toString(),
      modelnumber: modelnumber.toString(),
      returnperiod: returnperiod.toString(),
      warrantyperiod: warrantyperiod,
      identifier: identifier.toString(),
      image: productimg.toString(),
      launchdate: launchdate,
      purchasedate: purchasedate,
      tokenID: tokenID
    })
    .then(() => {
      alert('Data Added');
    })
    .catch((err) => {
      alert(err.message);
    })
  }

  
  ngOnInit(): void {
  }

}
