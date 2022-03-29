import { Component, OnInit } from '@angular/core';
import {ContactService} from "../../frontend/service/contact.service";
import { Subscription} from "rxjs";
import {Contact} from "../../frontend/models/contact.model";

@Component({
  selector: 'app-contact-view',
  templateUrl: './contact-view.component.html',
  styleUrls: ['./contact-view.component.css']
})
export class ContactViewComponent implements OnInit {

  public contactsSub: Subscription;
  public contacts: Contact[] = [];

  constructor(public contactService: ContactService ) { }

  ngOnInit(){

    this.contactService.getContacts();
    this.contactsSub = this.contactService.getContactsUpdateListener().subscribe((contacts: Contact[])=>{
      this.contacts = contacts;
    });

  }

  onDelete(contactId: string){
    this.contactService.deleteContact(contactId);
  }

  onStar(contactId: string){
    this.contactService.starContact(contactId).subscribe(contact =>{
      console.log(contact);
    });
  }

}
