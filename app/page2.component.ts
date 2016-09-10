import { Component, OnInit } from '@angular/core';
import { models } from './models';




@Component({
	template: `
	{{title}}dfgsgh22222222

`
})





export class Page2Component {

  title: string;
  myHero: string;
  onDeviceReady: string;
  myFunction: string;

  constructor() {
	
	models.title.value = 'Tour of Heres';
	
    this.title = 'Tour of Heres';
    this.myHero = 'Windstorm#';
    this.onDeviceReady = 'Windstorm#';
    this.myFunction = 'Windstorm#';
  }
	
}