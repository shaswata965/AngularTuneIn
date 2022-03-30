import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {ContactService} from "../../frontend/service/contact.service";

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  public contact: any | null;

  constructor(public dialogRef: MatDialogRef<ContactListComponent>, public contactService: ContactService) { }

  ngOnInit(){
    this.contact = this.contactService.getModalContact();
  }

  onClose(){
    this.dialogRef.close();
  }

}
