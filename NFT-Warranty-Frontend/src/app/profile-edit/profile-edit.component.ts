import { Component, OnInit, ViewChild} from '@angular/core';
import { getDocs, doc, updateDoc, collection, Firestore, query, where} from '@angular/fire/firestore';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit{
  title = 'angular-firebase';
  public data: any;
  constructor(public firestore: Firestore) { 
    this.getData();
  }
  @ViewChild('myfirstname') ipfirstname: any;
  @ViewChild('mymiddlename') ipmiddlename: any;
  @ViewChild('mylastname') iplastname: any;
  @ViewChild('mygender') ipgender : any;
  @ViewChild('myemail') ipemail : any;
  @ViewChild('myaddress') ipaddress : any;
  @ViewChild('myphno') ipphno : any;
  @ViewChild('mypublicwalletid') ippublicwalletid : any;
  @ViewChild('mydob') ipdob : any;
  @ViewChild('myotherinfo') ipotherinfo : any;
  @ViewChild('myprofilephoto') ipprofilephoto : any;
  getData(){
    const q = query(collection(this.firestore, 'users'), where("email", "==", localStorage.getItem('user_email')!));
    getDocs(q)
    .then((response) => {
      this.data = response.docs.map((item) =>{
        return { ...item.data(), id: item.id, dob: new Date(item.data().dob.seconds * 1000)};
      }
      )
      console.log(this.data)
  })
}
  updateData(id: string){
    const dataToUpdate = doc(this.firestore, 'users', id);
    var first_name = this.ipfirstname.nativeElement.value;
    var middle_name = this.ipmiddlename.nativeElement.value;
    var last_name = this.iplastname.nativeElement.value;
    var gender = this.ipgender.nativeElement.value;
    var address = this.ipaddress.nativeElement.value;
    var mobile_no = this.ipphno.nativeElement.value;
    var public_id_wallet = this.ippublicwalletid.nativeElement.value;
    var profile_photo = this.ipprofilephoto.nativeElement.value;
    var other_info = this.ipotherinfo.nativeElement.value;
    var dob = this.ipdob.nativeElement.value;
    updateDoc(dataToUpdate, {
      first_name: first_name.toString(),
      middle_name: middle_name.toString(),
      last_name: last_name.toString(),
      gender: gender.toString(),
      address: address.toString(),
      mobile_no: mobile_no.toString(),
      public_id_wallet: public_id_wallet.toString(),
      profile_photo: profile_photo.toString(),
      other_info: other_info.toString(),
      dob: dob
    })
    .then(() => {
      console.log('Data Updated');
    })
    .catch((err) => {
      console.log(err.message);
    })

    // updateDoc(dataToUpdate, {
    //   first_name: 'Pratham',
    //   middle_name: 'Bharat',
    //   last_name: 'Sharma',
    //   gender: '',
    //   address: '',
    //   mobile_no: '',
    //   public_id_wallet: '',
    //   profile_photo: '',
    //   other_info: 'My name is pratham',
    //   dob: '2022-07-22'
    // })
    // .then(() => {
    //   alert('Data Updated');
    // })
    // .catch((err) => {
    //   alert(err.message);
    // })
  }

  ngOnInit(): void {
  }
}
