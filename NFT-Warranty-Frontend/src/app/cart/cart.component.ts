import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './../shared/user.service';
import { ServerHandlerService } from './../../services/http/server-handler.service';
import { updateDoc, addDoc, Firestore, collection, getDocs, query, where, deleteDoc, doc } from "@angular/fire/firestore";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(public firestore: Firestore, private _router: Router) { }
  public user_name: string;
  public items: any;
  public total_price: number;
  ngOnInit(): void {
    const user_email = localStorage.getItem('user_email')!;
    if(!user_email){
      this._router.navigateByUrl('/authenticate');
    }
    this.user_name = user_email.substring(0,user_email.indexOf('@'));
    console.log(this.user_name);
    this.getCartItems();
  }

  logout(){
    localStorage.removeItem('user_email');
    this._router.navigateByUrl('/authenticate');
  }

  getCartItems(){
    this.total_price = 0;
    const user_email = localStorage.getItem('user_email')!;
    const dbUserItems = query(collection(this.firestore, "user_cart_items"), where("email", "==", user_email));
    getDocs(dbUserItems)
    .then((response)=>{
      var bought_items: any;
      bought_items = [...response.docs.map((item)=>{
        var body: any = {}
        body = {...item.data(), id: item.id};
        // body.bought = 0;
        return body;
      })]
      const dbInstance = collection(this.firestore, "items");
      getDocs(dbInstance)
      .then((response)=>{
        var available_items: any;
        available_items = [...response.docs.map((item)=>{
          var body: any = {}
          body = {...item.data(), id: item.id};
          // body.bought = 0;
          return body;
        })]
        this.items = [];
        for(var item of bought_items){
          for(var available_item of available_items){
            if(item.item_id == available_item.id){
              this.items.push({...available_item, record_id: item.id});
            }
          }
        }
        console.log(this.items);
        var price = 0;
        for(var i=0;i<this.items.length;i++){
          price = price + this.items[i].price;
        }
        this.total_price = price;
        console.log(this.total_price);
      })
    })
  }

  async buyItems(){
    const user_email = localStorage.getItem('user_email')!;
    const dbUserItems = collection(this.firestore, "user_items");
    for(var i=0;i<this.items.length;i++){
      var value = {...this.items[i], email: user_email};
      const res = await addDoc(dbUserItems, value);
      console.log(res);
    }
    for(var i=0;i<this.items.length;i++){
      const dataToDelete = doc(this.firestore, 'user_cart_items', this.items[i].record_id);
      const res = await deleteDoc(dataToDelete);
    }
    const dbInstance = collection(this.firestore, "users");
    var redeem_coins = Math.floor((this.total_price*3)/10);
    const res = await getDocs(dbInstance);
    var users: any;
    users = [...res.docs.map((item)=>{
      var body: any = {}
      body = {...item.data(), id: item.id};
      return body;
    })]
    var coins = 0,id="";
    for(var i=0;i<users.length;i++){
      if(users[i].email == user_email){
        coins = users[i].block_coins;
        id = users[i].id;
        break;
      }
    }
    coins = coins + redeem_coins;
    const dataToUpdate = doc(this.firestore, 'users', id);
    await updateDoc(dataToUpdate, {
      block_coins: coins
    })
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Payment was successful!',
      confirmButtonColor: "#FE5E5E",
      showCancelButton: false
    });
  }
}
