import { Injectable } from '@angular/core';
//import {AngularFireModule} from '@angular/fire';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {Item} from './users' ;
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
//import {firestore, auth} from 'firebase';
import{AngularFireAuth} from '@angular/fire/auth';
import { auth } from 'firebase';
import { NgForm } from '@angular/forms';








@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;
  itemDoc: AngularFirestoreDocument<Item>;

  constructor(public _fire:AngularFirestore,public _route : Router,private toastr:ToastrService,private fireAuth: AngularFireAuth,public _routee : ActivatedRoute) {
  // this.items = this._fire.collection('Users').valueChanges();
  
    this.itemsCollection = this._fire.collection('Users', ref => ref.orderBy('id','asc'));

    this.items = this.itemsCollection.snapshotChanges().pipe(
      map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Item;
        data.id = a.payload.doc.id;
        return data;
      });
    })
    );}
    getItems(){
      return this.items;
    }
 
  // FUNction to add user
  Users:any[];
  Ref:any;
  AddUser(data,username,rname){
    this._fire.collection('Users', ref=>ref.where('name','==',username).where('surname','==',rname)).get().forEach(element=>{
      if(element.empty)
      {
        return this._fire.collection('Users').add(data).then(result=>{
          this.toastr.success('successfully added new user','');
  console.log('successfully added user')
}).catch(err=>{

console.log('error occered:',err)
});

      }
      else{
        this.toastr.error('user exists','');
        console.log('user exist');

      }
    })
  }
    
      // if statement to check if the user exists.
     // if(element.empty){
     //return this._fire.collection('Users').add(data).then(result=>{
  //console.log('successfully added user')
//}).catch(err=>{
//console.log('error occered:',err)
//});
     // }
      //else
      //{
        //console.log('the user exists');
      //}
    //}
  
    
  //get data from database

  GetUsers(){
  return  this._fire.collection('Users');
  }
  // function for displaying single 
 getUserdetailes(ref){

  return this._fire.collection('Users').doc(ref);
  }
  // function for updating a user
  updateUser(ref,data){
   this._fire.collection('Users').doc(ref).update(data).then(result=>{
    this.toastr.success('user updated','');
    console.log('successfully updated user')
   }).catch(err=>{
   
    console.log('error occered:',err)
  });
  }

  //delete fumction
  deletepersons(ref){
return this._fire.collection('Users').doc(ref).delete().then(result=>{
  this._route.navigate(['/landing']);
  this.toastr.success('successfully deleted','');
  console.log('succefully deleted')
}).catch(error=>{
  
  console.log('not deleted:,',error)
})
  }

  Register(data,email,password,){
    this.fireAuth.createUserWithEmailAndPassword(email,password).then( cred=>{
   // return this._fire.collection('Users').doc(cred.user.uid).set({ name:Userdata[name].value})
      console.log('succeful registerd user')
    }).catch(err=>{
      console.log('Error',err.message)
      console.log('Error',err.code)
    })
  }
  login(email,password){
    this.Ref =this._routee.snapshot.paramMap.get('ref');
    this.fireAuth.signInWithEmailAndPassword(email,password).then(info=>{
      this._route.navigate(['details/:ref']);
    console.log('succefully login', info)

    }).catch(info=>{
      console.log('smothing went wrong',info.message)
    })
  }
  logginGoogle(){
    let provider=new auth.GoogleAuthProvider();
    this.fireAuth.signInWithPopup(provider).then( ()=>{
      console.log('login with google')
    }).catch(err=>{
      console.log('err',err.message)
    })
  }
  logout(){
    this.fireAuth.signOut().then(  ()=>{
      this._route.navigate(['landing/']);
      console.log('succefully singed out')
    }).catch(err =>{
      console.log('Err',err.message)
    })
  }
}
