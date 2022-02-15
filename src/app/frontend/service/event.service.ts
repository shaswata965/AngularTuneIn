import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Subject} from "rxjs";
import {map} from "rxjs/operators";
import {Event} from "../models/event.model";
import {Language} from "../models/language.model";

@Injectable({
  providedIn: 'root'
})
export class EventService{

  private events: Event[] = [];
  private eventsUpdated = new Subject<Event []>();

  private modalEvent: any | null;

  public eventAdmin: any | null;
  public eventAdminUpdated = new Subject<any>();

  constructor(private http: HttpClient, private router: Router) { }

  addEvent(title:string, description:string, admin:string, eventDate:string, eventMonth:string, currentTime:string, currentAdmin:string){
    let eventData : Event | FormData ;
    // @ts-ignore
    eventData = {title:title, description:description, admin:admin, eventDate:eventDate, eventMonth:eventMonth, currentTime:currentTime, currentAdmin:currentAdmin}
    this.http.post<{message: string}>('http://localhost:3000/api/events', eventData)
      .subscribe((Data)=>{
        this.router.navigate(['/view-event']);
      });
  }

  updateEvent(id: string | null, title: string, description: string, admin:string, eventDate:string, eventMonth:string, currentTime:string, currentAdmin:string){
    let eventData : Event | FormData ;
    // @ts-ignore
    eventData = {id:id, title:title, description:description, admin:admin, eventDate:eventDate, eventMonth:eventMonth, currentTime:currentTime, currentAdmin:currentAdmin}
    this.http.put("http://localhost:3000/api/events/" +id, eventData)
      .subscribe(response=>{
        const updatedEvent = [...this.events];
        const oldEventIndex = updatedEvent.findIndex(a => a.id === id);
        // @ts-ignore
        const event: Event = {id:id, title:title, description: description, admin:admin, eventDate:eventDate, eventMonth:eventMonth, currentAdmin:currentAdmin, currentTime:currentTime}
        updatedEvent[oldEventIndex] = event;
        this.events = updatedEvent;
        this.eventsUpdated.next([...this.events]);
        this.router.navigate(['/view-event']);
      });
  }

  getEvents(){
    this.http.get<{message:string, events: any }>(
      "http://localhost:3000/api/events"
    ).pipe(map((eventData)=>{
      // @ts-ignore
      return eventData.events.map(event=>{
        return{
          title: event.title,
          description: event.description,
          admin: event.admin,
          eventDate: event.eventDate,
          eventMonth: event.eventMonth,
          currentAdmin: event.currentAdmin,
          currentTime: event.currentTime,
          id: event._id,
        };
      });
    }))
      .subscribe(events=>{
        this.events = events;
        this.eventsUpdated.next([...this.events]);
      });
  }

  getEventsUpdateListener(){
    return this.eventsUpdated.asObservable();
  }

  deleteEvent(eventId:string){
    this.http.delete("http://localhost:3000/api/events/" +eventId)
      .subscribe(()=>{
        const updatedEvents = this.events.filter(a=> a.id !=eventId);
        this.events = updatedEvents;
        this.eventsUpdated.next([...this.events]);
      });
  }

  addModalEvent(event: any){
    this.modalEvent = event;
  }

  getModalEvent(){
    return this.modalEvent;
  }

  getEventAdminUpdateListener(){
    return this.eventAdminUpdated.asObservable();
  }

  getEditEvent(eventId: string | null){
    return this.http.get<{_id:string, title:string, description: string, admin:string,}>("http://localhost:3000/api/events/" +eventId);
  }

}
