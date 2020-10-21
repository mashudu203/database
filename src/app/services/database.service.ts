import { Injectable } from '@angular/core';
//import {AngularFireModule} from '@angular/fire';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {Item} from './users' ;
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';






@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;
  itemDoc: AngularFirestoreDocument<Item>;

  constructor(public _fire:AngularFirestore,public _route : Router,private toastr:ToastrService) {
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
}
