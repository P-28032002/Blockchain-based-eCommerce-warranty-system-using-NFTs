import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './../shared/user.service';
import { ServerHandlerService } from './../../services/http/server-handler.service';
import { addDoc, updateDoc, Firestore, collection, getDocs, query, where, doc } from "@angular/fire/firestore";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-redeempage',
  templateUrl: './redeempage.component.html',
  styleUrls: ['./redeempage.component.css']
})
export class RedeempageComponent implements OnInit {

  constructor(public firestore: Firestore, private _router: Router) { }
  public user_name: string;
  public coins: number;
  public items: any;
  ngOnInit(): void {
    const user_email = localStorage.getItem('user_email')!;
    if(!user_email){
      this._router.navigateByUrl('/authenticate');
    }
    this.user_name = user_email.substring(0,user_email.indexOf('@'));
    console.log(this.user_name);
    this.getCoins();
    this.getRedeemItems();
  }

  getRedeemItems(){
    const dbInstance = collection(this.firestore, 'redeem_items');
    getDocs(dbInstance)
    .then((response)=>{
      console.log(response);
      this.items = [...response.docs.map((item)=>{
        var body: any = {}
        body = {...item.data(), id: item.id};
        return body;
      })]
    })
  }

  getCoins(){
    const user_email = localStorage.getItem('user_email')!;
    const dbInstance = collection(this.firestore, 'users');
    getDocs(dbInstance)
    .then((response)=>{
      console.log(response);
      var users: any;
      users = [...response.docs.map((user)=>{
        return {...user.data(), id: user.id};
      })]
      console.log(users);
      for(var i=0;i<users.length;i++){
        if(users[i].email == user_email){
          this.coins = users[i].block_coins;
        }
      }
    })
  }

  redeemItem(event){
    const price = event.target.id;
    if(this.coins>=price){
      const user_email = localStorage.getItem('user_email')!;
      const dbInstance = collection(this.firestore, 'users');
      getDocs(dbInstance)
      .then((response)=>{
        console.log(response);
        var users: any;
        users = [...response.docs.map((user)=>{
          return {...user.data(), id: user.id};
        })]
        var id=""
        for(var i=0;i<users.length;i++){
          if(users[i].email == user_email){
            id=users[i].id;
            break;
          }
        }
        this.coins = this.coins - price;
        const dataToUpdate = doc(this.firestore, 'users', id);
        console.log(this.coins);
        updateDoc(dataToUpdate, {
          block_coins: this.coins
        })
        .then((res)=>{
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Purchase was Successful!',
            confirmButtonColor: "#FE5E5E",
            showCancelButton: false
          });
        })
      })
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Error Occurred',
        text: 'Insufficient Block Coins!',
        confirmButtonColor: "#FE5E5E",
        showCancelButton: false
      });
    }
  }

  logout(){
    localStorage.removeItem('user_email');
    this._router.navigateByUrl('/authenticate');
  }

}
