import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  persons: any;
  person: any;
  Subject:any;
  Ref:any;
  Reff:any;
  msg:any="";
  constructor(public _data: DatabaseService, public _route : ActivatedRoute) { }

  ngOnInit(): void {
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
Update(UserData){
  this.Ref=this._route.snapshot.paramMap.get('ref');
this._data.updateUser(this.Ref,UserData);

    
} 
// delete user
deleteUser(ref){
  this.Ref =this._route.snapshot.paramMap.get('ref');
  this._data.deletepersons(this.Ref);
  this.msg = "user deleted..... "; 
}
}
