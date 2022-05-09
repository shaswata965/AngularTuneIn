import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {Contact} from "../../../frontend/models/contact.model";
import {ContactService} from "../../../frontend/service/contact.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ContactListComponent} from "../contact-list/contact-list.component";

@Component({
  selector: 'app-contact-starred',
  templateUrl: './contact-starred.component.html',
  styleUrls: ['./contact-starred.component.css']
})
export class ContactStarredComponent implements OnInit {

  public contactsSub: Subscription;
  public contacts: Contact[] = [];
  isLoading = false;

  constructor(public contactService: ContactService, private Dialog: MatDialog ) { }

  ngOnInit(){
    this.isLoading = true;
    this.contactService.getContacts();
    this.contactsSub = this.contactService.getContactsUpdateListener().subscribe((contacts: Contact[])=>{
      let contact = [];
      for(let i = 0; i< contacts.length ; i++){
        if(contacts[i].starred === "Yes"){
          contact.push(contacts[i]);
        }
      }
      this.contacts = contact;
      this.isLoading = false;
    });

  }

  onDelete(contactId: string){
    this.contactService.deleteContact(contactId);
  }

  openViewModal(contact : any){
    this.isLoading = true;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = "60%";
    this.Dialog.open(ContactListComponent, dialogConfig);
    this.contactService.addModalContact(contact);
    this.isLoading = true;
  }

}
