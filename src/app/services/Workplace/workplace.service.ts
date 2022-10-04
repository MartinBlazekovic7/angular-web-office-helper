import { Injectable } from '@angular/core';
import {TimerEntry} from "../../model/TimerEntry/timer-entry.model";
import {BehaviorSubject} from "rxjs";
import {DataService} from "../../shared/data.service";
import {Post, Workplace, Workplace_has_User} from "../../model/Workplace/workplace.model";
import {User} from "../../model/User/user.model";

@Injectable({
  providedIn: 'root'
})
export class WorkplaceService {

  allWorkplaces : Workplace[] = [];
  workplaces : Workplace[] = [];
  allWorkplaceSubject : BehaviorSubject<Workplace[]> = new BehaviorSubject(null);
  workplaceSubject : BehaviorSubject<Workplace[]> = new BehaviorSubject(null);

  workplacePosts : Post[] = [];
  workplacePostSubject : BehaviorSubject<Post[]> = new BehaviorSubject(null);

  workplaceUsers : User[] = [];
  workplaceUserSubject : BehaviorSubject<User[]> = new BehaviorSubject(null);

  workplaceHasUser : Workplace_has_User[] = [];
  workplaceHasUserSubject : BehaviorSubject<Workplace_has_User[]> = new BehaviorSubject(null);

  constructor(private dataService: DataService) {
    this.init();
  }

  init(){

  }

  getAllWorkplaces(){
    this.dataService.getAllWorkplaces()
      .subscribe((res => {

        this.allWorkplaces = res;
        this.allWorkplaceSubject.next([...this.allWorkplaces]);
      }))

    console.log(this.workplaceSubject);
    return this.allWorkplaceSubject;
  }
  getWorkplaces(userId){
    this.dataService.getWorkplaces(userId)
      .subscribe((res => {
        this.workplaces = res;
        this.workplaceSubject.next([...this.workplaces]);
      }))
    return this.workplaceSubject;
  }
  addWorkplace(workplace){
    this.dataService.addWorkplace(workplace)
      .subscribe((res => {
        this.workplaces.push(workplace);
        this.workplaceSubject.next([...this.workplaces]);
      }));
    return this.workplaceSubject;
  }

  getWorkplacePosts(workplaceId){
    this.dataService.getWorkplacePosts(workplaceId)
      .subscribe((res => {
        this.workplacePosts = res;
        this.workplacePostSubject.next([...this.workplacePosts]);
      }))
    return this.workplacePostSubject;
  }

  getWorkplaceUsers(workplaceId){
    this.dataService.getWorkplaceUsers(workplaceId)
      .subscribe((res => {
        this.workplaceUsers = res;
        this.workplaceUserSubject.next([...this.workplaceUsers]);
      }))
    return this.workplaceUserSubject;
  }


  userJoinWorkplace(wu){
    this.dataService.userJoinWorkplace(wu)
      .subscribe((res => {
        this.workplaceHasUser.push(wu);
        this.workplaceHasUserSubject.next([...this.workplaceHasUser])
      }))
  }

  addPostToWorkplace(wp){
    this.dataService.addPostToWorkplace(wp)
      .subscribe((res => {
        this.workplacePosts.push(wp);
        this.workplacePostSubject.next([...this.workplacePosts]);
      }));
    return this.workplacePostSubject;
  }

  leaveWorkplace(wu){

    this.dataService.leaveWorkplace(wu)
      .subscribe((res => {
        this.workplaceHasUser=this.workplaceHasUser.filter(w => w.idWorkplace!=wu.idWorkplace && w.idUser!=wu.idUser);
        this.workplaceHasUserSubject.next([...this.workplaceHasUser]);
      }))
  }


}
