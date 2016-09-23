import {ViewChild, ViewChildren,Directive,Component, OnInit,QueryList,ElementRef, Renderer, Input } from '@angular/core';

import { models } from './models';
import { AppComponent } from './app.component';









@Component({
  templateUrl: './pages/page.html',
   styleUrls: ['./pages/page.css']
})


export class PageComponent {
  private element: HTMLElement;
  public models;
  private renderer: Renderer;
  title: string;


	 
	 
	 
	 

  constructor(element: ElementRef, renderer: Renderer) {
	
	models.title.value = 'Starter';
	

	
	
	this.element = element.nativeElement; 
    this.renderer = renderer;
	
	
	
	
	
  }
  

}







