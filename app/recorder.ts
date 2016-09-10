import {ViewChild, ViewChildren,Directive,Component, OnInit,QueryList,ElementRef, Renderer, Input } from '@angular/core';

var CryptoJS = require("crypto-js");
 
var data = [{id: 1}, {id: 2}]
 
// Encrypt 
var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), 'secret key 123');
 
// Decrypt 
var bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), 'secret key 123');
var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
 

export class sCommunic{
	
	
  constructor() {
	  
	  
	  
  }
	ngAfterViewInit() {
		console.log("marde");
		console.log(decryptedData);
	}
}