import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {mimeType} from "../../backend/admin-signup/signup/mime-type.validator";
import {ContactService} from "../service/contact.service";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  public currentTime: string | null;

  form: FormGroup;

  constructor( public contactService: ContactService ) { }



  ngOnInit(){

    this.form = new FormGroup({
      'firstName': new FormControl(null, {validators: [Validators.required]}),
      'lastName': new FormControl(null,{validators:[Validators.required]}),
      'email': new FormControl(null,{validators:[Validators.required]}),
      'subject': new FormControl(null,{validators:[Validators.required]}),
      'text': new FormControl(null,{validators: [Validators.required], asyncValidators: [mimeType]})
    });

  }

  createContact(){
    if(this.form.invalid){
      return
    }
    let date =new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    let ampm = h >= 12 ? 'pm' : 'am';
    let hour = h % 12;
    hour = hour ? hour : 12;
    let mm = m < 10 ? '0' + m : m;

    this.currentTime = hour + ":" + mm + ampm;

      this.contactService.addMessage(this.form.value.firstName, this.form.value.lastName, this.form.value.email, this.form.value.subject, this.form.value.text, this.currentTime);
    this.form.reset();
  }

}
