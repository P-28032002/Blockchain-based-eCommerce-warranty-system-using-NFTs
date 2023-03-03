import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './../shared/user.service';
import { ServerHandlerService } from './../../services/http/server-handler.service';
import { addDoc, Firestore, collection, getDocs, query, where } from "@angular/fire/firestore";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public firestore: Firestore, private userService: UserService, private _router: Router, private handler: ServerHandlerService) { }
  public user_name: string;
  public score: number;
  public problems: any;
  public items: any;
  public user_items: any;
  public coins: number;
  ngOnInit(): void {
    const user_email = localStorage.getItem('user_email')!;
    if(!user_email){
      this._router.navigateByUrl('/authenticate');
    }
    this.user_name = user_email.substring(0,user_email.indexOf('@'));
    console.log(this.user_name);
    this.getItems();
    this.coins = 0;
    this.getCoins();
  }

  getCoins(){
    const user_email = localStorage.getItem('user_email')!;
    const dbInstance = collection(this.firestore, 'users');
    console.log("Hello");
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

  logout(){
    localStorage.removeItem('user_email');
    this._router.navigateByUrl('/authenticate');
  }

  getItems(){
    const dbInstance = collection(this.firestore, 'items');
    getDocs(dbInstance)
    .then((response)=>{
      console.log(response);
      this.items = [...response.docs.map((item)=>{
        var body: any = {}
        body = {...item.data(), id: item.id};
        body.bought = 0;
        return body;
      })]
      console.log(this.items);
      const user_email = localStorage.getItem('user_email')!;
      const dbUserItems = query(collection(this.firestore, "user_cart_items"), where("email", "==", user_email));
      getDocs(dbUserItems)
      .then((response)=>{
        this.user_items = [...response.docs.map((item)=>{
          return {...item.data(), id:item.id};
        })]
        for(var j=0;j<this.user_items.length;j++){
          for(var i=0;i<this.items.length;i++){
            if(this.items[i].id==this.user_items[j].item_id){
              this.items[i].bought = 1
            }
          }
        }
        console.log(this.items);
      })
    })
  }

  addToCart(event){
    const user_email = localStorage.getItem('user_email')!;
    const dbInstance = collection(this.firestore, 'user_cart_items');
    const item_id = event.target.id;
    var value = {
      email: user_email,
      item_id: item_id
    };
    addDoc(dbInstance, value)
    .then(()=>{
      for(var i=0;i<this.items.length;i++){
        if(this.items[i].id == item_id) {
          this.items[i].bought = 1;
          break;
        }
      }
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Item added to cart!',
        confirmButtonColor: "#FE5E5E",
        showCancelButton: false
      });
    })
    .catch(()=>{
      Swal.fire({
        icon: 'error',
        title: 'Error Occurred',
        text: 'Please try again!',
        confirmButtonColor: "#FE5E5E",
        showCancelButton: false
      });
    })
  }
}
