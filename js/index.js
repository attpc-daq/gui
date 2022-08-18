((doc) => {
    const oList = doc.querySelector('#list')
    const oMsg = doc.querySelector('#message')
    const oSendbtn = doc.querySelector('#send')
    const oConnectButton = doc.querySelector('#connect')
    doc.getElementById('connect').style.backgroundColor='#999999'
    const oIP = doc.querySelector('#ip')
    oIP.value = '10.155.101.208'
    const oPort = doc.querySelector('#port')
    oPort.value = '8000'
    var ws = null
    let userName = 'Client'
    let passWord = ''
    oSendbtn.setAttribute('disabled',true)
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
     oSendbtn.addEventListener('click', handSend, false)
     oConnectButton.addEventListener('click',connect,false)
     oMsg.addEventListener('keydown', inputs, false)
    }
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
      //ws.send(JSON.stringify(msg))
      ws.send(msg)
      date = new Date()
      oMsg.value = ''
      data ={
        user: userName,
        msg,
        type:'Request',
        dateTime: date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
      }
      oList.appendChild(createMsg(data))
      window.scrollTo(0, doc.body.scrollHeight)
    }
    function handleOpen (e) {
      date = new Date()
        data ={
            user: userName,
            msg:'connection established',
            type:'Info',
            dateTime: date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
          }
          oList.appendChild(createMsg(data))
          window.scrollTo(0, doc.body.scrollHeight)
          doc.getElementById("send").disabled=false;
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
          oList.appendChild(createMsg(data))
          window.scrollTo(0, doc.body.scrollHeight)
          doc.getElementById("send").disabled=true;
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
          oList.appendChild(createMsg(data))
          window.scrollTo(0, doc.body.scrollHeight)
          doc.getElementById("send").disabled=true;
          doc.getElementById('connect').style.backgroundColor='#999999'
          delete ws
    }
    function handleMessage (e) {
     console.log('message', e)
     date = new Date()
     const data ={
        user: 'Server',
        msg: e.data,
        type: 'Response',
        dateTime: date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
      }
     oList.appendChild(createMsg(data))
     window.scrollTo(0, doc.body.scrollHeight)
    }
    function createMsg(data) {
     const {user, msg, type, dateTime} = data
     const oItem = doc.createElement('li')
     oItem.innerHTML = `
     <p>
     <span>${user}</span>
     <span>${dateTime}</span>
     </p>
     <p>${type}：${msg}</p>
     `
     return oItem
    }
    init()
 })(document)
 
 