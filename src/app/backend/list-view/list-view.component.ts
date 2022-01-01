import { Component, OnInit, OnDestroy } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {AdminService} from "../../frontend/service/admin.service";


@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit, OnDestroy {

  public adminDetails: any;


  constructor(public dialogRef: MatDialogRef<ListViewComponent>, public adminService: AdminService) { }

  ngOnInit(){
    this.adminDetails = this.adminService.getModalAdmin();
    console.log(this.adminDetails);
  }

  ngOnDestroy() {

  }

  onClose(){
    this.dialogRef.close();
  }

}
