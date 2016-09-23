import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import {MaterializeDirective} from "angular2-materialize";





import { routing, appRoutingProviders } from './app.routing';


import { AppComponent }  from './app.component';
import { PageComponent }  from './page.component';






@NgModule({
  imports:      [ BrowserModule,FormsModule,routing ],
  declarations: [ AppComponent, PageComponent, MaterializeDirective,
    AppComponent

  ],
  providers: [
    appRoutingProviders,
	{provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule{
	
  constructor() {
  }
	
	
}

