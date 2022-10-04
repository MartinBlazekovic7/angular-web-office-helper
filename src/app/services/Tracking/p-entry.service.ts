import { Injectable } from '@angular/core';
import {TimerEntry} from "../../model/TimerEntry/timer-entry.model";
import {BehaviorSubject} from "rxjs";
import {DataService} from "../../shared/data.service";
import {Workday} from "../../model/WorkDay/workday.model";

@Injectable({
  providedIn: 'root'
})
export class PEntryService {

  entries : Workday[] = [];
  entrySubject : BehaviorSubject<Workday[]> = new BehaviorSubject(null);

  constructor(private dataService: DataService) {
    this.init();
  }

  init(){

  }

  getPaycheckEntries(userId){
    this.dataService.getPaycheckEntries(userId)
      .subscribe((res => {
        this.entries = res;
        this.entrySubject.next([...this.entries]);
      }))
    return this.entrySubject;
  }

  addEntry(entry){
    this.dataService.addPaycheckEntry(entry)
      .subscribe((res => {
        this.entries.push(entry);
        this.entrySubject.next([...this.entries])
      }))
  }

  deleteEntry(userId){
    this.dataService.deletePaycheckEntry(userId)
      .subscribe((res => {
        this.entries=this.entries.filter(e => e.userId!=userId);
        this.entrySubject.next([...this.entries]);
      }))
  }

}
