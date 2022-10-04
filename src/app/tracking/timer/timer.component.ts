import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {TimerEntry} from "../../model/TimerEntry/timer-entry.model";
import {animate, style, transition, trigger} from "@angular/animations";
import * as XLSX from 'xlsx';
import {Todo} from "../../model/Todo/todo.model";
import {BehaviorSubject, Subscription} from "rxjs";
import {TEntryService} from "../../services/Tracking/t-entry.service";
import {allowMangle} from "@angular-devkit/build-angular/src/utils/environment-options";
import {stringify} from "@angular/compiler/src/util";
import {User} from "../../model/User/user.model";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({ height: 0, opacity: 0 }),
            animate('0.5s ease-out',
              style({ height: 400, opacity: 1 }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ height: 400, opacity: 1 }),
            animate('0.5s ease-in',
              style({ height: 0, opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class TimerComponent implements OnInit {

  allEntries: TimerEntry[] = [];
  entrySubject : BehaviorSubject<TimerEntry[]>=null;
  subscriptionEntry : Subscription = null;

  entries: TimerEntry[] = [];

  entryForm: FormGroup;

  timerStarted: Boolean = false;

  currentEntry: TimerEntry;

  showEntryDiv: Boolean = false;

  fileTrackerName = 'Tracker.xlsx'

  currentUser: User;

  constructor(private entryService: TEntryService, private auth: AuthService) { }

  ngOnInit(): void {

    console.log(new Date().toLocaleString())

    this.currentUser = this.auth.getUser();

    this.entryService.getAllTimerEntries()
      .subscribe(res => {
        if(res == null) return null;
        else {
          this.allEntries=res;
        }
      });

    this.entrySubject=this.entryService.getTimerEntries(this.currentUser.idUser);
    this.subscriptionEntry=this.entrySubject
      .subscribe(res => {
        if(res == null) return null;
        else {
          console.log(res);
          this.entries=res;
          if(JSON.parse(localStorage.getItem('inProgress')) === true) {
            this.timerStarted = true;
          } else {
            this.timerStarted = false;
          }
        }
      });


    this.entryForm = new FormGroup({
      'name' : new FormControl(null, null),
      'description' : new FormControl(null, null)
    })


  }

  addNewEntry(){

    let id = this.allEntries.length == 0 ? 1 : this.allEntries[this.allEntries.length-1].idTimerEntry + 1;

    this.currentEntry = {
      idTimerEntry: id,
      name: this.entryForm.value.name,
      description: this.entryForm.value.description,
      startTime: new Date().toLocaleString(),
      endTime: '',
      duration: '',
      userId: this.currentUser.idUser
    }

    this.entries.push(this.currentEntry);
    this.entryService.addEntry(this.currentEntry);
    localStorage.setItem('inProgress', `${JSON.stringify(true)}`);

    this.entryForm.reset();
    this.showEntryDiv = false;
    this.timerStarted = true;


  }

  stopTimer(){

    localStorage.setItem('inProgress', `${JSON.stringify(false)}`);

    this.currentEntry = this.entries[this.entries.length-1];

    this.currentEntry.endTime = new Date().toLocaleString();
    let tempEndTime = new Date(this.currentEntry.endTime.toLocaleString());

    let startTime = new Date(this.currentEntry.startTime.toLocaleString());

    console.log(tempEndTime, startTime);

    let time = tempEndTime.getTime() - startTime.getTime();

    let seconds: string | number = Math.floor((time / 1000) % 60),
      minutes: string | number = Math.floor((time / (1000 * 60)) % 60),
      hours: string | number = Math.floor((time / (1000 * 60 * 60)) % 24);
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    let duration = hours + ":" + minutes + ":" + seconds;

    this.currentEntry.duration = duration;

    this.entryService.stopEntry(this.currentEntry);

    this.currentEntry = null;

    this.timerStarted = false;
  }

  cancelEntry() {

  }

  exportTrackerExcel(): void
  {
    /* pass here the table id */
    let element = document.getElementById('timer-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileTrackerName);

  }

  resetTable(){
    this.entries = [];
    this.entryService.deleteEntry(this.currentUser.idUser);
  }

}
