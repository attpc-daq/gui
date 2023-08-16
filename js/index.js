((doc) => {
    const oMsg = doc.querySelector('#message')
    const oSendbtn = doc.querySelector('#send')
    const oConnectButton = doc.querySelector('#connect')
    const oExecOneButton = doc.querySelector('#execOne')
    const oExecButton = doc.querySelector('#exec')
    const oPattern = doc.querySelector('#patternContent')
    doc.getElementById('connect').style.backgroundColor='#999999'
    const oIP = doc.querySelector('#ip')
    oIP.value = '10.155.101.208'
    const oPort = doc.querySelector('#port')
    oPort.value = '8000'
    var ws = null
    let userName = 'Client'
    let passWord = ''
    oSendbtn.setAttribute('disabled',true)
    oExecButton.setAttribute('disabled',true)
    oExecOneButton.setAttribute('disabled',true)
    const init = () => {
        let url = location.search
        if (url.indexOf('?') !== -1) {
            let str = String(url).slice(0)
            let arr =  str.split('&')
            userName = arr[0].split('=')[1]
            passWord = arr[1].split('=')[1]
            console.log('userNamepassWord', userName, passWord)
        }
	bindEvent()
    }
    function bindEvent() {
	oSendbtn.addEventListener('click', handSend, false);
	oConnectButton.addEventListener('click',connect,false);
	oMsg.addEventListener('keydown', inputs, false);
	oExecOneButton.addEventListener('click',execOne,false);
	oExecButton.addEventListener('click',exec,false);
	oPattern.addEventListener('click',selectCommand,false);
    }
    function selectCommand(){
	if(doc.getElementById('execOne').disabled==true) return;
	line=getLineNumber(doc.getElementById('patternContent'));
	arrayOfLines = $('#patternContent').val().split('\n');
	document.getElementById("message").value = arrayOfLines[line-1];
    focusLine(line)
    }
    function getLineNumber(textarea) {
        return textarea.value.substr(0, textarea.selectionStart).split('\n').length;        
    };
    function focusLine(lineNumber){
	pattern = doc.getElementById('patternContent');
	arrayOfLines = pattern.value.split('\n');
	var pos0=0
	var pos1=0
	for(let i =0;i<lineNumber;i++){
	    if(i>=arrayOfLines.length)break;
	    pos0=pos1
	    pos1=pos1+arrayOfLines[i].length+"\n".length;
	}
	pattern.setSelectionRange(pos0,pos1);
	pattern.focus();
	document.getElementById("message").value = arrayOfLines[lineNumber-1];
    }
    async function exec(){
        pattern = doc.getElementById('patternContent');
        line=getLineNumber(pattern);
        arrayOfLines = pattern.value.split('\n');
        oExecOneButton.setAttribute('disabled',true)
        oExecButton.setAttribute('disabled',true)

        lineStr = arrayOfLines[line-1];
        lineContent = lineStr.split(' ');
        if(lineContent[0]=='#pause') line++ 

        for(let i =line-1;i<arrayOfLines.length;i++){
            focusLine(i+1);
            lineStr = arrayOfLines[i];
            if(lineStr[0]!='#'){
                wsSend(arrayOfLines[i]);   
            }else{
                lineContent = lineStr.split(' ');
                if(lineContent[0]=='#sleep'){
                    await new Promise(r => setTimeout(r, lineContent[1]));
                }else if(lineContent[0]=='#pause'){
                    break
                }
            }
        }
        doc.getElementById('exec').disabled = false
        doc.getElementById('execOne').disabled = false
        //doc.getElementById('execAll').disabled = false
    }
    async function execOne(){
	pattern = doc.getElementById('patternContent');
	line=getLineNumber(pattern);
	arrayOfLines = pattern.value.split('\n');
        lineStr = arrayOfLines[line-1];
        if(lineStr[0]!='#'){
            wsSend(arrayOfLines[line-1]);
            document.getElementById("message").value = arrayOfLines[line-1];
        }else{
            lineContent = lineStr.split(' ');
            if(lineContent[0]=='#sleep'){
                await new Promise(r => setTimeout(r, lineContent[1]));
            }
        }
	focusLine(line+1);
    }
    // async function execAll(){
	// if(doc.getElementById('execAll').disabled==true) return;
    //     oExecOneButton.setAttribute('disabled',true)
    //     oExecAllButton.setAttribute('disabled',true)
    //     oExecButton.setAttribute('disabled',true)
    //     arrayOfLines = $('#patternContent').val().split('\n');
    //     for(let i =0;i<arrayOfLines.length;i++){
    //         lineStr = arrayOfLines[i];
    //         if(lineStr[0]!='#'){
    //             focusLine(i+1);
    //             wsSend(arrayOfLines[i]);
    //         }else{
    //             lineContent = lineStr.split(' ');
    //             if(lineContent[0]=='#sleep'){
    //                 await new Promise(r => setTimeout(r, lineContent[1]));
    //             }
    //         }
    //     }
    //     doc.getElementById('exec').disabled = false
    //     doc.getElementById('execOne').disabled = false
    //     doc.getElementById('execAll').disabled = false
    //     return
    // }
    function inputs(e){
        if(doc.getElementById('send').disabled==true) return
        if(e.key=='Enter'){
            handSend(e)
        }
    }
    function connect(e) {
        if (!ws){
            ws = new WebSocket('ws:'+oIP.value+':'+oPort.value)
            ws.addEventListener('open', handleOpen, false)
            ws.addEventListener('close', handleClose, false)
            ws.addEventListener('error', handleError, false)
            ws.addEventListener('message', handleMessage, false)
        }else{
            delete ws
            oSendbtn.setAttribute('disabled',true)
	        oExecButton.setAttribute('disabled',true)
            oExecOneButton.setAttribute('disabled',true)
            ws = new WebSocket('ws:'+oIP.value+':'+oPort.value)
            ws.addEventListener('open', handleOpen, false)
            ws.addEventListener('close', handleClose, false)
            ws.addEventListener('error', handleError, false)
            ws.addEventListener('message', handleMessage, false)
        }
    }
    function handSend (e) {
        const msg = oMsg.value
        if (!msg.trim().length) {
            return
        }
        wsSend(msg)
    }
    function wsSend (msg) {
	if(doc.getElementById('send').disabled==true) return;
	if (!msg.trim().length) return;
	ws.send(msg)
	date = new Date()
	oMsg.value = ''
	data ={
            user: userName,
            msg,
            type:'Request',
            dateTime: date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
	}
	appendMessage(createMsg(data));
    }
    function handleOpen (e) {
        date = new Date()
        data ={
            user: userName,
            msg:'connection established',
            type:'Info',
            dateTime: date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
        }
        //oList.appendChild(createMsg(data))
	appendMessage(createMsg(data));
        //window.scrollTo(0, doc.body.scrollHeight)
        doc.getElementById("send").disabled=false;
        // doc.getElementById("execAll").disabled=false;
        doc.getElementById("execOne").disabled=false;
        doc.getElementById("exec").disabled=false;
        doc.getElementById('connect').style.backgroundColor='#00FF00'
    }
    function handleClose (e) {
        date = new Date()
        data ={
            user: userName,
            msg:'connection closed',
            type: 'Info',
            dateTime: date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
        }
        //oList.appendChild(createMsg(data))
	appendMessage(createMsg(data));
        //window.scrollTo(0, doc.body.scrollHeight)
        doc.getElementById("send").disabled=true;
        // doc.getElementById("execAll").disabled=true;
        doc.getElementById("execOne").disabled=true;
        doc.getElementById("exec").disabled=true;
        doc.getElementById('connect').style.backgroundColor='#999999'
        delete ws
    }
    function handleError (e) {
        date = new Date()
        data ={
            user: userName,
            msg:'connection error',
            type: 'Info',
            dateTime: date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
        }
        //oList.appendChild(createMsg(data))
	appendMessage(createMsg(data));
        //window.scrollTo(0, doc.body.scrollHeight)
        doc.getElementById("send").disabled=true;
        doc.getElementById("exec").disabled=true;
        doc.getElementById("execOne").disabled=true;
        doc.getElementById('connect').style.backgroundColor='#999999'
        delete ws
    }
    function handleMessage (e) {
	console.log('message', e);
	date = new Date();
	const data ={
            user: 'Server',
            msg: e.data,
            type: 'Response',
            dateTime: date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
	};
	//oList.appendChild(createMsg(data))
	appendMessage(createMsg(data));
	window.scrollTo(0, doc.body.scrollHeight);
    }
    function appendMessage(msg){
	var textArea=document.getElementById('messages');
	textArea.value=textArea.value+"\n"+msg;
	textArea.scroll({ top: textArea.scrollHeight, left: 0, behavior: "smooth" })
    }
    function createMsg(data) {
	const {user, msg, type, dateTime} = data;
	return user+"  --"+type+"--\n  ( "+dateTime+" )    "+msg;
    }
    init()
})(document);

((doc) => {
    function loadFile(){
	var reader = new FileReader();
	reader.onload = function(file){
	    var textArea=document.getElementById('patternContent');
	    textArea.value=file.target.result;
	    textArea.scrollTop=textArea.scrollHeight;
	    localStorage.setItem("pattern",document.getElementById('patternContent').value);    }
	reader.readAsText(this.files[0]);
    }
    const oFile = doc.querySelector('#fileSelector')
    oFile.addEventListener('change',loadFile,false)    
})(document);
((doc) => {
    handle();
    window.addEventListener('resize',handle,false)
    function handle(){
	var x=window.innerWidth;
	var y=window.innerHeight-10;
	if(x>y){
	    $('#leftPannel').css({'width':0.48*x,
				  'margin-top':0.01*y,
				  'margin-bottom':0.01*y,
				  'margin-left':0.01*x,
				  'margin-right':0.01*x,
				  'height':0.98*y});
	    $('#rightPannel').css({'width':0.48*x,
				   'margin-top':0.01*y,
				   'margin-bottom':0.01*y,
				   'margin-left':0.01*x,
				   'margin-right':0.01*x,
				   'height':0.98*y});
	}else{
	    $('#leftPannel').css({'width':x,'height':0.5*y});
	    $('#rightPannel').css({'width':x,'height':0.5*y});	
	}
	$('#patternContent').css({'width':0.44*x,
				  'height':0.98*y-140,
				  'margin-top':0.01*y,
				  'margin-bottom':0.01*y,
				  'margin-left':0.01*x,
				  'margin-right':0.01*x,
				  'padding-top':0.01*y,
				  'padding-bottom':0.01*y,
				  'padding-left':0.01*x,
				  'padding-right':0.01*x,
				 });
	$('#messages').css({'width':0.44*x,
			    'height':0.98*y-140,
			    'margin-top':0.01*y,
			    'margin-bottom':0.01*y,
			    'margin-left':0.01*x,
			    'margin-right':0.01*x,
			    'padding-top':0.01*y,
			    'padding-bottom':0.01*y,
			    'padding-left':0.01*x,
			    'padding-right':0.01*x,
			   });
	$()
    }
})(document);
