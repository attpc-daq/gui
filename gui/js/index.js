const expandables = document.querySelectorAll('.expandable');

let isExpanded = false;

expandables.forEach((expandable) =>{
    const header = expandable.querySelector('.header');
    const content = expandable.querySelector('.content');
    const toggle = header.querySelector('.toggle');
    const frame = content.querySelector('.frame')
    toggle.addEventListener('click', () => {
        toggle.querySelector('.toggle-icon').classList.toggle('active');
        if (!isExpanded) {
            content.style.height = content.scrollHeight + 'px';
            if(frame){
                content.style.height = "800px";
                content.style.width = "100%";
                frame.style.height = "100%";
                frame.style.width = "100%";
            }
            isExpanded = true;
        } else {
            content.style.height = '0';
            isExpanded = false;
        }
    });
});

function appendMessage(msg){
    var textArea=document.getElementById('messages');
    textArea.value=textArea.value+"\n"+msg;
    textArea.scroll({ top: textArea.scrollHeight, left: 0, behavior: "smooth" });
}
function createMsg(data) {
    const {user, msg, type, dateTime} = data;
    return user+"  --"+type+"--\n  ( "+dateTime+" )    "+msg;
}


((doc) => {
    //===========================FEE部分===========================
    // 获取电子学部分的按钮并禁用
    const feeButtons = doc.querySelectorAll('#FEE button');
    feeButtons.forEach((button) => {
        button.disabled = true;
    });
    // 获取电子学部分的按钮

    const feeInitButton = doc.querySelector('#FEE_init');
    feeInitButton.disabled = false;

    const feeStartButton = doc.querySelector('#FEE_data_start');
    const feeStopButton = doc.querySelector('#FEE_data_stop');
    const feeSetupButton = doc.querySelector('#FEE_setup');
    const feeselfhitButton = doc.querySelector('#FEE_selftrigger');
    const decoderStartButton = doc.querySelector('#FEE_start_decoder');
    const decoderStopButton = doc.querySelector('#FEE_stop_decoder');

    const feesetupthresholdButton = doc.querySelector('#setupthreshold');
    const feeThresholdFilePathInput = doc.querySelector('#thresholdFilePath');
    feeThresholdFilePathInput.value = './output/thresholdes.json'
    const feeSpanThresholdProcess = doc.querySelector('#thresholdprocess');
    const feeslopeButton = doc.querySelector('#slope');
    const feenchannelButton = doc.querySelector('#nchannel');
    const feehit_modeButton = doc.querySelector('#hit_mode');

    // 设置主机地址的默认值
    const hostAddressInput = doc.querySelector('#Host_IP');
    hostAddressInput.value = '10.155.101.208';
    // 设置端口的默认值
    const hostPortInput = doc.querySelector('#Host_Port');
    hostPortInput.value = '8000';
    // 设置电子学部分的SiTCP地址和端口

    const siTcpAddress_1_Input = doc.querySelector('#FEE1_addr');
    siTcpAddress_1_Input.value = '0.0.0.0';
    const siTcpport_1_Input = doc.querySelector('#FEE1_port');
    siTcpport_1_Input.value = '8001';

    const bufferFilePathInput1 = doc.querySelector('#FEE1_bufferPath');
    bufferFilePathInput1.value = './output/buffers1' ;

    const siTcpAddress_2_Input = doc.querySelector('#FEE2_addr');
    siTcpAddress_2_Input.value = '0.0.0.0';
    const siTcpport_2_Input = doc.querySelector('#FEE2_port');
    siTcpport_2_Input.value = '8002';

    const bufferFilePathInput2 = doc.querySelector('#FEE2_bufferPath');
    bufferFilePathInput2.value = './output/buffers2' ;

    const bufferFileSizeInput = doc.querySelector('#FEE_bufferSize');
    bufferFileSizeInput.value = '100000000';

    const FEE_setBufferSizeButton = doc.querySelector('#FEE_setBufferSize');


    const DP_HostPort = doc.querySelector('#DP_HostPort');

    const nTaskSpan1 = doc.querySelector('#DAQ1_nTask');
    const dataRateSpan1 = doc.querySelector('#DAQ1_dataRate');
    const nTaskSpan2 = doc.querySelector('#DAQ2_nTask');
    const dataRateSpan2 = doc.querySelector('#DAQ2_dataRate');

    // 设置斜率阈值的默认值
    const slopthresholdInput = doc.querySelector('#FEE input[placeholder="hex:0x0020 斜率阈值"]');
    slopthresholdInput.value = '0x0020';
    // 设置符合通道的默认值
    const nchannelInput = doc.querySelector('#FEE input[placeholder="hex:0x0004 符合通道"]');
    nchannelInput.value = '0x0004';
    // 设置触发模式的默认值
    const hitmodeInput = doc.querySelector('#FEE input[placeholder="hex:0x0001 触发模式"]');
    hitmodeInput.value = '0x0001';

    var ws = null
    let userName = 'Client'
    let passWord = ''
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
        feeInitButton.addEventListener('click', feeInit, false);
	    feeStartButton.addEventListener('click',feeStart,false);
	    feeStopButton.addEventListener('click',feeStop,false);

    
	    feeSetupButton.addEventListener('click',feeSetup,false);
        feeselfhitButton.addEventListener('click',feeselfhit,false);
        decoderStartButton.addEventListener('click',decoderStart,false);
        decoderStopButton.addEventListener('click',decoderStop,false);

        FEE_setBufferSizeButton.addEventListener('click',setBufferSize,false);
	    feesetupthresholdButton.addEventListener('click',feesetupthreshold,false);
        

	    feeslopeButton.addEventListener('click',feeslope,false);
        feenchannelButton.addEventListener('click',feenchannel,false);
	    feehit_modeButton.addEventListener('click',feehit_mode,false);
    }
    async function setBufferSize(){
        FEE_setBufferSizeButton.disabled = true;
        const command = `setBufferFileSize ${bufferFileSizeInput.value}`;
        wsSend(command)
    }
    async function feehit_mode(e){
        feehit_modeButton.disabled = true;
        feehit_modeButton.style.backgroundColor = 'white';
        const value = hitmodeInput.value;
        const cmd = '00102831'+'4'+value[5]+'5'+value[4]+'6'+value[3]+'7'+value[2]+'83';
        const command = `setfeehitmode ${cmd}`+' '+'081020384150607083'+' '+'021020394F5F6F7F83';
        wsSend(command);
        // await new Promise(r => setTimeout(r, 1000));
        // wsSend('send2device 081020384150607083');
        // await new Promise(r => setTimeout(r, 1000));
        // wsSend('send2device 021020394F5F6F7F83');
        // await new Promise(r => setTimeout(r, 1000));
    }
    async function feenchannel(e) {
        feenchannelButton.disabled = true;
        feenchannelButton.style.backgroundColor = '';
        const value = nchannelInput.value;
        const cmd = '02102831'+'4'+value[5]+'5'+value[4]+'6'+value[3]+'7'+value[2]+'83';
        const command = `setfeenchannel ${cmd}`;
        wsSend(command);
        // await new Promise(r => setTimeout(r, 1000));
    }
    async function feeslope(e) {
        feeslopeButton.disabled = true;
        feeslopeButton.style.backgroundColor = 'white';
        const value = slopthresholdInput.value;
        const cmd = '00112831'+'4'+value[5]+'5'+value[4]+'6'+value[3]+'7'+value[2]+'83';
        const command = `setfeeslope ${cmd}`;
        wsSend(command);
        // await new Promise(r => setTimeout(r, 1000));
    }
    function feesetupthreshold(e) {
        const value = feeThresholdFilePathInput.value;
        wsSend('setupthreshold '+ `${value}`);
        feesetupthresholdButton.disabled = true;
        feesetupthresholdButton.style.backgroundColor = '';
    }
    
    function feeselfhit(e) {
        wsSend('selftrigger');
        feeStartButton.disabled = true;
        feeStopButton.disabled = false;
        feeselfhitButton.disabled = true;
    }
    function feeSetup(e) {
        feesetupthreshold(e);
        feeslope(e);
        feenchannel(e);
        feehit_mode(e);
    }
    function feeStop(e) {
        wsSend('stopdata');
        feeStopButton.disabled = true;
    }
    function feeStart(e) {
        wsSend('startdata');
        feeStartButton.disabled = true;
    }
    function decoderStart(){
        wsSend('startDecoder');
    }
    function decoderStop(){
        wsSend('stopDecoder');
    }

    function feeInit(e){
        connect(e);
    }

    function connect(e) {
        if (!ws){
            ws = new WebSocket('ws:'+hostAddressInput.value+':'+hostPortInput.value);
            ws.addEventListener('open', handleOpen, false);
            ws.addEventListener('close', handleClose, false);
            ws.addEventListener('error', handleError, false);
            ws.addEventListener('message', handleMessage, false);
        }
    }
    function wsSend (msg) {
        if(!ws) return;
        if (!msg.trim().length) return;
        ws.send(msg);
    }
    function handleOpen (e) {
        feeButtons.forEach((button) => {
            button.disabled = false;
        });
        feeInitButton.style.backgroundColor = '#00FF00';
        feeInitButton.disabled=true;
        wsSend('register')
        const command = `initSitcp ${siTcpAddress_1_Input.value} ${siTcpport_1_Input.value} ${bufferFilePathInput1.value} ${siTcpAddress_2_Input.value} ${siTcpport_2_Input.value} ${bufferFilePathInput2.value} ${bufferFileSizeInput.value} ${DP_HostPort.value}`;
        wsSend(command)
    }
    function handleClose (e) {
        feeButtons.forEach((button) => {
            button.disabled = true;
            button.style.backgroundColor='';
        });
        feeInitButton.disabled=false;
        feeInitButton.style.backgroundColor='';
        delete ws;
        ws = null;
        dataRateSpan1.innerText = '';
        dataRateSpan2.innerText = '';
        nTaskSpan1.innerText = '';
        nTaskSpan2.innerText = '';
    }
    function handleError (e) {
        feeButtons.forEach((button) => {
            button.disabled = true;
            button.style.backgroundColor='';
        });
        feeInitButton.disabled=false;
        feeInitButton.style.backgroundColor='';
        delete ws;
        ws = null;
        dataRateSpan1.innerText = '-';
        dataRateSpan2.innerText = '-';
        nTaskSpan1.innerText = '-';
        nTaskSpan2.innerText = '-';
    }
    function handleMessage (e) {
        var rsp = e.data.split(" ");
        if(rsp[0]=="dataRate1"){
            dataRateSpan1.innerText = parseFloat(rsp[1]).toFixed(2);
        }
        else if(rsp[0]=="dataRate2"){
            dataRateSpan2.innerText = parseFloat(rsp[1]).toFixed(2);
        }
        else if(rsp[0]=="nTask1"){
            nTaskSpan1.innerText = parseInt(rsp[1]);
        }
        else if(rsp[0]=="nTask2"){
            nTaskSpan2.innerText = parseInt(rsp[1]);
        }
        else if(rsp[0]=="nositcp1"){
            siTcpAddress_1_Input.style.backgroundColor='red';
        }
        else if(rsp[0]=="nositcp2"){
            siTcpAddress_2_Input.style.backgroundColor='red';
        }
        else if(rsp[0]=="decoderState1"){
            if(rsp[1]=='False'){
                decoderStartButton.style.backgroundColor='';
            }else{
                decoderStartButton.style.backgroundColor='#00FF00';
            }
        }
        else if(rsp[0]=="daqState1"){
            if(parseInt(rsp[1])==2){
                feeStartButton.style.backgroundColor='#00FF00';
            }else{
                feeStartButton.style.backgroundColor='';
            }
        }
        else if(rsp[0]=="decoderState2"){
            if(rsp[1]=='False'){
                decoderStartButton.style.backgroundColor='';
            }else{
                decoderStartButton.style.backgroundColor='#00FF00';
            }
        }
        else if(rsp[0]=="daqState2"){
            if(parseInt(rsp[1])==2){
                feeStartButton.style.backgroundColor='#00FF00';
            }else{
                feeStartButton.style.backgroundColor='';
            }
        }
        if(rsp[0]=="selftrigger"){
            feeselfhitButton.disabled = false;
            alert("噪声测试配置完成");
        }
        else if(rsp[0]=="thresholdsetting"){
            feeSpanThresholdProcess.innerText = rsp[1];
            feesetupthresholdButton.disabled = false;
            feesetupthresholdButton.style.backgroundColor = '#00FF00';
        }
        else if(rsp[0]=="setfeenchannel"){
            feenchannelButton.disabled = false;
            feenchannelButton.style.backgroundColor = '#00FF00';
        }
        else if(rsp[0]=="setfeeslope"){
            feeslopeButton.disabled = false;
            feeslopeButton.style.backgroundColor = '#00FF00';
        }
        else if(rsp[0]=="setfeehitmode"){
            feehit_modeButton.disabled = false;
            feehit_modeButton.style.backgroundColor = '#00FF00';
        }
        else if(rsp[0]=="setBufferFileSize"){
            FEE_setBufferSizeButton.disabled = false;
            FEE_setBufferSizeButton.style.backgroundColor='#00FF00';
        }
    }
    function dump(){
        wsSend('dumpSitcp');
    }
    setInterval(dump, 1000);
    init()
})(document);

((doc) => {
    //===========================RawEventProcessor部分===========================
    // RawEventProcessor的按钮并禁用
    const RawEventProcessorButtons = doc.querySelectorAll('#RawEventProcessor button');
    RawEventProcessorButtons.forEach((button) => {
        button.disabled = true;
    });

    const DPInitButton = doc.querySelector('#DP_init');
    DPInitButton.disabled = false;
    const DP_HostPort = doc.querySelector('#DP_HostPort');
    DP_HostPort.value = '8003';
    const QA_HostPort = doc.querySelector('#QA_HostPort');
    QA_HostPort.value = '8004';
    const eventsPerFile = doc.querySelector('#eventsPerFile');
    eventsPerFile.value = 100;
    const storageDir = doc.querySelector('#storageDir');
    storageDir.value = './output'
    // event rate 显示
    const eventRateSpan = doc.querySelector('#eventRate');
    // 设置主机地址的默认值
    const hostAddressInput = doc.querySelector('#Host_IP');
    // 设置端口的默认值
    const hostPortInput = doc.querySelector('#Host_Port');

    const RawEventProcessorStartButton = doc.querySelector('#DP_start');
    const RawEventProcessorStopButton = doc.querySelector('#DP_stop');

    const RawEventStartButton = doc.querySelector('#DP_start_rawevent');
    const RawEventStopButton = doc.querySelector('#DP_stop_rawevent');
    const EventStartButton = doc.querySelector('#DP_start_event');
    const EventStopButton = doc.querySelector('#DP_stop_event');
    const QADataStartButton = doc.querySelector('#DP_start_QAData');
    const QADataStopButton = doc.querySelector('#DP_stop_QAData');

    const raweventFilesSpan = doc.querySelector('#raweventFiles');

    const ParameterButton = doc.querySelector('#DP_ParameterButton');
    const ParameterEventsInput = doc.querySelector('#DP_ParameterEventsInput');
    ParameterEventsInput.value = 100;
    const ParaterEventsSpan = doc.querySelector('#DP_ParameterEvents');
    ParaterEventsSpan.innerText = "";

    const WvaluelInput = doc.querySelector('#RawEventProcessor input[placeholder="Wvalue"]');
    WvaluelInput.value = 30.0;
    const VdriftlInput = doc.querySelector('#RawEventProcessor input[placeholder="Vdrift"]');
    VdriftlInput.value = 10.0;
    const FEE00_01Input = doc.querySelector('#FEE00_01');
    FEE00_01Input.value = 02;
    const FEE02_03Input = doc.querySelector('#FEE02_03');
    FEE02_03Input.value = 00;
    const FEE04_05Input = doc.querySelector('#FEE04_05');
    FEE04_05Input.value = 10;
    const FEE06_07Input = doc.querySelector('#FEE06_07');
    FEE06_07Input.value = 08;
    const FEE08_09Input = doc.querySelector('#FEE08_09');
    FEE08_09Input.value = 15;
    const FEE10_11Input = doc.querySelector('#FEE10_11');
    FEE10_11Input.value = 15;
    const FEE12_13Input = doc.querySelector('#FEE12_13');
    FEE12_13Input.value = 15;
    const FEE14_15Input = doc.querySelector('#FEE14_15');
    FEE14_15Input.value = 15;
    const FEE16_17Input = doc.querySelector('#FEE16_17');
    FEE16_17Input.value = 15;
    const FEE18_19Input = doc.querySelector('#FEE18_19');
    FEE18_19Input.value = 15;
    const FEE20_21Input = doc.querySelector('#FEE20_21');
    FEE20_21Input.value = 15;
    const FEE22_23Input = doc.querySelector('#FEE22_23');
    FEE22_23Input.value = 15;
    const FEE24_25Input = doc.querySelector('#FEE24_25');
    FEE24_25Input.value = 15;
    const FEE26_27Input = doc.querySelector('#FEE26_27');
    FEE26_27Input.value = 15;
    const FEE28_29Input = doc.querySelector('#FEE28_29');
    FEE28_29Input.value = 15;
    const FEE30_31Input = doc.querySelector('#FEE30_31');
    FEE30_31Input.value = 15;
    const ElectrnicGainFilePathInput = doc.querySelector('#RawEventProcessor input[type="text"][placeholder="电子学增益配置文件"]');
    ElectrnicGainFilePathInput.value = 'ElectronicFilePath';
    const MicromegasGasFilePathInput = doc.querySelector('#RawEventProcessor input[type="text"][placeholder="阳极板增益配置文件"]');
    MicromegasGasFilePathInput.value = 'MicromegasFilePath';

    const NRawEventsPerFileInput = doc.querySelector('#RawEventProcessor input[type="text"][placeholder="单文件事件数"]');
    const RawEventFilePathInput = doc.querySelector('#RawEventProcessor input[type="text"][placeholder="文件存储位置"]');
    // RawEventFilePathInput.style.width = '500px';

    var ws = null
    let userName = 'Client'
    let passWord = ''
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
        //#Net
        DPInitButton.addEventListener('click',DPInit,false);
        //#RawEventProcessor
        RawEventProcessorStartButton.addEventListener('click',RawEventProcessorStart,false);
        RawEventProcessorStopButton.addEventListener('click',RawEventProcessorStop,false);
        NRawEventsPerFileInput.addEventListener('keydown', setNRawEventsPerFile, false);
        RawEventFilePathInput.addEventListener('keydown', setRawEventFilePath, false);

        RawEventStartButton.addEventListener('click', turnOnRawEventSave, false);
        RawEventStopButton.addEventListener('click',turnOffRawEventSave,false);
        EventStartButton.addEventListener('click',turnOnEventSave,false);
        EventStopButton.addEventListener('click',turnOffEventSave,false);
        QADataStartButton.addEventListener('click',turnOnQAData,false);
        QADataStopButton.addEventListener('click',turnOffQAData,false);

        ParameterButton.addEventListener('click',parameterGenerate,false);
        
    }
    function parameterGenerate(){
        wsSend('generateParameter ' + ParameterEventsInput.value);
        ParameterButton.disabled = true;
    }
    function turnOnRawEventSave(){
        wsSend('turnOnRawEventSave');
        RawEventStartButton.disabled = true;
        RawEventStopButton.disabled = false;
    }
    function turnOffRawEventSave(){
        wsSend('turnOffRawEventSave')
        RawEventStartButton.disabled = false;
        RawEventStopButton.disabled = true;
    }
    function turnOnEventSave(){
        wsSend('turnOnEventSave')
        EventStartButton.disabled = true;
        EventStopButton.disabled = false;
    }
    function turnOffEventSave(){
        wsSend('turnOffEventSave')
        EventStartButton.disabled = false;
        EventStopButton.disabled = true;
    }
    function turnOnQAData(){
        wsSend('turnOnQAData')
        QADataStartButton.disabled = true;
        QADataStopButton.disabled = false;
    }
    function turnOffQAData(){
        wsSend('turnOffQAData')
        QADataStartButton.disabled = false;
        QADataStopButton.disabled = true;
    }
    function setRawEventFilePath(){
        if(e.key==='Enter'){
            const path = RawEventFilePathInput.value;
            const command = `setdir ${path}`;
            wsSend(command);
        }
    }
    function setNRawEventsPerFile(){
        if(e.key==='Enter'){
            const NEvents = NRawEventsPerFileInput.value;
            const command = `setEventsPerFile ${NEvents}`;
            wsSend(command);
        }
    }
    function RawEventProcessorStop(){
        wsSend('stopdataprocessor');
        RawEventProcessorStartButton.disabled = true;
        RawEventProcessorStopButton.disabled = true;
        ParameterButton.disabled = true;
    }
    function RawEventProcessorStart(){
        wsSend('startdataprocessor');
        RawEventProcessorStartButton.disabled = true;
        RawEventProcessorStopButton.disabled = false;
        ParameterButton.disabled = false;
    }
    function RawEventProcessorInit(){
        if (RawEventFilePathInput.value !== ''){
            const path = RawEventFilePathInput.value;
            const command = `setdir ${path}`;
            wsSend(command);
        }
        if (NRawEventsPerFileInput.value !== ''){
            const NEvents = NRawEventsPerFileInput.value;
            const command = `setEventsPerFile ${NEvents}`;
            wsSend(command);
        }
        const command = `initdataprocessor ${storageDir.value} ${DP_HostPort.value} ${QA_HostPort.value} ${eventsPerFile.value} `;
        wsSend(command)
        RawEventProcessorStartButton.disabled = false;
        RawEventProcessorStopButton.disabled = false;

        RawEventStartButton.disabled = false;
        EventStartButton.disabled = false;
        QADataStartButton.disabled = false;

        const command1 = `setWvalueAndVdrift ${WvaluelInput.value} ${VdriftlInput.value}`;
        wsSend(command1);
        const command2 = `setGainFile ${ElectrnicGainFilePathInput.value} ${MicromegasGasFilePathInput.value}`;
        // console.log('command2',command2)
        wsSend(command2);
        const FPC2 = [
            {"0": FEE00_01Input.value},
            {"1": FEE00_01Input.value},
            {"2": FEE02_03Input.value},
            {"3": FEE02_03Input.value},
            {"4": FEE04_05Input.value},
            {"5": FEE04_05Input.value},
            {"6": FEE06_07Input.value},
            {"7": FEE06_07Input.value},
            {"8": FEE08_09Input.value},
            {"9": FEE08_09Input.value},
            {"10": FEE10_11Input.value},
            {"11": FEE10_11Input.value},
            {"12": FEE12_13Input.value},
            {"13": FEE12_13Input.value},
            {"14": FEE14_15Input.value},
            {"15": FEE14_15Input.value},
            {"16": FEE16_17Input.value},
            {"17": FEE16_17Input.value},
            {"18": FEE18_19Input.value},
            {"19": FEE18_19Input.value},
            {"20": FEE20_21Input.value},
            {"21": FEE20_21Input.value},
            {"22": FEE22_23Input.value},
            {"23": FEE22_23Input.value},
            {"24": FEE24_25Input.value},
            {"25": FEE24_25Input.value},
            {"26": FEE26_27Input.value},
            {"27": FEE26_27Input.value},
            {"28": FEE28_29Input.value},
            {"29": FEE28_29Input.value},
            {"30": FEE30_31Input.value},
            {"31": FEE30_31Input.value}
        ];        
        // const jsonString = JSON.stringify(FPC2);
        const jsonString = JSON.stringify(FPC2, null, 0);
        // console.log('jsonString',jsonString)
        const command3 = `setFPC2 ${jsonString}`
        // console.log('command3',command3)
        wsSend(command3)
            
    }
    function DPInit(e){
        connect(e);
    }
    function connect(e) {
        if (!ws){
            ws = new WebSocket('ws:'+hostAddressInput.value+':'+hostPortInput.value);
            ws.addEventListener('open', handleOpen, false);
            ws.addEventListener('close', handleClose, false);
            ws.addEventListener('error', handleError, false);
            ws.addEventListener('message', handleMessage, false);
        }
    }
    function wsSend (msg) {
        if(!ws) return;
        if (!msg.trim().length) return;
        ws.send(msg);
    }
    function handleOpen (e) {
        DPInitButton.style.backgroundColor = '#00FF00';
        DPInitButton.disabled=true;
        wsSend('register')
        // const command = `initSitcp ${siTcpAddress_1_Input.value} ${siTcpport_1_Input.value} ${bufferFilePathInput1.value} ${siTcpAddress_2_Input.value} ${siTcpport_2_Input.value} ${bufferFilePathInput2.value} ${bufferFileSizeInput.value} ${DP_HostPort.value}`;
        // wsSend(command)
        RawEventProcessorInit();
        RawEventProcessorStartButton.disabled = false;
        RawEventProcessorStopButton.disabled = false;
    }
    function handleClose (e) {
        RawEventProcessorButtons.forEach((button) => {
            button.disabled = true;
            button.style.backgroundColor='';
        });
        eventRateSpan.innerText = '-';
        DPInitButton.disabled = false;
        delete ws;
        ws = null;
    }
    function handleError (e) {
        RawEventProcessorButtons.forEach((button) => {
            button.disabled = true;
            button.style.backgroundColor='';
        });
        DPInitButton.disabled = false;
        eventRateSpan.innerText = '-';
        delete ws;
        ws = null;
    }
    function handleMessage (e) {
        var rsp = e.data.split(" ");
        if(rsp[0]=="eventRate"){
            eventRateSpan.innerText = parseFloat(rsp[1]).toFixed(2);
        }
        else if(rsp[0]=="parameterEvent"){
            ParaterEventsSpan.innerText = parseInt(rsp[1]);
            if(parseInt(rsp[1]) == 0) {
                alert("参数文件已产生");
                ParameterButton.disabled = false;
        }
        }
        else if(rsp[0]=="raweventFiles"){
            raweventFilesSpan.innerText = parseInt(rsp[1]);
        }
        else if(rsp[0]=="DPState"){
            if(parseInt(rsp[1]) == 2){
                RawEventProcessorStartButton.style.backgroundColor='#00FF00'
                RawEventProcessorStopButton.style.backgroundColor=''
            }
            if(parseInt(rsp[1]) == 4){
                RawEventProcessorStopButton.style.backgroundColor='Red'
                RawEventProcessorStartButton.style.backgroundColor=''
            }
        }
        else if(rsp[0]=="NODP"){

        }
    }

    function dump(){
        wsSend('dumpDP');
    }
    setInterval(dump, 1000);
    init()
})(document);


((doc) => {
    //===========================QAProcessor部分===========================
    // QAProcessor的按钮并禁用
    const QAProcessorButtons = doc.querySelectorAll('#QAProcessor button');
    QAProcessorButtons.forEach((button) => {
        button.disabled = true;
    });
    const QAEventRateSpan = doc.querySelector('#QAEventRate');

    const hostAddressInput = document.querySelector('#Host_IP');
    const hostPortInput = doc.querySelector('#Host_Port');

    const QA_HostPort = doc.querySelector('#QA_HostPort');

    const HttpServerPort = document.querySelector('#HttpServerPort');
    HttpServerPort.value = '8008';

    const QAProcessorInitButton = doc.querySelector('#QA_init');
    QAProcessorInitButton.disabled = false;
    const QAProcessorStartButton = doc.querySelector('#QA_start');
    const QAProcessorStopButton = doc.querySelector('#QA_stop');

    var ws = null
    let userName = 'Client'
    let passWord = ''
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
        QAProcessorInitButton.addEventListener('click',QAProcessorInit,false);
        QAProcessorStartButton.addEventListener('click',QAProcessorStart,false);
        QAProcessorStopButton.addEventListener('click',QAProcessorStop,false);
    }
    function QAProcessorStop(){
        wsSend('stopeventqa');
        QAProcessorStopButton.disabled = true;
    }
    function QAProcessorStart(){
        wsSend('starteventqa');
        QAProcessorStartButton.disabled = true;
        setTimeout(reloadQAFram, 2000);
    }
    function reloadQAFram(){
        var iframe = doc.querySelector('#QAFrame');
        iframe.src = 'http://'+hostAddressInput.value+':'+HttpServerPort.value;
    }
    function QAProcessorInit(e){
        connect(e);
    }
    function connect(e) {
        if (!ws){
            ws = new WebSocket('ws:'+hostAddressInput.value+':'+hostPortInput.value);
            ws.addEventListener('open', handleOpen, false);
            ws.addEventListener('close', handleClose, false);
            ws.addEventListener('error', handleError, false);
            ws.addEventListener('message', handleMessage, false);
        }
    }
    function wsSend (msg) {
        if(!ws) return;
        if (!msg.trim().length) return;
        ws.send(msg);
    }
    function handleOpen (e) {
        const command = `initeventqa ${HttpServerPort.value} ${QA_HostPort.value} ${hostAddressInput.value} `;
        wsSend(command)
        QAProcessorInitButton.style.backgroundColor = '#00FF00';
        QAProcessorInitButton.disabled = true;
        QAProcessorStartButton.disabled = false;
        QAProcessorStopButton.disabled = false;
        wsSend('register')
    }
    function handleClose (e) {
        QAProcessorButtons.forEach((button) => {
            button.disabled = true;
            button.style.backgroundColor='';
        });
        QAProcessorInitButton.disabled = false;
        delete ws;
        ws = null;
    }
    function handleError (e) {
        QAProcessorButtons.forEach((button) => {
            button.disabled = true;
            button.style.backgroundColor='';
        });
        QAProcessorInitButton.disabled = false;
        delete ws;
        ws = null;
    }
    function handleMessage (e) {
	    console.log('message', e);
        var rsp = e.data.split(" ");
        if(rsp[0]=="QAEventRate"){
            QAEventRateSpan.innerText = parseFloat(rsp[1]).toFixed(2);
        }
        else if(rsp[0] == "QAState"){
            if(parseInt(rsp[1]) == 2){
                QAProcessorStartButton.disabled = true;
                QAProcessorStartButton.style.backgroundColor = '#00FF00';
                QAProcessorStopButton.disabled = false;
                QAProcessorStopButton.style.backgroundColor = '';
            }else if(parseInt(rsp[1]) > 2){
                QAProcessorStartButton.disabled = false;
                QAProcessorStartButton.style.backgroundColor = '';
                QAProcessorStopButton.disabled = true;
                QAProcessorStopButton.style.backgroundColor = 'Red';
                setTimeout(reloadQAFram, 2000);
            }
        }
        else if(rsp[0] == "NOQA"){
            
        }
    }
    function dump(){
        wsSend('dumpQA');
    }
    setInterval(dump, 1000);
    
    init()

})(document);