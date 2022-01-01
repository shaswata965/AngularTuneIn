import { Component, OnInit } from '@angular/core';
import {AdminService} from "../../frontend/service/admin.service";
import {Admin} from "../../frontend/models/admin.model";
import {Subscription} from "rxjs";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ListViewComponent} from "../list-view/list-view.component";

@Component({
  selector: 'app-backend-admin-list',
  templateUrl: './backend-admin-list.component.html',
  styleUrls: ['./backend-admin-list.component.css']
})
export class BackendAdminListComponent implements OnInit {

  admins: Admin[] =[];
  private adminsSub: Subscription | undefined;
  public modalAdmin : any | null;

  constructor(public adminsService: AdminService,
              private Dialog: MatDialog) { }

  ngOnInit() {
    this.adminsService.getAdmins();
    this.adminsSub = this.adminsService.getAdminsUpdateListener().subscribe((admins: Admin[])=>{
      this.admins = admins;
      console.log(this.admins);
    });
  }

  ngOnDestroy() {
    // @ts-ignore
    this.adminsSub.unsubscribe();
  }

  onDelete(adminId: string){
    this.adminsService.deleteAdmin(adminId);
  }

  openViewModal(admin : any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = "40%";
    this.Dialog.open(ListViewComponent, dialogConfig);
    this.adminsService.addModalAdmin(admin);
  }

}
