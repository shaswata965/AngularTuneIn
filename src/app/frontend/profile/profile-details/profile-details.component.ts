import { Component, OnInit } from '@angular/core';
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent implements OnInit {

  public currentUser: string | null;
  public currentEmail: string | null;
  public currentImage: string | null;
  public firstName: string | null;

  constructor(public userService: UserService ) { }

  ngOnInit(){
    this.currentUser = this.userService.getThisUser().currentUser;
    let name = ""+this.currentUser;
    let nameArray = [];
    nameArray = name.split(" ");
    let firstNameString = nameArray[0];
    let firstName = firstNameString.replace(/"/g,"");
    this.firstName = firstName;
    this.currentEmail = this.userService.getThisUser().currentEmail;
    this.currentImage = this.userService.getThisUser().currentImage;
  }

}
