import { Component,Input,AfterViewInit, OnInit,QueryList,ElementRef, Renderer,   } from '@angular/core';

import { models } from './models';












import {MaterializeDirective} from "angular2-materialize";

declare var $:any;

interface window { Velocity: any; }








@Component({
	moduleId: module.id,
	selector: 'app',
	templateUrl: 'pages/index.html'
})


export class AppComponent implements AfterViewInit{
	title:string;

  constructor(private el:ElementRef) {

	
	
	setInterval(() => { this.title=models.title.value; }, 1000);
  }
  ngAfterViewInit() {
	
	
  }


	
}

