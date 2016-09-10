import { Component,Input,AfterViewInit, OnInit,QueryList,ElementRef, Renderer,   } from '@angular/core';

import { models } from './models';












import {MaterializeDirective} from "angular2-materialize";

declare var $:any;
//$.velocity = velocity;
interface window { Velocity: any; }






export let modelsChange:any;

@Component({
	moduleId: module.id,
	selector: 'app',
	templateUrl: 'pages/index.html'
})


export class AppComponent implements AfterViewInit{
	title:string;
	myHero: string;
	myFunction: string;
	/*change(){
		console.log(22);
		this.title = models.title.value;
		console.log(24);
	}*/
	change(){
		console.log(28);
		this.title = "MMM";
		console.log(30);
	};
	
  constructor(private el:ElementRef) {
    this.myHero = 'Windstorm';
    this.myFunction = 'Windstorm';

	
	
	setInterval(() => { this.title=models.title.value; }, 1000);
  }
  ngAfterViewInit() {
	
	
  }
  titleC(s){
	  console.log(s);
	  this.title = s;
	  
  }
  
  /*
	document.addEventListener("deviceready", onDeviceReady, false);
  */
	
}

