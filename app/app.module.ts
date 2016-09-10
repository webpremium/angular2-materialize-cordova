import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import {MaterializeDirective/*, SideNav*/} from "angular2-materialize";
/*

  Buttons,
  Collapsible,
  Dropdown,
  Dialogs,
  Tabs,
  //TabsRouting,
  Forms,
  SideNav,
  DatePicker,
  ModelBindings

*/




import { routing, appRoutingProviders } from './app.routing';


import { AppComponent }  from './app.component';
import { PageComponent }  from './page.component';
import { Page2Component }  from './page2.component';


/*
 $('.button-collapse').sideNav({
      menuWidth: 300, // Default is 240
      edge: 'right', // Choose the horizontal origin
      closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
    }
  );
*/






@NgModule({
  imports:      [ BrowserModule,FormsModule,routing ],
  declarations: [ AppComponent, PageComponent, Page2Component, MaterializeDirective,
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

