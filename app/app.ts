import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import 'jquery';
import "materialize-css"
import "angular2-materialize";


enableProdMode();


import { AppModule } from './app.module';
platformBrowserDynamic().bootstrapModule(AppModule);