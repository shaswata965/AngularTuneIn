import { Component, OnInit, OnDestroy } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {AdminService} from "../../../frontend/service/admin.service";


@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit, OnDestroy {

  public adminDetails: any;
  isLoading = false;

  constructor(public dialogRef: MatDialogRef<ListViewComponent>, public adminService: AdminService) { }

  ngOnInit(){
    this.isLoading = true;
    this.adminDetails = this.adminService.getModalAdmin();
    this.isLoading = false;
  }

  ngOnDestroy() {

  }

  onClose(){
    this.dialogRef.close();
  }

}
