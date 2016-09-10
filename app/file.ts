

function displayFileData(o){
	
	console.log(o);
	
}

function onErrorCreateFile(o){
	console.log(o);
	
}

function onErrorSaveFile(){
	
	
}

function onErrorReadFile(){
	
	
}

function onErrorLoadFs(){
	
	
}
export function write(fileName, fileData , funct=function(o){console.log(o)} , isAppend=false) {
	console.log(cordova.file.dataDirectory);
	window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function ( dirEntry ) {
		fileExist( dirEntry, fileName,
			function(){
				saveFile( dirEntry, fileData, fileName, isAppend, funct )
			},
			function(){
				createsaveFile( dirEntry, fileData, fileName, isAppend, funct ) 
			}
		)
		
	}, function(){console.log("ERROR cordova file")});
	
}
export function file(fileName,funct=function(o){console.log(o)}) {
		window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function (dirEntry) {

			fileExist(dirEntry,fileName,
				function(){
					readFile(dirEntry,fileName,funct)
				},
				function(){
					funct("null")
				}
			)
			
			
		}, function(){console.log("ERROR cordova file")});
}
export function del(fileName,funct=function(){}) {
		window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function (dirEntry) {

			fileExist(dirEntry,fileName,
				function(){
					_del_(dirEntry,fileName,funct)
				},
				function(){
					funct()
				}
			)
			
		}, function(){console.log("ERROR cordova file")});
}

function _del_(dirEntry,fileName,funct=function(o){console.log(o)}) {

			dirEntry.getFile(fileName, { create: false }, function (fileEntry) {

				  fileEntry.remove(function(){
						funct("file removed");
				  },function(error){
						console.log("error");
				  },function(){
						console.log("file doesn't exist");
				  });
		}, function(){console.log("ERROR cordova file")});
}


function createFile(dirEntry, fileName, isAppend=false) {
    
	
	createsaveFile(dirEntry, "", fileName, isAppend);
	
	
}
function createsaveFile(dirEntry, fileData, fileName, isAppend=false,funct=function(o){console.log(o)}) {

    dirEntry.getFile(fileName, { create: true, exclusive: true }, function (fileEntry) {

        writeFile(fileEntry, fileData, isAppend,funct);

    }, onErrorSaveFile);
}
function saveFile(dirEntry, fileData, fileName, isAppend=false,funct=function(o){console.log(o)}) {

    dirEntry.getFile(fileName, { create: false, exclusive: true }, function (fileEntry) {

        writeFile(fileEntry, fileData, isAppend,funct);

    }, onErrorSaveFile);
}


function writeFile(fileEntry, dataObj, isAppend,funct=function(o){console.log(o)}) {
    
    fileEntry.createWriter(function (fileWriter) {

        fileWriter.onwrite = function() {
            _readFile_(fileEntry,funct);
        };

        fileWriter.onerror = function (e) {
            console.log("Failed file read: " + e.toString());
        };

        
        if (isAppend) {
            try {
                fileWriter.seek(fileWriter.length);
            }
            catch (e) {
                console.log("file doesn't exist!");
            }
        }
        fileWriter.write(dataObj);
    });
}


function _readFile_(fileEntry,funct) {

    fileEntry.file(function (file) {
        var reader = new FileReader();

        reader.onload = function() {
            //displayFileData(fileEntry.fullPath + ": " + this.result);
			funct(this.result);
        };

        reader.readAsText(file);

    }, onErrorReadFile);
}

function readFile(dirEntry,fileName,funct=function(o){console.log(o)}) {

	
	dirEntry.getFile(fileName, { create: false, exclusive: true }, function (fileEntry) {

		_readFile_(fileEntry,funct);

    }, onErrorReadFile);
}




function fileExist(dirEntry,fileName,notanewFile=function(){},anewFile=function(){}) {

	dirEntry.getFile(fileName, { create: false, exclusive: true }, function (fileEntry) {

		fileEntry.file(function (file) {
			
			var reader:any = new FileReader();
			
			reader.onloadend = function(evt) {
				
				if(typeof evt.target._result == null) {
					anewFile();
				} else {
				   notanewFile();
				}
			};
			
			// We are going to check if the file exists
			reader.readAsText(file);
		}, anewFile);
		
    }, anewFile);
}


