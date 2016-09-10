import {Component, ViewChild, ElementRef} from '@angular/core';
import {NavController} from 'ionic-angular';
import { GoogleMap, GoogleMapsEvent, GoogleMapsLatLng } from 'ionic-native';
import { Geolocation } from 'ionic-native';
import {Distance} from '../../distance';
import {write,file,del} from '../../file';
import {deplacement,_SESSION_,deplacementStart,deplacementStop,deplacementTimeOut,android,ios,core } from '../../app';

export let map;
export let isAppend;









@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
	
	constructor(private navCtrl: NavController) {
		
	}
	deviceWrite(){
		
		
		let fileName = "fileToAppend.txt";
		
		//function del file
		del(fileName,function(){//success
			//function write or creat and write
			write(fileName, "Fichier enregistrer" , function(){//success
				
				//function read file
				file(fileName,function(o){//success
					
					console.log(o)
					
				});
				//end of function read file
				
			});
			//end of function write or creat and write
			
		});
		//end of function del file

		
		
	}
	Stop(){
		deplacementStop();
	}
	
	Start(){
		
		//alert(android);

		if ( android==true || ios==true ) {
			map = new GoogleMap('map');
			
			map.on(GoogleMapsEvent.MAP_READY).subscribe(() => reload());
			
		} else if( core===true ){
			map = new google.maps.Map(document.getElementById('map'), {});
			google.maps.event.addListenerOnce(map, 'idle', function(){reload()});
		}
		
		
		



			

		function onSuccess(position) {
			
			deplacement.newPosition(position.coords.latitude  ,position.coords.longitude);
			let dis = deplacement.getDistanceFromLatLonInKm();
			
			var ts_hms = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
			_SESSION_[ts_hms]={la:position.coords.latitude ,lo:position.coords.longitude,d:dis};
			
			
			
			/*
			console.log('\nLatitude: '          + position.coords.latitude          + '\n' +
				  'Longitude: '         + position.coords.longitude         + '\n' +
				  'Altitude: '          + position.coords.altitude          + '\n' +
				  'Accuracy: '          + position.coords.accuracy          + '\n' +
				  'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
				  'Heading: '           + position.coords.heading           + '\n' +
				  'Speed: '             + position.coords.speed             + '\n' +
				  'Timestamp: '         + position.timestamp                + '\n'
			);
			*/
			
			deplacementStart();
			
			setGoogleMap(position)
			
			
			
			

		}

		function onError(error) {
			alert('code: '    + error.code    + '\n' +
				  'message: ' + error.message + '\n');
		}
		
		function reload(){
			navigator.geolocation.getCurrentPosition(onSuccess, onError);
		
		}
		
		
		

		
		function setGoogleMap(position) {
			let myLatlng = new GoogleMapsLatLng(position.coords.latitude, position.coords.longitude );
			
			var mapOptions = {
				 center: myLatlng
			};
			map.setZoom(18);
			map.setCenter(myLatlng);
			
			if(typeof map.setTrafficEnabled !="undefined" )map.setTrafficEnabled(true);
			if(typeof map.setCompassEnabled !="undefined" )map.setCompassEnabled(true);
			if(typeof map.setMyLocationEnabled !="undefined" )map.setMyLocationEnabled(true);
		}
		
		
		
		
		
	}
	
	
	
}










