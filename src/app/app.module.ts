import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import {FormsModule} from "@angular/forms";
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {HttpClientModule} from "@angular/common/http";
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { BreadcrumbModule, ButtonModule, DialogModule, FormModule, IconModule, InputModule, TableModule } from '@alauda/ui';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    HeroSearchComponent,
    BreadcrumbComponent
  ],
    imports: [
      DialogModule, 
      IconModule,
      FormModule,
      InputModule,
      IconModule,
      TableModule,
     BreadcrumbModule,
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        ButtonModule,
        HttpClientInMemoryWebApiModule.forRoot(
          InMemoryDataService, { dataEncapsulation: false}
        )
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
