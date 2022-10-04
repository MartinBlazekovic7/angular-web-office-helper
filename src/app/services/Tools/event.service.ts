import { Injectable } from '@angular/core';
import {DataService} from "../../shared/data.service";
import {Todo} from "../../model/Todo/todo.model";
import {BehaviorSubject} from "rxjs";
import {CalendarEvent} from "../../model/Calendar/calendar.model";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  allEvents : CalendarEvent[] = [];
  events : CalendarEvent[] = [];
  eventSubject : BehaviorSubject<CalendarEvent[]> = new BehaviorSubject(null);

  constructor(private dataService: DataService) {
    this.init();
  }

  init(){

  }

  getAllEvents(){
    this.dataService.getAllEvents()
      .subscribe((res => {
        this.allEvents = res;
        this.eventSubject.next([...this.allEvents]);
      }))
    return this.eventSubject;
  }

  getEvents(userId){
    this.dataService.getEvents(userId)
      .subscribe((res => {
        this.events = res;
        this.eventSubject.next([...this.events]);
      }))
    return this.eventSubject;
  }

  addEvent(event){
    this.dataService.addEvent(event)
      .subscribe((res => {
        this.events.push(event);
        console.log(this.events);
        this.eventSubject.next([...this.events])
      }))
  }

  deleteEvent(idEvent){
    this.dataService.deleteEvent(idEvent)
      .subscribe((res => {
        this.events=this.events.filter(e => e.idEvent!=idEvent);
        this.eventSubject.next([...this.events]);
      }));
  }
}
