import { Injectable } from '@angular/core';
//import {AngularFireModule} from '@angular/fire';
import {AngularFirestore} from '@angular/fire/firestore';
import { identity } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(public _fire:AngularFirestore) { }

  // FUNction to add user
  Users:any[];
  AddUser(data){
   return this._fire.collection('Users').add(data).then(result=>{
     console.log('successfully added user')
   }).catch(err=>{
     console.log('error occered:',err)
   });
  }
  //get data from database
  GetUsers(){
  return  this._fire.collection('Users');
  }
  // function for displaying single 
 getUserdetailes(ref){

  return this._fire.collection('Users').doc(ref);
  }
  // function for updating a user
  updateUser(ref, UserData){
  this._fire.collection('Users').doc('UserData'+ref).update(UserData).then(result=>{
  console.log('successfully added user')
}).catch(err=>{
  console.log('error occered:',err)
});
  }

  //delete fumction
  deletepersons(ref){
return this._fire.collection('Users').doc(ref).delete().then(result=>{
  console.log('succefully deleted')
}).catch(error=>{
  console.log('not deleted:,',error)
})
  }
}
