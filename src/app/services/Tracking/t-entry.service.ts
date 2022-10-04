import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {DataService} from "../../shared/data.service";
import {TimerEntry} from "../../model/TimerEntry/timer-entry.model";

@Injectable({
  providedIn: 'root'
})
export class TEntryService {

  allEntries : TimerEntry[] = [];
  entries : TimerEntry[] = [];
  entrySubject : BehaviorSubject<TimerEntry[]> = new BehaviorSubject(null);

  constructor(private dataService: DataService) {
    this.init();
  }

  init(){

  }

  getTimerEntries(userId){
    this.dataService.getTimerEntries(userId)
      .subscribe((res => {
        this.entries = res;
        this.entrySubject.next([...this.entries]);
      }))
    return this.entrySubject;
  }

  getAllTimerEntries(){
    this.dataService.getAllTimerEntries()
      .subscribe((res => {
        this.allEntries = res;
        this.entrySubject.next([...this.allEntries]);
      }))
    return this.entrySubject;
  }

  addEntry(entry){
    this.dataService.addEntry(entry)
      .subscribe((res => {
        this.entries.push(entry);
        this.entrySubject.next([...this.entries])
      }))
  }

  stopEntry(entry){
    this.dataService.stopEntry(entry)
      .subscribe((res => {
        this.entries[this.entries.findIndex(e => e.idTimerEntry === entry.idTimerEntry)] = entry;
        this.entrySubject.next([...this.entries]);
      }))
  }

  deleteEntry(userId){
    this.dataService.deleteTimerEntry(userId)
      .subscribe((res => {
        this.entries=this.entries.filter(e => e.userId!=userId);
        this.entrySubject.next([...this.entries]);
      }))
  }

}
