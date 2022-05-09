import {Component, OnDestroy, OnInit} from '@angular/core';
import {Event} from "../../../frontend/models/event.model";
import {Subscription} from "rxjs";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {EventService} from "../../../frontend/service/event.service";
import {EventListComponent} from "../event-list/event-list.component";

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.css']
})
export class EventViewComponent implements OnInit {

  events: Event[] =[];
  private eventsSub: Subscription;
  public modalEvent : any | null;
  isLoading = false;

  constructor(public eventService: EventService,
              private Dialog: MatDialog) { }

  ngOnInit(){
    this.isLoading = true;
    this.eventService.getEvents();
    this.eventsSub = this.eventService.getEventsUpdateListener().subscribe((events: Event[])=>{
      this.events = events;
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    this.eventsSub.unsubscribe();
  }

  onDelete(eventId: string){
    this.eventService.deleteEvent(eventId);
  }

  openViewModal(event : any){
    this.isLoading = true;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = "40%";
    this.Dialog.open(EventListComponent, dialogConfig);
    this.eventService.addModalEvent(event);
    this.isLoading = false;
  }

}
