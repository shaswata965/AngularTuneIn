import { Component, OnInit } from '@angular/core';
import {AdminService} from "../../frontend/service/admin.service";
import {Admin} from "../../frontend/models/admin.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-backend-admin-list',
  templateUrl: './backend-admin-list.component.html',
  styleUrls: ['./backend-admin-list.component.css']
})
export class BackendAdminListComponent implements OnInit {

  admins: Admin[] =[];
  private adminsSub: Subscription | undefined;

  constructor(public adminsService: AdminService) { }

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

}
