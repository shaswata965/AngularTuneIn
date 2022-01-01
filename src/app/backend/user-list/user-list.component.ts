import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {UserService} from "../../frontend/service/user.service";
import {User} from "../../frontend/models/user.model";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {GeneralUserViewComponent} from "../general-user-view/general-user-view.component";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[] =[];
  private usersSub: Subscription | undefined;

  constructor(public usersService: UserService, public Dialog: MatDialog) { }

  ngOnInit() {
    this.usersService.getUsers();
    this.usersSub = this.usersService.getUsersUpdateListener().subscribe((users: User[])=>{
      this.users = users;
      console.log(this.users);
    });
  }

  ngOnDestroy() {
    // @ts-ignore
    this.usersSub.unsubscribe();
  }

  onDelete(userId: string){
    this.usersService.deleteUser(userId);
  }

  openViewModal(user : any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = "40%";
    this.Dialog.open(GeneralUserViewComponent, dialogConfig);
    this.usersService.addModalUser(user);
  }

}
