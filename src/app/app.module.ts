import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import { ToolsComponent } from './tools/tools.component';
import { TodosComponent } from './tools/todos/todos.component';
import { NotesComponent } from './tools/notes/notes.component';
import { CalendarComponent } from './tools/calendar/calendar.component';
import { TrackingComponent } from './tracking/tracking.component';
import { PaycheckComponent } from './tracking/paycheck/paycheck.component';
import { TimerComponent } from './tracking/timer/timer.component';
import {SharedModule} from "./shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { SocialComponent } from './social/social.component';
import { NewsComponent } from './social/news/news.component';
import {HttpClientModule} from "@angular/common/http";
import { WeatherComponent } from './social/weather/weather.component';
import { GamesComponent } from './games/games.component';
import { WordleComponent } from './games/wordle/wordle.component';
import { WorkplaceComponent } from './social/workplace/workplace.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolsComponent,
    TodosComponent,
    NotesComponent,
    CalendarComponent,
    TrackingComponent,
    PaycheckComponent,
    TimerComponent,
    SocialComponent,
    NewsComponent,
    WeatherComponent,
    GamesComponent,
    WordleComponent,
    WorkplaceComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
