((doc) => {
    const oConnectButton = doc.querySelector('#connect')
    const oUpdateButton = doc.querySelector('#update')
    const oIP = doc.querySelector('#ip')
    oIP.value = '10.155.101.208'
    const oPort = doc.querySelector('#port')
    oPort.value = '8000'
    const oROOTObjectNameSelect = doc.querySelector('#ROOTObjectName');
    oROOTObjectNameSelect.innerHTML = '';
    const oDrawOptionSelect = doc.querySelector('#drawOption');
    oDrawOptionSelect.value = 'AL'; // 设置默认选项为 AL
    const oAutoRefreshCheckbox = doc.querySelector('#autoRefresh');
    let refreshTimer = null;

    let userName = 'Client'
    var ws = null
    const init = () => {
	bindEvent()
    }
    function bindEvent() {
	oConnectButton.addEventListener('click',connect,false);
	oUpdateButton.addEventListener('click',requestJSON,false);
    oAutoRefreshCheckbox.addEventListener('change', handleAutoRefreshChange, false);
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
	requestJSON(e)
    ws.send('getqalist')
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

    function requestJSON (e) {
        msg = 'getQA '+ oROOTObjectNameSelect.value
	    ws.send(msg)
    }

    function draw(root_json){
	let obj = JSROOT.parse(root_json);
	
	JSROOT.redraw("drawing", obj, oDrawOptionSelect.value);
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
	appendMessage(createMsg(data));
    // window.scrollTo(0, doc.body.scrollHeight);
    var rsp = e.data.split(" ");
    if(rsp[0]=="QAList"){
        const listArray = rsp[1].split("\t");
        listArray.forEach((item) => {
            console.log(item); // 在控制台打印每个元素
            var option = document.createElement('option');
            option.text = item;
            oROOTObjectNameSelect.appendChild(option);
        });
    }
    else draw(JSON.parse(e.data))
    }
    function appendMessage(msg){
    }
    function createMsg(data) {
	const {user, msg, type, dateTime} = data;
	return user+"  --"+type+"--\n  ( "+dateTime+" )    "+msg;
    }

    function handleAutoRefreshChange() {
        if (oAutoRefreshCheckbox.checked) {
          startAutoRefresh();
        } else {
          stopAutoRefresh();
        }
      }
    
      function startAutoRefresh() {
        refreshTimer = setInterval(requestJSON, 5000);
      }
    
      function stopAutoRefresh() {
        clearInterval(refreshTimer);
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
