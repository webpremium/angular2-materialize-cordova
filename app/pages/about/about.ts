import {ViewChild, ViewChildren,Directive,Component,QueryList,ElementRef, Renderer } from '@angular/core';
import { models } from '../../models';
import {NavController} from 'ionic-angular';

export let initLocalTimeTotalTimeOut:any;
export let initLocalClocksTimeOut:any;

export let initLocalTimeTotal:any;
export let initLocalClocks:any;
export let pomodoroTimer:any={timeLeft:"15"};

pomodoroTimer.option={};
pomodoroTimer.option.name1=15.00;
pomodoroTimer.timeLeft=900;
pomodoroTimer.timeTotal=0;






@Component({
  templateUrl: 'build/pages/about/about.html'
})


export class AboutPage {
  private element: HTMLElement;
  public models;
  public pomodoroTimer;
  private renderer: Renderer;
	 @ViewChild('hourscontainer') hourscontainer:ElementRef; 
	 @ViewChild('minutescontainer') minutescontainer:ElementRef; 
	 @ViewChild('secondscontainer') secondscontainer:ElementRef; 
	 @ViewChild('digital') digital:ElementRef; 
	 @ViewChild('digitalLeft') digitalLeft:ElementRef; 
	 @ViewChild('digitalTotal') digitalTotal:ElementRef; 

  
  constructor(private navCtrl: NavController,element: ElementRef, renderer: Renderer) {

	this.element = element.nativeElement; 
	this.models=models;
	this.pomodoroTimer=pomodoroTimer;
    this.renderer = renderer;
	
	
  }
	ngAfterViewInit() {
		this.initLocalClocks();
	}
	reload(){
	
	setTimeout(() => {
      this.initLocalClocks();
    }, 1000);
	
	}
	
  initLocalClocks = function(s="clock") {
	  if( s == 'clock' ){
		//console.log("time");
		if(typeof initLocalClocksTimeOut != "undefined" )clearTimeout(initLocalClocksTimeOut);
		
		var date = new Date;
		var seconds = date.getSeconds();
		var minutes = date.getMinutes();
		var hours = date.getHours();
		var milliseconds = date.getMilliseconds();
		
		var minutesTotal=Math.floor(Math.floor(pomodoroTimer.timeTotal)/60);
		var hoursTotal=Math.floor(minutesTotal/60);
		minutesTotal=minutesTotal-hoursTotal*60;
		var secondsTotal=(pomodoroTimer.timeTotal-(hoursTotal*60+minutesTotal)*60);
		
		/*var s = ( seconds * 6 );
		/*var m = ( minutes * 6 ) + ( seconds/10 );/* ( seconds/60*6 ) */
		/*var h = ( hours * 30  ) + ( minutes / 10 );/* ( minutes * 6/60*1 ) */
		
		var date = new Date;
		this.digitalrender(date);
		this.horlorgeRender(hours,minutes,seconds);
		this.initLocalTimeTotal();
		
		
		
		initLocalClocksTimeOut=setTimeout(() => {
			pomodoroTimer.timeTotal+=1;
			this.initLocalClocks();
		}, 1000-milliseconds);
	  }else if( s == 'timer' ){
		//console.log("timer");
		console.log(pomodoroTimer);
		
		
		if(typeof initLocalClocksTimeOut != "undefined" )clearTimeout(initLocalClocksTimeOut);
		
		
		
		
		var minutesLeft=Math.floor(Math.floor(pomodoroTimer.timeLeft)/60);
		var hoursLeft=Math.floor(minutesLeft/60);
		minutesLeft=minutesLeft-hoursLeft*60;
		var secondsLeft=(pomodoroTimer.timeLeft-(hoursLeft*60+minutesLeft)*60);
		
		var minutesTotal=Math.floor(Math.floor(pomodoroTimer.timeTotal)/60);
		var hoursTotal=Math.floor(minutesTotal/60);
		minutesTotal=minutesTotal-hoursTotal*60;
		var secondsTotal=(pomodoroTimer.timeTotal-(hoursTotal*60+minutesTotal)*60);
		
		
		var date = new Date;
		
		var milliseconds = date.getMilliseconds();
		
		/*var s = ( seconds * 6 );
		/*var m = ( minutes * 6 ) + ( seconds/10 );/* ( seconds/60*6 ) */
		/*var h = ( hours * 30  ) + ( minutes / 10 );/* ( minutes * 6/60*1 ) */
		
		this.digitalrender(date);
		this.digital2render(hoursLeft,minutesLeft,secondsLeft);
		this.initLocalTimeTotal();
		this.horlorgeRender(hoursLeft,minutesLeft,secondsLeft);
		
		this.digitalLeft.nativeElement.innerHTML=hoursLeft+";"+minutesLeft+";"+secondsLeft+";"+date.getMilliseconds();
		
		initLocalClocksTimeOut=setTimeout(() => {
			
			pomodoroTimer.timeTotal+=1;
			pomodoroTimer.timeLeft-=1;
			this.initLocalClocks('timer');
		}, 1000-milliseconds);
	  }else if( s == "stop" ){
		  
		  if(typeof initLocalClocksTimeOut != "undefined" )clearTimeout(initLocalClocksTimeOut);
		  
	  }
}
	
  initLocalTimeTotal = function(s="timer",n=true) {
	  if( s=='timer' && n==true ){
		//console.log("timer");
		console.log(pomodoroTimer);
		
		
		if(typeof initLocalTimeTotalTimeOut != "undefined" )clearTimeout(initLocalTimeTotalTimeOut);
		
		
		
		
		
		var minutesTotal=Math.floor(Math.floor(pomodoroTimer.timeTotal)/60);
		var hoursTotal=Math.floor(minutesTotal/60);
		minutesTotal=minutesTotal-hoursTotal*60;
		var secondsTotal=(pomodoroTimer.timeTotal-(hoursTotal*60+minutesTotal)*60);
		
		
		var date = new Date;
		
		var milliseconds = date.getMilliseconds();
		
		this.digital3render(hoursTotal,minutesTotal,secondsTotal);
		
		initLocalTimeTotalTimeOut=setTimeout(() => {
			
			pomodoroTimer.timeTotal+=1;
			this.initLocalTimeTotal('timer');
		}, 1000-milliseconds);
	  }else if( s=="stop" ){
		  
		  if(typeof initLocalTimeTotalTimeOut != "undefined" )clearTimeout(initLocalTimeTotalTimeOut);
		  
	  }
}

	digital3render(h,m,s){
		
		
		this.digitalTotal.nativeElement.innerHTML=h+";"+m+";"+s;
		
		
	}
	digital2render(h,m,s){
		
		
		this.digitalLeft.nativeElement.innerHTML=h+";"+m+";"+s;
		
		
	}
	digitalrender(date){
		
		
		this.digital.nativeElement.innerHTML=date.getHours()+";"+date.getMinutes()+";"+date.getSeconds()+";"+date.getMilliseconds();
		
		
	}
	horlorgeRender(h,m,s){
		
			this.renderer.setElementStyle(this.hourscontainer.nativeElement, 'transform', "rotateZ("+(( h * 30  ) + ( m / 10 ))+"deg)");
			this.renderer.setElementStyle( this.minutescontainer.nativeElement, 'transform', "rotateZ("+(( m * 6 ) + ( s /10 ))+"deg)");
			this.renderer.setElementStyle(this.secondscontainer.nativeElement, 'transform', "rotateZ("+( s * 6 )+"deg)");
		
		
	}


}

