import { Component, OnInit } from '@angular/core';
import {CalendarEvent} from "../../model/Calendar/calendar.model";
import {faPlusCircle, faTrash, faCalendar} from "@fortawesome/free-solid-svg-icons";
import {animate, style, transition, trigger} from "@angular/animations";
import {FormControl, FormGroup} from "@angular/forms";
import {Note} from "../../model/Note/note.model";
import {Todo} from "../../model/Todo/todo.model";
import {BehaviorSubject, Subscription} from "rxjs";
import {TodoService} from "../../services/Tools/todo.service";
import {EventService} from "../../services/Tools/event.service";
import {User} from "../../model/User/user.model";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({ opacity: 0 }),
            animate('0.5s ease-out',
              style({ opacity: 1 }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ opacity: 1 }),
            animate('0.5s ease-in',
              style({ opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class CalendarComponent implements OnInit {

  allEvents: CalendarEvent[] = [];
  myEvents: CalendarEvent[] = [];
  eventSubject : BehaviorSubject<CalendarEvent[]>=null;
  subscriptionEvent : Subscription = null;


  faPlus = faPlusCircle;
  faTrash = faTrash;
  faCalendar = faCalendar;

  clickedDelete: Boolean = false;

  showNewEventDiv: Boolean = false;

  newEventForm: FormGroup;

  currentUser: User;

  constructor(private eventService: EventService, private auth: AuthService) { }

  ngOnInit() {

    this.currentUser = this.auth.getUser();

    this.eventSubject=this.eventService.getEvents(this.currentUser.idUser);
    this.subscriptionEvent=this.eventSubject
      .subscribe(res => {
        if (res == null) return null;
        else {
          this.myEvents = res;
        }
      });


    this.newEventForm = new FormGroup({
      'heading': new FormControl(null, null),
      'text': new FormControl(null, null),
      'date': new FormControl(null, null),
      'time': new FormControl(null, null)
    });
  }

  addNewEvent() {

    this.eventService.getAllEvents()
      .subscribe(res => {
        if(res == null) return null;
        else {
          this.allEvents=res;
        }
      });

    let id = this.allEvents.length == 0 ? 0 : this.allEvents[this.allEvents.length-1].idEvent + 1;

    let tempEvent: CalendarEvent = {
      idEvent: id,
      description: this.newEventForm.value.text,
      title: this.newEventForm.value.heading,
      date: this.newEventForm.value.date,
      time: this.newEventForm.value.time,
      userId: this.currentUser.idUser
    }

    console.log(tempEvent);

    this.myEvents.push(tempEvent);
    this.eventService.addEvent(tempEvent);

    this.showNewEventDiv = false;
    this.newEventForm.reset();
  }

  showHide(){
    this.showNewEventDiv = !this.showNewEventDiv;
  }

  deleteEvent(i){
    this.clickedDelete = true;
    this.eventService.deleteEvent(this.myEvents[i].idEvent);
  }
  openEvent(){

    if(this.clickedDelete){
      this.clickedDelete = false;
      return;
    } else {
      console.log('open');
    }

  }

}
