//__________________________________________
//
//__________________________________________
function loadFile(evt){
    // var reader = new FileReader();
    // reader.onload = function(file){
	// var textArea=document.getElementById('patternContent');
	// textArea.value=file.target.result;
	// textArea.scrollTop=textArea.scrollHeight;
	// DAQHandle.onPatternChange();
	// DPCHandle.onPatternChange();
	// MonitorHandle.onPatternChange();
	// localStorage.setItem("pattern",document.getElementById('patternContent').value);    }
    // reader.readAsText(evt.files[0]);
}
let ws = new WebSocket("ws://10.155.101.208:8000");
ws.onopen = function(e) {
	console.log('connection established')
	//ws.send("My name is John");
};
  
ws.onmessage = function(event) {
	console.log(`[message] Data received from server: ${event.data}`);
};
  
ws.onclose = function(event) {
	if (event.wasClean) {
	  console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
	} else {
	  // e.g. server process killed or network down
	  // event.code is usually 1006 in this case
	  console.log('[close] Connection died');
	}
};
  
ws.onerror = function(error) {
	console.log(`[error] ${error.message}`);
};

function test(evt){
	ws.send("123456");
}
// (function(){
//     $('#fileClear').click(function(){
// 	document.getElementById('patternContent').value="";
// 	document.getElementById('fileInput').value="";
//     });
// })();
// //__________________________________________
// //Pattern
// //__________________________________________
// function pattern(elementID){
//     var that=this;
//     this.elementID=elementID;
//     this.JSON=function(){
// 	var string=document.getElementById(that.elementID).value;
// 	string=string.replaceAll("\n", "");
// 	return JSON.parse(string);
//     }
//     this.onResize=function(x,y){
// 	$('#Pattern').css({'width':0.46*x,
// 			   'height':0.95*y,
// 			   'margin-top':0.01*y,
// 			   'margin-bottom':0.01*y,
// 			   'margin-left':0.01*x,
// 			   'margin-right':0.01*x,
// 			   'padding-top':0.01*y,
// 			   'padding-bottom':0.01*y,
// 			   'padding-left':0.01*x,
// 			   'padding-right':0.01*x,
// 		      });	
// 	$('#patternContent').css({'width':0.44*x,
// 				  'height':0.88*y,
// 				  'margin-top':0.01*y,
// 				  'margin-bottom':0.01*y,
// 				  'margin-left':0.0*x,
// 				  'margin-right':0.01*x,
// 				  'padding-top':0.01*y,
// 				  'padding-bottom':0.01*y,
// 				  'padding-left':0.01*x,
// 				  'padding-right':0.01*x,
// 				 });	
//     }
// }
// //__________________________________________
// //DAQ
// //__________________________________________
// function DAQ(){
//     var that=this;
//     document.getElementById('DAQAutoRefresh').checked=true;
//     document.getElementById('DAQBufferAutoRefresh').checked=true;
//     this.IP=null;
//     this.Port=null;
//     this.pattern=null;
//     this.action={"Machine":"DAQ"}
//     this.status=-1;
//     this.bufferStatus=-1;
//     this.WS=null;
//     this.onPatternChange=function(){
// 	var json=that.pattern.JSON();
// 	var ip=json.DAQIP;
// 	var port=json.DAQWSPort
// 	if(ip!=that.IP||port!=that.Port||that.WS==null){
// 	    that.IP=ip;
// 	    that.Port=port;
// 	    that.setupWS(ip,port);
// 	}
//     }
//     this.setupWS=function(ip,port){
// 	var ws=new WebSocket("ws://"+ip+":"+port);
// 	ws.onopen=function(){
// 	    that.unCover();
// 	    that.WS=ws;
// 	}
// 	ws.onclose=function(evt){
// 	    that.cover();
// 	    sleep(1000);
// 	    that.setupWS(that.IP,that.Port);
// 	}
// 	ws.onmessage=function(msg){
// 	    var msgJson=JSON.parse(msg.data);
// 	    if(msgJson["DAQStatus"]!=null){
// 		that.status=msgJson["DAQStatus"];
// 	    }
// 	    if(msgJson["DAQBufferStatus"]!=null){
// 		that.bufferStatus=msgJson["DAQBufferStatus"];
// 	    }
// 	    that.updateGUI();
// 	}
// 	ws.onerror=function(err){
// 	    that.cover();
// 	    sleep(1000);
// 	    that.setupWS(that.IP,that.Port);
// 	}
//     }
//     this.updateGUI=function(){
// 	if(that.status==-1) {
// 	    document.getElementById('DAQInit').disabled=true;
// 	    document.getElementById('DAQStart').disabled=true;
// 	    document.getElementById('DAQStop').disabled=true;
// 	    $('#DAQInit').css('background-color','white');
// 	    $('#DAQStart').css('background-color','white');
// 	    $('#DAQStop').css('background-color','white');
// 	    document.getElementById('DAQSwitch').checked=false;
// 	}else if(that.status==0){
// 	    document.getElementById('DAQInit').disabled=false;
// 	    document.getElementById('DAQStart').disabled=true;
// 	    document.getElementById('DAQStop').disabled=true;
// 	    $('#DAQInit').css('background-color','white');
// 	    $('#DAQStart').css('background-color','white');
// 	    $('#DAQStop').css('background-color','white');
// 	    document.getElementById('DAQSwitch').checked=true;
// 	}else if(that.status==1){
// 	    document.getElementById('DAQInit').disabled=false;
// 	    document.getElementById('DAQStart').disabled=false;
// 	    document.getElementById('DAQStop').disabled=true;
// 	    $('#DAQInit').css('background-color','#f4816c');
// 	    $('#DAQStart').css('background-color','white');
// 	    $('#DAQStop').css('background-color','white');
// 	    document.getElementById('DAQSwitch').checked=true;
// 	}else if(that.status==2){
// 	    document.getElementById('DAQInit').disabled=true;
// 	    document.getElementById('DAQStart').disabled=true;
// 	    document.getElementById('DAQStop').disabled=false;
// 	    $('#DAQInit').css('background-color','white');
// 	    $('#DAQStart').css('background-color','#f4816c');
// 	    $('#DAQStop').css('background-color','white');
// 	    document.getElementById('DAQSwitch').checked=true;
// 	}else if(that.status==3){
// 	    document.getElementById('DAQInit').disabled=false;
// 	    document.getElementById('DAQStart').disabled=false;
// 	    document.getElementById('DAQStop').disabled=true;
// 	    $('#DAQInit').css('background-color','white');
// 	    $('#DAQStart').css('background-color','white');
// 	    $('#DAQStop').css('background-color','#f4816c');
// 	    document.getElementById('DAQSwitch').checked=true;
// 	}
// 	document.getElementById('DAQBufferStatus').value=that.bufferStatus;
//     }
//     this.onResize=function(x,y){
// 	$('#DAQ').css({'width':0.46*x,
// 		       'height':0.05*y,
// 		       'margin-top':0.01*y,
// 		       'margin-bottom':0.01*y,
// 		       'margin-left':0.01*x,
// 		       'margin-right':0.01*x,
// 		       'padding-top':0.01*y,
// 		       'padding-bottom':0.01*y,
// 		       'padding-left':0.01*x,
// 		       'padding-right':0.01*x,
// 		      });
// 	$('#DAQInit,#DAQStart,#DAQStop').css({'width':0.05*x});
// 	$('#DAQBuffer').css({'width':0.46*x,
// 			     'height':0.04*y,
// 			     'margin-top':0.01*y,
// 			     'margin-bottom':0.01*y,
// 			     'margin-left':0.01*x,
// 			     'margin-right':0.01*x,
// 			     'padding-top':0.01*y,
// 			     'padding-bottom':0.01*y,
// 			     'padding-left':0.01*x,
// 			     'padding-right':0.01*x,
// 		      });
// 	$('#DAQBufferStatus').css({'width':0.3*x});
//     }
//     this.cover=function(){
// 	var x=window.innerWidth;
// 	var y=window.innerHeight;
// 	var W=document.getElementById("DAQ").offsetWidth;
// 	var H=document.getElementById("DAQ").offsetHeight;
// 	$('#DAQCover').css({
// 	    'width':W,
// 	    'height':H,
// 	    'background-color':'gray',
// 	    'position':'fixed',
// 	    'top':y*0.01,
// 	    'left':x*0.51,
// 	    'opacity': 0.5
// 	});
//     }
//     this.unCover=function(){
// 	$('#DAQCover').css({
// 	    'display':'none'
// 	});
//     }
// }
// //__________________________________________
// //DPC
// //__________________________________________
// function DPC(){
//     var that=this;
//     document.getElementById('DPCAutoRefresh').checked=true;
//     document.getElementById('DPCBufferAutoRefresh').checked=true;
//     this.IP=null;
//     this.Port=null;
//     this.pattern=null;
//     this.action={"Machine":"DPC"}
//     this.status=-1;
//     this.logEditorStatus=-1;
//     this.dataFileStatus=-1;
//     this.bufferStatus=-1;
//     this.WS=null;
//     this.onPatternChange=function(){
// 	var json=that.pattern.JSON();
// 	var ip=json.DPCIP;
// 	var port=json.DPCWSPort
// 	if(ip!=that.IP||port!=that.Port||that.WS==null){
// 	    that.IP=ip;
// 	    that.Port=port;
// 	    that.setupWS(ip,port);
// 	}
//     }
//     this.setupWS=function(ip,port){
// 	var ws=new WebSocket("ws://"+ip+":"+port);
// 	ws.onopen=function(){
// 	    that.unCover();
// 	    that.WS=ws;
// 	}
// 	ws.onclose=function(evt){
// 	    that.cover();
// 	    sleep(1000);
// 	    that.setupWS(that.IP,that.Port);
// 	}
// 	ws.onmessage=function(msg){
// 	    var msgJson=JSON.parse(msg.data);
// 	    if(msgJson["DPCStatus"]!=null){
// 		that.status=msgJson["DPCStatus"];
// 	    }
// 	    if(msgJson["DPCBufferStatus"]!=null){
// 		that.bufferStatus=msgJson["DPCBufferStatus"];
// 	    }
// 	    if(msgJson["LogEditorStatus"]!=null){
// 		that.logEditorStatus=msgJson["LogEditorStatus"];
// 	    }
// 	    if(msgJson["DataFileStatus"]!=null){
// 		that.dataFileStatus=msgJson["DataFileStatus"];
// 	    }
// 	    if(msgJson["DataFileName"]!=null){
// 		document.getElementById('DataFileName').textContent=msgJson["DataFileName"];
// 	    }
// 	    that.updateGUI();
// 	}
// 	ws.onerror=function(err){
// 	    that.cover();
// 	    sleep(1000);
// 	    that.setupWS(that.IP,that.Port);
// 	}
//     }
//     this.updateGUI=function(){
// 	if(that.status==-1) {
// 	    document.getElementById('DPCStart').disabled=true;
// 	    document.getElementById('DPCStop').disabled=true;
// 	    $('#DPCStart').css('background-color','white');
// 	    $('#DPCStop').css('background-color','white');
// 	    document.getElementById('DPCSwitch').checked=false;
// 	}else if(that.status==0){
// 	    document.getElementById('DPCStart').disabled=false;
// 	    document.getElementById('DPCStop').disabled=true;
// 	    $('#DPCStart').css('background-color','white');
// 	    $('#DPCStop').css('background-color','white');
// 	    document.getElementById('DPCSwitch').checked=true;
// 	}else if(that.status==1){
// 	    document.getElementById('DPCStart').disabled=true;
// 	    document.getElementById('DPCStop').disabled=false;
// 	    $('#DPCStart').css('background-color','#f4816c');
// 	    $('#DPCStop').css('background-color','white');
// 	    document.getElementById('DPCSwitch').checked=true;
// 	}else if(that.status==2){
// 	    document.getElementById('DPCStart').disabled=false;
// 	    document.getElementById('DPCStop').disabled=true;
// 	    $('#DPCStart').css('background-color','white');
// 	    $('#DPCStop').css('background-color','#f4816c');
// 	    document.getElementById('DPCSwitch').checked=true;
// 	}
// 	document.getElementById('DPCBufferStatus').value=that.bufferStatus;
// 	document.getElementById('DataFileStatus').value=that.dataFileStatus;
// 	if(that.logEditorStatus==-1){
// 	    document.getElementById('logEdit').disabled=true;
// 	    document.getElementById('logSave').disabled=true;
// 	    document.getElementById('Logs').disabled=true;
// 	    $('#logEdit').css('background-color','white');
// 	    $('#logSave').css('background-color','white');
// 	}else if(that.logEditorStatus==0){
// 	    document.getElementById('logEdit').disabled=false;
// 	    document.getElementById('logSave').disabled=true;
// 	    document.getElementById('Logs').disabled=true;
// 	    $('#logEdit').css('background-color','white');
// 	    $('#logSave').css('background-color','white');
// 	}else if(that.logEditorStatus==1){
// 	    document.getElementById('logEdit').disabled=true;
// 	    document.getElementById('logSave').disabled=false;
// 	    document.getElementById('Logs').disabled=false;
// 	    $('#logEdit').css('background-color','#f4816c');
// 	    $('#logSave').css('background-color','white');
// 	}else if(that.logEditorStatus==2){
// 	    document.getElementById('logEdit').disabled=false;
// 	    document.getElementById('logSave').disabled=true;
// 	    document.getElementById('Logs').disabled=true;
// 	    $('#logEdit').css('background-color','white');
// 	    $('#logSave').css('background-color','#f4816c');
// 	}
//     }
//     this.onResize=function(x,y){
// 	$('#DPC').css({'width':0.46*x,
// 		       'height':0.65*y,
// 		       'margin-top':0.01*y,
// 		       'margin-bottom':0.01*y,
// 		       'margin-left':0.01*x,
// 		       'margin-right':0.01*x,
// 		       'padding-top':0.01*y,
// 		       'padding-bottom':0.01*y,
// 		       'padding-left':0.01*x,
// 		       'padding-right':0.01*x,
// 		      });
// 	$('#DPCStart,#DPCStop').css({'width':0.05*x});
// 	$('#DPCBuffer').css({'width':0.46*x,
// 			     'height':0.04*y,
// 			     'margin-top':0.01*y,
// 			     'margin-bottom':0.01*y,
// 			     'margin-left':0.01*x,
// 			     'margin-right':0.01*x,
// 			     'padding-top':0.01*y,
// 			     'padding-bottom':0.01*y,
// 			     'padding-left':0.01*x,
// 			     'padding-right':0.01*x,
// 		      });
// 	$('#DPCBufferStatus').css({'width':0.3*x});
// 	$('#DataFileStatus').css({'width':0.45*x});
// 	$('#Logs').css({
// 	    'width':0.45*x,
// 	    'height':0.54*y,
// 	    'margin':0,
// 	});
//     }
//     this.cover=function(){
// 	var x=window.innerWidth;
// 	var y=window.innerHeight;
// 	var W=document.getElementById("DPC").offsetWidth;
// 	var H=document.getElementById("DPC").offsetHeight;
// 	$('#DPCCover').css({
// 	    'width':W,
// 	    'height':H,
// 	    'background-color':'gray',
// 	    'position':'fixed',
// 	    'top':y*0.16,
// 	    'left':x*0.51,
// 	    'opacity': 0.5
// 	});
//     }
//     this.unCover=function(){
// 	$('#DPCCover').css({
// 	    'display':'none'
// 	});
//     }
// }
// //__________________________________________
// //Monitor
// //__________________________________________
// function Monitor(){
//     var that=this;
//     document.getElementById('MonitorAutoRefresh').checked=true;
//     this.IP=null;
//     this.Port=null;
//     this.pattern=null;
//     this.action={"Machine":"Monitor"}
//     this.status=-1;
//     this.WS=null;
//     this.onPatternChange=function(){
// 	var json=that.pattern.JSON();
// 	var ip=json.MonitorIP;
// 	var port=json.MonitorWSPort
// 	if(ip!=that.IP||port!=that.Port||that.WS==null){
// 	    that.IP=ip;
// 	    that.Port=port;
// 	    that.setupWS(ip,port);
// 	}
//     }
//     this.setupWS=function(ip,port){
// 	var ws=new WebSocket("ws://"+ip+":"+port);
// 	ws.onopen=function(){
// 	    that.unCover();
// 	    that.WS=ws;
// 	}
// 	ws.onclose=function(evt){
// 	    that.cover();
// 	    sleep(1000);
// 	    that.setupWS(that.IP,that.Port);
// 	}
// 	ws.onmessage=function(msg){
// 	    var msgJson=JSON.parse(msg.data);
// 	    if(msgJson["MonStatus"]!=null){
// 		that.status=msgJson["MonStatus"];
// 	    }
// 	    that.updateGUI();
// 	}
// 	ws.onerror=function(err){
// 	    that.cover();
// 	    sleep(1000);
// 	    that.setupWS(that.IP,that.Port);
// 	}
//     }
//     this.updateGUI=function(){
// 	if(that.status==-1) {
// 	    document.getElementById('MonitorCleanData').disabled=true;
// 	    document.getElementById('MonitorSwitch').checked=false;
// 	}else if(that.status==0){
// 	    document.getElementById('MonitorCleanData').disabled=false;
// 	    document.getElementById('MonitorSwitch').checked=true;
// 	}
//     }
//     this.onResize=function(x,y){
// 	$('#Monitor').css({'width':0.46*x,
// 		       'height':0.05*y,
// 		       'margin-top':0.01*y,
// 		       'margin-bottom':0.01*y,
// 		       'margin-left':0.01*x,
// 		       'margin-right':0.01*x,
// 		       'padding-top':0.01*y,
// 		       'padding-bottom':0.01*y,
// 		       'padding-left':0.01*x,
// 		       'padding-right':0.01*x,
// 		      });
//     }
//     this.cover=function(){
// 	var x=window.innerWidth;
// 	var y=window.innerHeight;
// 	var W=document.getElementById("Monitor").offsetWidth;
// 	var H=document.getElementById("Monitor").offsetHeight;
// 	$('#MonitorCover').css({
// 	    'width':W,
// 	    'height':H,
// 	    'background-color':'gray',
// 	    'position':'fixed',
// 	    'top':y*0.91,
// 	    'left':x*0.51,
// 	    'opacity': 0.5
// 	});
//     }
//     this.unCover=function(){
// 	$('#MonitorCover').css({
// 	    'display':'none'
// 	});
//     }    
// }
// //__________________________________________
// //__________________________________________
// DAQHandle=new DAQ();
// DPCHandle=new DPC();
// MonitorHandle=new Monitor();
// Pattern=new pattern('patternContent');
// DAQHandle.pattern=Pattern;
// DPCHandle.pattern=Pattern;
// MonitorHandle.pattern=Pattern;
// DAQHandle.updateGUI();
// DPCHandle.updateGUI();
// MonitorHandle.updateGUI();
// document.getElementById('patternContent').value=localStorage.getItem("pattern");
// DAQHandle.onPatternChange();
// DPCHandle.onPatternChange();
// MonitorHandle.onPatternChange();
// DAQHandle.cover();
// DPCHandle.cover();
// MonitorHandle.cover();
// (function(){
//     $('#patternContent').bind('input propertychange','textarea',function () {
// 	DAQHandle.onPatternChange();
// 	DPCHandle.onPatternChange();
// 	MonitorHandle.onPatternChange();
// 	localStorage.setItem("pattern",document.getElementById('patternContent').value);
//     });
// })();
// (function(){
//     $('#DAQInit').click(function(){
// 	el=document.getElementById('DAQInit');
// 	DAQHandle.action.action=el.textContent;
// 	DAQHandle.action.user=DAQHandle.pattern.JSON().user;
// 	DAQHandle.WS.send(JSON.stringify(DAQHandle.action));
//     });
// })();
// (function(){
//     $('#DAQStart').click(function(){
// 	el=document.getElementById('DAQStart');
// 	DAQHandle.action.action=el.textContent;
// 	DAQHandle.action.user=DAQHandle.pattern.JSON().user;
// 	DAQHandle.WS.send(JSON.stringify(DAQHandle.action));
//     });
// })();
// (function(){
//     $('#DAQStop').click(function(){
// 	el=document.getElementById('DAQStop');
// 	DAQHandle.action.action=el.textContent;
// 	DAQHandle.action.user=DAQHandle.pattern.JSON().user;
// 	DAQHandle.WS.send(JSON.stringify(DAQHandle.action));
//     });
// })();
// (function(){
//     $('#DAQSwitch').click(function(){
// 	switchStatus=document.getElementById('DAQSwitch').checked;
// 	if(switchStatus){
// 	    if(DAQHandle.pattern.JSON().action=="update pattern"){
// 		DAQHandle.WS.send(JSON.stringify(DAQHandle.pattern.JSON()));
// 	    }
// 	    DAQHandle.action.action="TurnOn";
// 	    DAQHandle.action.user=DAQHandle.pattern.JSON().user;
// 	    DAQHandle.WS.send(JSON.stringify(DAQHandle.action));
// 	}else{
// 	    DAQHandle.action.action="TurnOff";
// 	    DAQHandle.action.user=DAQHandle.pattern.JSON().user;
// 	    DAQHandle.WS.send(JSON.stringify(DAQHandle.action));
// 	}
//     });
// })();
// (function(){
//     $('#DPCSwitch').click(function(){
// 	switchStatus=document.getElementById('DPCSwitch').checked;
// 	if(switchStatus){
// 	    if(DPCHandle.pattern.JSON().action=="update pattern"){
// 		DPCHandle.WS.send(JSON.stringify(DPCHandle.pattern.JSON()));
// 	    }
// 	    DPCHandle.action.action="TurnOn";
// 	    DPCHandle.action.user=DPCHandle.pattern.JSON().user;
// 	    DPCHandle.WS.send(JSON.stringify(DPCHandle.action));
// 	}else{
// 	    DPCHandle.action.action="TurnOff";	    
// 	    DPCHandle.action.user=DPCHandle.pattern.JSON().user;
// 	    DPCHandle.WS.send(JSON.stringify(DPCHandle.action));
// 	}
//     });
// })();
// (function(){
//     $('#DPCStart').click(function(){
// 	el=document.getElementById('DPCStart');
// 	DPCHandle.action.action=el.textContent;
// 	DPCHandle.action.user=DPCHandle.pattern.JSON().user;
// 	DPCHandle.WS.send(JSON.stringify(DPCHandle.action));
//     });
// })();
// (function(){
//     $('#DPCStop').click(function(){
// 	el=document.getElementById('DPCStop');
// 	DPCHandle.action.action=el.textContent;
// 	DPCHandle.action.user=DPCHandle.pattern.JSON().user;
// 	DPCHandle.WS.send(JSON.stringify(DPCHandle.action));
//     });
// })();
// (function(){
//     $('#logEdit').click(function(){
// 	DPCHandle.action.action='EdittingLogs';
// 	DPCHandle.action.user=DPCHandle.pattern.JSON().user;
// 	DPCHandle.WS.send(JSON.stringify(DPCHandle.action));
//     });
// })();
// (function(){
//     $('#logSave').click(function(){
// 	DPCHandle.action.action='AddLogFile';
// 	DPCHandle.action.fileName=document.getElementById('DataFileName').textContent.replaceAll("\n\t","");
// 	DPCHandle.action.logs=document.getElementById('Logs').value;
// 	DPCHandle.action.user=DPCHandle.pattern.JSON().user;
// 	DPCHandle.WS.send(JSON.stringify(DPCHandle.action));
// 	delete DPCHandle.action['fileName'];
// 	delete DPCHandle.action['logs'];
//     });
// })();
// (function(){
//     $('#MonitorSwitch').click(function(){
// 	switchStatus=document.getElementById('MonitorSwitch').checked;
// 	if(switchStatus){
// 	    if(MonitorHandle.pattern.JSON().action=="update pattern"){
// 		MonitorHandle.WS.send(JSON.stringify(MonitorHandle.pattern.JSON()));
// 	    }
// 	    MonitorHandle.action.action="TurnOn";
// 	    MonitorHandle.action.user=MonitorHandle.pattern.JSON().user;
// 	    MonitorHandle.WS.send(JSON.stringify(MonitorHandle.action));
// 	}else{
// 	    MonitorHandle.action.action="TurnOff";	    
// 	    MonitorHandle.action.user=MonitorHandle.pattern.JSON().user;
// 	    MonitorHandle.WS.send(JSON.stringify(MonitorHandle.action));
// 	}
//     });
// })();
// (function(){
//     $('#MonitorCleanData').click(function(){
// 	el=document.getElementById('MonitorCleanData');
// 	MonitorHandle.action.action=el.textContent;
// 	MonitorHandle.action.user=MonitorHandle.pattern.JSON().user;
// 	MonitorHandle.WS.send(JSON.stringify(MonitorHandle.action));
//     });
// })();
// function update(){
//     if(document.getElementById('DAQAutoRefresh').checked){
// 	DAQHandle.action.action="status request";
// 	DAQHandle.action.user=DAQHandle.pattern.JSON().user;
// 	DAQHandle.WS.send(JSON.stringify(DAQHandle.action));
//     }
//     if(document.getElementById('DAQBufferAutoRefresh').checked){
// 	DAQHandle.action.action="buffer status request";
// 	DAQHandle.action.user=DAQHandle.pattern.JSON().user;
// 	DAQHandle.WS.send(JSON.stringify(DAQHandle.action));
//     }
//     if(document.getElementById('DPCAutoRefresh').checked){
// 	DPCHandle.action.action="status request";
// 	DPCHandle.action.user=DPCHandle.pattern.JSON().user;
// 	DPCHandle.WS.send(JSON.stringify(DPCHandle.action));
//     }
//     if(document.getElementById('DPCBufferAutoRefresh').checked){
// 	DPCHandle.action.action="buffer status request";
// 	DPCHandle.action.user=DPCHandle.pattern.JSON().user;
// 	DPCHandle.WS.send(JSON.stringify(DPCHandle.action));
//     }
//     if(document.getElementById('MonitorAutoRefresh').checked){
// 	MonitorHandle.action.action="status request";
// 	MonitorHandle.action.user=MonitorHandle.pattern.JSON().user;
// 	MonitorHandle.WS.send(JSON.stringify(MonitorHandle.action));
//     }
// }
// self.setInterval("update()",3000);
// function resize(){
//     var x=window.innerWidth;
//     var y=window.innerHeight;
//     if(x>y){
// 	$('#leftPannel').css({'width':0.5*x,'height':y});
// 	$('#rightPannel').css({'width':0.5*x,'height':y});
//     }else{
// 	$('#leftPannel').css({'width':x,'height':0.5*y});
// 	$('#rightPannel').css({'width':x,'height':0.5*y});	
//     }
//     Pattern.onResize(x,y);
//     DAQHandle.onResize(x,y);
//     DPCHandle.onResize(x,y);
//     MonitorHandle.onResize(x,y);
// }
// function onload(){
//     resize();
// }
// resize();
