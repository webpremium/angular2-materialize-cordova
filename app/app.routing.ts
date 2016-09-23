import { Routes, RouterModule } from '@angular/router';

import { PageComponent }  from '../app/page.component';



const appRoutes: Routes = [
	{
	  path: '',
	data: {
      title: 'Starter'
    },
    component: PageComponent
	},
  {
    path: 'page',
	data: {
      title: 'Starter'
    },
    component: PageComponent
  }
];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(appRoutes);


