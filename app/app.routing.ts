import { Routes, RouterModule } from '@angular/router';

import { PageComponent }  from '../app/page.component';
import { Page2Component }  from '../app/page2.component';



const appRoutes: Routes = [
	{
	  path: '',
	data: {
      title: 'Heroes 1'
    },
    component: PageComponent
	},
  {
    path: 'page',
	data: {
      title: 'Heroes 1'
    },
    component: PageComponent
  },
  {
    path: 'page2',
	data: {
      title: 'Heroes List'
    },
    component: Page2Component
  }
];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(appRoutes);


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/