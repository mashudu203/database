import { Component } from '@angular/core';
import {NgForm} from '@angular/forms';
import {DatabaseService} from './services/database.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'database';

  persons: any;
  constructor(public _data: DatabaseService) { }

  AddUsers(UserData : NgForm){
// add to database
//this._data.AddUser(UserData.value);
  }
  // delete user
  deleteUser(ref){
    this._data.deletepersons(ref);
  }
  ngOnInit(){
    //display data on the database
this._data.GetUsers().valueChanges().subscribe(action =>{
console.log(action);
this.persons=action;

action.map(element=>{
 

 
})
})

  }
}
