((doc) => {
    const oConnectButton = doc.querySelector('#connect')
    const oFileSelect = doc.querySelector('#select')
    const oUploadButton = doc.querySelector('#upload')
    const oIP = doc.querySelector('#ip')
    oIP.value = '10.155.101.208'
    const oPort = doc.querySelector('#port')
    oPort.value = '8000'
    let userName = 'Client'
    var ws = null
    const init = () => {bindEvent()}
    function bindEvent() {
	    oConnectButton.addEventListener('click',connect,false);
        oFileSelect.addEventListener('change',select,false);
        oUploadButton.addEventListener('click', upload, false);
    }
    var fileContent = '';
    function select(e){
        var reader = new FileReader();
        reader.onload = function(file){         
            fileContent=file.target.result;
        }
        reader.readAsText(oFileSelect.files[0]);
    }
    function upload(e){
        ws.send(fileContent);
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
            ws = new WebSocket('ws:'+oIP.value+':'+oPort.value)
            ws.addEventListener('open', handleOpen, false)
            ws.addEventListener('close', handleClose, false)
            ws.addEventListener('error', handleError, false)
            ws.addEventListener('message', handleMessage, false)
        }
    }

    function handleOpen (e) {
	date = new Date()
        data ={
            user: userName,
            msg:'connection established',
            type:'Info',
            dateTime: date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
        }
	appendMessage(createMsg(data));
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
	appendMessage(createMsg(data));
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
	appendMessage(createMsg(data));
          doc.getElementById('connect').style.backgroundColor='#999999'
          delete ws
    }
    
    function handleMessage (e) {
	draw(JSON.parse(e.data))
	console.log('message', e);
	date = new Date();
	const data ={
            user: 'Server',
            msg: e.data,
            type: 'Response',
            dateTime: date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
	};
	appendMessage(createMsg(data));
	window.scrollTo(0, doc.body.scrollHeight);
    }
    function appendMessage(msg){
    }
    function createMsg(data) {
	const {user, msg, type, dateTime} = data;
	return user+"  --"+type+"--\n  ( "+dateTime+" )    "+msg;
    }
    init()
})(document);

((doc) => {
    handle();
    window.addEventListener('resize',handle,false)
    function handle(){
	var x=window.innerWidth;
	var y=window.innerHeight-10;

	$('#messages').css({'width':0.96*x,
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
