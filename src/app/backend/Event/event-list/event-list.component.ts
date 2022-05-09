import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {EventService} from "../../../frontend/service/event.service";

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit{

  public eventDetails: any | null;
  public eventAdmin: any | null;
  isLoading = false;

  constructor(public dialogRef: MatDialogRef<EventListComponent>, public eventService: EventService) { }

  ngOnInit(){
    this.isLoading = true;
    this.eventDetails = this.eventService.getModalEvent();
    this.isLoading = false;
  }

  onClose(){
    this.dialogRef.close();
  }

}
