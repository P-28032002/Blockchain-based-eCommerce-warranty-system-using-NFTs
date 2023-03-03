import { Component, OnInit } from '@angular/core';
import { getDocs, collection, Firestore, query, where, onSnapshot, doc, updateDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  title = 'angular-firebase';
  public data: any;
  constructor(public firestore: Firestore, private _router: Router) { 
    this.getData();
  }
  updateProfile(profile: string, id: string){
    const dataToUpdate = doc(this.firestore, 'users', id);
    updateDoc(dataToUpdate, {
      profile_photo: profile,
    })
    .then(() => {
      console.log('Data Updated');
    })
    .catch((err) => {
      console.log(err.message);
    })


  }
  getData(){
    const dbInstance = collection(this.firestore, 'users');
    //const email = localStorage.getItem('user_email')!
    const q = query(collection(this.firestore, 'users'), where("email", "==", localStorage.getItem('user_email')!));
    getDocs(q)
    .then((response) => {
      this.data = response.docs.map((item) =>{
        if (item.data().profile_photo == "")
        {
           this.updateProfile("https://i.pinimg.com/originals/eb/f8/b1/ebf8b11d3f2be47d1a5f435d324bd85d.jpg", item.id);
        }
        console.log(item.data().profile_photo)
        return { ...item.data(), id: item.id}
      }
      )
      console.log(this.data)

    })
  }
  ngOnInit(): void {
  }

  redirect(){
    this._router.navigateByUrl('/profile-edit');
  }

}
