import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Workday} from "../../model/WorkDay/workday.model";
import * as XLSX from 'xlsx';
import {TimerEntry} from "../../model/TimerEntry/timer-entry.model";
import {BehaviorSubject, Subscription} from "rxjs";
import {PEntryService} from "../../services/Tracking/p-entry.service";
import {AuthService} from "../../auth/auth.service";
import {User} from "../../model/User/user.model";

@Component({
  selector: 'app-paycheck',
  templateUrl: './paycheck.component.html',
  styleUrls: ['./paycheck.component.css']
})
export class PaycheckComponent implements OnInit {

  entries: Workday[] = [];
  entrySubject : BehaviorSubject<Workday[]>=null;
  subscriptionEntry : Subscription = null;

  filePaycheckName = 'Paycheck.xlsx'

  paycheckForm : FormGroup;

  totalMoney: number = 0;

  currentUser: User;

  constructor(private entryService: PEntryService, private auth: AuthService) { }

  ngOnInit() {

    this.currentUser = this.auth.getUser();

    this.entrySubject=this.entryService.getPaycheckEntries(this.currentUser.idUser);
    this.subscriptionEntry=this.entrySubject
      .subscribe(res => {
        this.entries = res;
        if(this.entries == null) return null;
        else {
          for(let i = 0; i<this.entries.length; i++){
            console.log(this.entries[i]);
            this.totalMoney += this.entries[i].money;
          }
        }
      });

    this.paycheckForm = new FormGroup({
      'date': new FormControl(null, null),
      'rate': new FormControl(null, null),
      'startHour': new FormControl(null, null),
      'endHour': new FormControl(null, null)
    });

  }


  addDay(){


    let tempMoney: number = 0;
    if(this.paycheckForm.value.endHour > this.paycheckForm.value.startHour) {
      tempMoney = (this.paycheckForm.value.endHour - this.paycheckForm.value.startHour) * this.paycheckForm.value.rate
    } else {
      tempMoney = ((24-this.paycheckForm.value.startHour) + this.paycheckForm.value.endHour) * this.paycheckForm.value.rate;
    }


    let tempDay: Workday = {
      userId: this.currentUser.idUser,
      date: this.paycheckForm.value.date,
      endHour: this.paycheckForm.value.endHour,
      rate: this.paycheckForm.value.rate,
      startHour: this.paycheckForm.value.startHour,
      money: tempMoney
    }

    this.entries.push(tempDay);
    for(let i = 0; i<this.entries.length; i++){
      console.log(this.entries[i]);
      this.totalMoney += this.entries[i].money;
    }
    this.entryService.addEntry(tempDay);



  }

  exportPaycheckExcel(): void
  {
    /* pass here the table id */
    let element = document.getElementById('paycheck-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.filePaycheckName);

  }

  resetTable(){
    this.entries = [];
    this.entryService.deleteEntry(this.currentUser.idUser);
  }

}
