import { Component, OnInit } from '@angular/core';
import{MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../frontend/service/user.service";

@Component({
  selector: 'app-general-user-view',
  templateUrl: './general-user-view.component.html',
  styleUrls: ['./general-user-view.component.css']
})
export class GeneralUserViewComponent implements OnInit {

  public userDetails: any | null;

  constructor(public userService: UserService, public dialogRef: MatDialogRef<GeneralUserViewComponent>) { }

  ngOnInit(){
    this.userDetails = this.userService.getModalUser();
    console.log(this.userDetails);
  }

  onClose(){
    this.dialogRef.close();
  }

}
