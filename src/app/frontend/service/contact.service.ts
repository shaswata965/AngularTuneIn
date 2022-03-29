import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Contact} from "../models/contact.model";
import {map} from "rxjs/operators";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ContactService{

  private contacts: Contact[]=[];
  private contactsUpdated = new Subject<Contact []>();

  constructor(private http: HttpClient, private router: Router) {}

  addMessage(firstName:string, lastName:string, email:string, subject:string, text: string, time: string){
    let messageData : Contact | FormData ;
    // @ts-ignore
    messageData = {firstName:firstName, lastName:lastName, email: email, subject: subject, text: text, currentTime: time}
    this.http.post<{message: string}>('http://localhost:3000/api/contacts', messageData)
      .subscribe((Data)=>{
        this.router.navigate(['/']);
      });
  }

  getContacts(){
    this.http.get<{message:string, contacts: any }>(
      "http://localhost:3000/api/contacts"
    ).pipe(map((contactData)=>{
      // @ts-ignore
      return contactData.contacts.map(contact=>{
        return{
          firstName: contact.firstName,
          lastName: contact.lastName,
          email: contact.email,
          subject: contact.subject,
          text: contact.text,
          starred: contact.starred,
          id: contact._id,
          currentTime: contact.currentTime
        };
      });
    }))
      .subscribe(contacts=>{
        this.contacts = contacts;
        this.contactsUpdated.next([...this.contacts]);
      });
  }

  getContactsUpdateListener(){
    return this.contactsUpdated.asObservable();
  }

  deleteContact(contactId:string){
    this.http.delete("http://localhost:3000/api/contacts/" +contactId)
      .subscribe(()=>{
        const updatedContacts = this.contacts.filter(a=> a.id !=contactId);
        this.contacts = updatedContacts;
        this.contactsUpdated.next([...this.contacts]);
      });
  }

  starContact(contactId: string | null){
    let starred = "Yes";
    return this.http.get<{
      _id:string, firstName:string, lastName:string, email: string, subject:string, text:string, starred:string, currentTime: string}>("http://localhost:3000/api/contacts/starred/" +contactId + "/" + starred);
  }


}
