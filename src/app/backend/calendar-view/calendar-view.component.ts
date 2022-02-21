import {Component, OnDestroy, OnInit} from '@angular/core';
import {TaskService} from "../../frontend/service/task.service";
import {Subscription} from "rxjs";
import {EventService} from "../../frontend/service/event.service";

@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.css']
})
export class CalendarViewComponent implements OnInit{

  public selected: any | null;
  public eventsSub: Subscription;
  public events: any;
  public taskDate: any;
  public eventDate: any;
  public upcomingDate: any;
  public upcomingEvents:any;
  public upcomingViewDate: any;
  public newEvent: any;
  public googleEvent: any;
  public eventChecker: any;
  currentUpcomingEvents:any = [];
  public googleCalendarDate: any;
  public googleUpcoming: any;

  constructor(public taskService: TaskService, public eventService: EventService ) { }

  ngOnInit(){
    this.selected = new Date;
    this.taskDate = this.taskDateFormatter(this.selected);
    this.eventDate = this.eventDateFormatter(this.selected);
    this.upcomingDate = this.eventUpcomingFormatter(this.selected);
    this.googleCalendarDate = this.googleDateFormatter(this.selected);
     this.eventService.getEvents();
    this.eventsSub = this.eventService.getCalendarEvent(this.eventDate).subscribe((events:any)=>{
       this.events = events;
     });
    this.eventService.getEvents();
    this.eventService.getUpcomingEvents(this.upcomingDate).subscribe((events:any)=>{
      this.upcomingEvents = events;
      for(let i=0; i< this.upcomingEvents.length; i++){
        let currentEvent = this.upcomingEvents[i];
        let month ='';
        switch(currentEvent.eventMonth){
          case 'Jan':
            month = '01';
            break;
          case 'Feb':
            month = '02';
            break;
          case 'Mar':
            month = '03';
            break;
          case 'Apr':
            month = '04';
            break;
          case 'May':
            month = '05';
            break;
          case 'Jun':
            month = '06';
            break;
          case 'Jul':
            month = '07';
            break;
          case 'Aug':
            month = '08';
            break;
          case 'Sep':
            month = '09';
            break;
          case 'Oct':
            month = '10';
            break;
          case 'Nov':
            month = '11';
            break;
          case 'Dec':
            month = '12';
        }
        let day = currentEvent.eventDate;
        let year = new Date();
        this.upcomingViewDate = day + '-' + month + '-' + year.getFullYear().toString();
        this.newEvent = {
          title: currentEvent.title,
          description: currentEvent.description,
          fullDate: this.upcomingViewDate
        }
        // @ts-ignore
        this.currentUpcomingEvents.push(this.newEvent);
      }
    });

    this.eventService.getEvents();
    this.eventService.getGoogleEvents(this.googleCalendarDate).subscribe((events:any)=>{
      this.eventChecker = events.event;
      console.log(this.eventChecker.length);
      if(events.event.length > 0) {
        this.googleEvent = events.event[0];
        console.log(this.googleEvent.summary);
      }
      else{
        this.googleEvent = events.event;
      }
    });


    this.eventService.getEvents();
    this.eventService.getGoogleUpcomingEvents(this.googleCalendarDate).subscribe((events:any)=>{
      console.log(events.event);
      this.googleUpcoming = events.event;
    });

  }

  changedDate(){
    this.currentUpcomingEvents.splice(0,this.currentUpcomingEvents.length);
    this.googleCalendarDate = this.googleDateFormatter(this.selected);
    this.taskDate = this.taskDateFormatter(this.selected);
    this.eventDate = this.eventDateFormatter(this.selected);
    this.upcomingDate = this.eventUpcomingFormatter(this.selected);
    this.eventService.getEvents();
    this.eventsSub = this.eventService.getCalendarEvent(this.eventDate).subscribe((events:any)=>{
      this.events = events;
    });
    this.eventService.getEvents();
    this.eventService.getGoogleEvents(this.googleCalendarDate).subscribe((events:any)=>{
      this.eventChecker = events.event;
      if(events.event.length > 0) {
        this.googleEvent = events.event[0];
      }
      else{
        this.googleEvent = events.event;
      }
    });
    this.eventService.getEvents();
    this.eventService.getUpcomingEvents(this.upcomingDate).subscribe((events:any)=>{
      this.upcomingEvents = events;
      for(let i=0; i< this.upcomingEvents.length; i++){
        let currentEvent = this.upcomingEvents[i];
        let month ='';
        switch(currentEvent.eventMonth){
          case 'Jan':
            month = '01';
            break;
          case 'Feb':
            month = '02';
            break;
          case 'Mar':
            month = '03';
            break;
          case 'Apr':
            month = '04';
            break;
          case 'May':
            month = '05';
            break;
          case 'Jun':
            month = '06';
            break;
          case 'Jul':
            month = '07';
            break;
          case 'Aug':
            month = '08';
            break;
          case 'Sep':
            month = '09';
            break;
          case 'Oct':
            month = '10';
            break;
          case 'Nov':
            month = '11';
            break;
          case 'Dec':
            month = '12';
        }
        let day = currentEvent.eventDate;
        let year = new Date();
        this.upcomingViewDate = day + '-' + month + '-' + year.getFullYear().toString();
        this.newEvent = {
          title: currentEvent.title,
          description: currentEvent.description,
          fullDate: this.upcomingViewDate
        }
        // @ts-ignore
        this.currentUpcomingEvents.push(this.newEvent);
        console.log(this.currentUpcomingEvents);
      }
    });
    this.eventService.getEvents();
    this.eventService.getGoogleUpcomingEvents(this.googleCalendarDate).subscribe((events:any)=>{
      this.googleUpcoming = events.event;
    });
  }

  taskDateFormatter(date:any){
    let d = date.getDate().toString();
    let dLength = d.length;
    let dd = '';

    let m : string | number = date.getMonth() + 1;
    m = m.toString()
    let mLength = m.length;
    let mm= '';

    if(dLength === 1){
      dd = '0'+ d;
    }else{
      dd =  d;
    }

    if(mLength === 1){
      mm = '0'+ m;
    }else{
      mm =  m;
    }

    let year = date.getFullYear();

    let taskDate = dd+ '-' + mm + '-' + year;

    return taskDate;
  }

  eventDateFormatter(date: any){

    let eventDate = [];

    let d = date.getDate().toString();
    let dLength = d.length;
    let dd = '';

    let mm  = date.getMonth();
    if(dLength === 1){
      dd = '0'+ d;
    }else{
      dd =  d;
    }

    let monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    console.log(monthNames[mm]);

    eventDate.push(dd);
    eventDate.push(monthNames[mm]);

    return eventDate;
  }

  eventUpcomingFormatter(date: any){

    let upcomingDates:any = [];

    let day = date.getDate();
    let tt =  (day+1).toString();
    let nn1 =  (day+2).toString();
    let nn2 = (day+3).toString();

    let tomorrow = '';
    let next1 ='';
    let next2 = '';

    if(tt.length === 1){
      tomorrow = '0' + tt;
    }else{
      tomorrow= tt;
    }

    if(nn1.length === 1){
      next1 = '0' + nn1;
    }else{
      next1= nn1;
    }

    if(nn2.length === 1){
      next2 = '0' + nn2;
    }else{
      next2 = nn2;
    }

    let month =  date.getMonth();

    let d ='';
    let n1 ='';
    let n2 ='';
    let m = '';
    let monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    if(month === 0 || month === 2 || month === 4 || month === 6 || month === 7 || month === 9 || month === 11){

      if(day === 31){
        d = '01';
        n1 = '02';
        n2 = '03';
        m = (month + 1);
        // @ts-ignore
        upcomingDates.push(d, n1, n2, monthNames[m]);
      }else if (day === 30){
        d = tomorrow;
        n1 = '01';
        n2 = '02';
        m = (month + 1);
        // @ts-ignore
        upcomingDates.push(d, n1, n2, monthNames[m]);
      }else if(day === 29){
        d = tomorrow;
        n1 = next1;
        n2 = '01';
        m = (month + 1);
        // @ts-ignore
        upcomingDates.push(d, n1, n2, monthNames[m]);
      }else{
        d = tomorrow;
        n1 = next1;
        n2 = next2;
        m = month;
        // @ts-ignore
        upcomingDates.push(d, n1, n2, monthNames[m]);
      }

    }else if(month === 3 || month === 5 || month === 8 || month === 10 ){

      if(day === 30){
        d = '01';
        n1 = '02';
        n2 = '03';
        m = (month + 1);
        // @ts-ignore
        upcomingDates.push(d, n1, n2, monthNames[m]);
      }else if (day === 29){
        d = tomorrow;
        n1 = '01';
        n2 = '02';
        m = (month + 1);
        // @ts-ignore
        upcomingDates.push(d, n1, n2, monthNames[m]);
      }else if(day === 28){
        d = tomorrow;
        n1 = next1;
        n2 = '01';
        m = (month + 1);
        // @ts-ignore
        upcomingDates.push(d, n1, n2, monthNames[m]);
      }else{
        d = tomorrow;
        n1 = next1;
        n2 = next2;
        m = month;
        // @ts-ignore
        upcomingDates.push(d, n1, n2, monthNames[m]);
      }

    }else{
      if(day === 28){
        d = '01';
        n1 = '02';
        n2 = '03';
        m = (month + 1);
        // @ts-ignore
        upcomingDates.push(d, n1, n2, monthNames[m]);
      }else if (day === 27){
        d = tomorrow;
        n1 = '01';
        n2 = '02';
        m = (month + 1);
        // @ts-ignore
        upcomingDates.push(d, n1, n2, monthNames[m]);
      }else if(day === 26){
        d = tomorrow;
        n1 = next1;
        n2 = '01';
        m = (month + 1);
        // @ts-ignore
        upcomingDates.push(d, n1, n2, monthNames[m]);
      }else{
        d = tomorrow;
        n1 = next1;
        n2 = next2;
        m = month;
        // @ts-ignore
        upcomingDates.push(d, n1, n2, monthNames[m]);
      }
    }

    console.log(upcomingDates);

    return upcomingDates;

  }

  googleDateFormatter(date:any){
    let reverseDate:any = []
    reverseDate = this.taskDateFormatter(date).split('-');
    let googleDate = reverseDate[2] + '-' + reverseDate[1] + '-' + reverseDate[0];
    return googleDate;
  }

}
