import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './../shared/user.service';
import { ServerHandlerService } from './../../services/http/server-handler.service';
import { addDoc, Firestore, collection, getDocs, query, where, deleteDoc, doc } from "@angular/fire/firestore";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nft',
  templateUrl: './nft.component.html',
  styleUrls: ['./nft.component.css']
})
export class NftComponent implements OnInit {

  constructor(public firestore: Firestore, private _router: Router) { }
  public user_name: string;
  public items: any;

  ngOnInit(): void {
    const user_email = localStorage.getItem('user_email')!;
    if(!user_email){
      this._router.navigateByUrl('/authenticate');
    }
    this.user_name = user_email.substring(0,user_email.indexOf('@'));
    console.log(this.user_name);
    this.getUserItems();
  }

  logout(){
    localStorage.removeItem('user_email');
    this._router.navigateByUrl('/authenticate');
  }

  getUserItems(){
    const dbInstance = collection(this.firestore, 'user_items');
    getDocs(dbInstance)
    .then((response)=>{
      console.log(response);
      this.items = [...response.docs.map((item)=>{
        var body: any = {}
        body = {...item.data(), id: item.id};
        body.bought = 0;
        return body;
      })]
    })
  }

}
