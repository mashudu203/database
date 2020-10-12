import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {NgForm} from '@angular/forms';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  persons: any;
  Ref:any;
  msg:any="";
  constructor(public _data: DatabaseService,public _route : ActivatedRoute) { }

  AddUsers(UserData : NgForm){
// add to database
this._data.AddUser(UserData.value);
this.msg = "Record is successfully added..... "; 
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
 
  ngOnInit(){
    //display data on the database
    
this._data.GetUsers().snapshotChanges().subscribe(action =>{
console.log(action);
this.persons=action;
})

  }
}
