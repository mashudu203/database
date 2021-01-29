import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {NgForm} from '@angular/forms';
import { DatabaseService } from 'src/app/services/database.service';
import { Item} from './../../services/users'
import { ToastrService } from 'ngx-toastr';
 





@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  persons: any;
  Ref:any;
  msg:any="";
  Userinfo:any;
  member:any;
Name:any;
Surname:any;
  constructor(public _data: DatabaseService,public _route : ActivatedRoute,private toastr:ToastrService) { }

  AddUsers(UserData : NgForm){
// add to database
     
this._data.AddUser(UserData.value,UserData.value.name,UserData.value.surname);

      
  }
  // delete user
  deleteUser(ref){
    this.Ref =this._route.snapshot.paramMap.get('ref');
    this._data.deletepersons(ref);
  }
  //update
  Update(ref){
    this.Ref =this._route.snapshot.paramMap.get('ref');
    this.Update(this.Ref);
      
  }
  signinwithGoogle(){
    this._data.logginGoogle();
  }
  logout(){
    this._data.logout();
  }
  Register(UserData : NgForm){
  
this._data.Register(UserData.value,UserData.value.email,UserData.value.password);

  }
  login(UseerData : NgForm){
    this._data.login(UseerData.value.email,UseerData.value.password);
  }
  ngOnInit(){
    //display data on the database

 
this._data.GetUsers().snapshotChanges().subscribe(action =>{
console.log(action);
this.persons=action;


  
})




  }
}
