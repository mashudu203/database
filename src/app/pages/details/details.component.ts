import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { ActivatedRoute } from '@angular/router';
import {Item} from '../../services/users' ;
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  items: Item[];
  editState: boolean = false;
  itemToEdit: Item;

  persons: any;
  person: any;
  Subject:any;
  Ref:any;
  Reff:any;
  msg:any="";
  mash:any="";
  
  constructor(public _data: DatabaseService, public _route : ActivatedRoute) { }

  ngOnInit(): void {
    this._data.getItems().subscribe(items => {
      console.log(items+"udu");
      this.items = items;
    });
    //display users data

    this._data.GetUsers().snapshotChanges().subscribe(action =>{
      console.log(action);
      this.person=action;
    
      })
      // display single users data
      this.Ref =this._route.snapshot.paramMap.get('ref');
    //console.log('Ref:',this.Ref);
      //this.Subject=this._data.getUserdetailes(this.Ref).snapshotChanges().subscribe(action=>{
        //console.log(action);
        //this.person=action;
      //})
      this._data.getUserdetailes(this.Ref).valueChanges().subscribe(action =>{
        console.log(action);
        this.persons=action;
         
        

        })
        
  }
 // Updateusers
Update(UserData : NgForm){
  
  
this._data.updateUser(this.Ref,UserData.value);
this.msg = "user updated..... "; 

    
} 
clearState(){
  this.editState = false;
  this.itemToEdit = null;
}

editItem(event, item: Item){
  this.editState = true;
  this.itemToEdit = item;
}
// delete user
deleteUser(ref){
  this.Ref =this._route.snapshot.paramMap.get('ref');
  this._data.deletepersons(this.Ref);
  this.mash = "user deleted..... "; 
}
}
