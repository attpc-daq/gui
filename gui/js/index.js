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

// ((doc) => {
//     const Buttons = doc.querySelectorAll('#main button');
//     const dataRateSpan = doc.querySelector('#dataRate');
//     const eventRateSpan = doc.querySelector('#eventRate');
//     //===========================NET部分===========================
//     // 获取连接按钮
//     const connectButton = doc.querySelector('#NET .header button:nth-child(2)');
//     connectButton.disabled = false;
//     // 获取断开按钮
//     const disconnectButton = doc.querySelector('#NET .header button:nth-child(3)');
//     disconnectButton.disabled = true;
//     // 设置主机地址的默认值
//     const hostAddressInput = document.querySelector('#NET input[type="text"][placeholder="主机地址"]');
//     hostAddressInput.value = '10.155.101.208';
//     // 设置端口的默认值
//     const hostportInput = document.querySelector('#NET input[type="text"][placeholder="端口"]');
//     hostportInput.value = '8000';  
    
//     //===========================FEE部分===========================
//     // 获取电子学部分的按钮并禁用
//     const feeButtons = doc.querySelectorAll('#FEE button');
//     feeButtons.forEach((button) => {
//         button.disabled = true;
//     });
//     // 获取电子学部分的按钮
//     const feeStartButton = doc.querySelector('#FEE button:nth-child(2)');
//     const feeStopButton = doc.querySelector('#FEE button:nth-child(3)');
//     const feeSetupButton = doc.querySelector('#FEE button:nth-child(4)');
//     const feeselfhitButton = doc.querySelector('#FEE button:nth-child(5)');
//     const feeconnectsiTCP1Button = doc.querySelector('#connect_sitcp1');
//     const feeconnectsiTCP2Button = doc.querySelector('#connect_sitcp2');
//     const feesetupthresholdButton = doc.querySelector('#setupthreshold');
//     const feeslopeButton = doc.querySelector('#slope');
//     const feenchannelButton = doc.querySelector('#nchannel');
//     const feehit_modeButton = doc.querySelector('#hit_mode');

//     // 设置电子学部分的SiTCP地址和端口
//     const siTcpAddress_1_Input = doc.querySelector('#FEE input[type="text"][placeholder="SiTCP地址1"]');
//     siTcpAddress_1_Input.value = '192.168.10.16';
//     const siTcpport_1_Input = doc.querySelector('#FEE input[type="text"][placeholder="端口1"]');
//     siTcpport_1_Input.value = '4660';
//     const siTcpAddress_2_Input = doc.querySelector('#FEE input[type="text"][placeholder="SiTCP地址2"]');
//     siTcpAddress_2_Input.value = '0.0.0.0';
//     const siTcpport_2_Input = doc.querySelector('#FEE input[type="text"][placeholder="端口2"]');
//     siTcpport_2_Input.value = '8001';
//     // 设置斜率阈值的默认值
//     const slopthresholdInput = doc.querySelector('#FEE input[placeholder="hex:0x0020 斜率阈值"]');
//     slopthresholdInput.value = '0x0020';
//     // 设置符合通道的默认值
//     const nchannelInput = doc.querySelector('#FEE input[placeholder="hex:0x0004 符合通道"]');
//     nchannelInput.value = '0x0004';
//     // 设置触发模式的默认值
//     const hitmodeInput = doc.querySelector('#FEE input[placeholder="hex:0x0001 触发模式"]');
//     hitmodeInput.value = '0x0001';

//     //===========================DAQ部分===========================
//     // sitcp的按钮并禁用
//     const daqButtons = doc.querySelectorAll('#DAQ button');
//     daqButtons.forEach((button) => {
//         button.disabled = true;
//     });
//     const daqInitButton = doc.querySelector('#DAQ button:nth-child(2)');
//     const daqStartButton = doc.querySelector('#DAQ button:nth-child(3)');
//     const daqStopButton = doc.querySelector('#DAQ button:nth-child(4)');
//     // const socketBufferSizeInput = doc.querySelector('#DAQ input[type="text"][placeholder="socket缓冲区大小"]');
//     const rawDataFileSizeInput = doc.querySelector('#DAQ input[type="text"][placeholder="文件大小"]');
//     const rawDataFilePathInput = doc.querySelector('#DAQ input[type="text"][placeholder="文件存储位置"]');
//     // rawDataFilePathInput.style.width = '500px';
//     //===========================RawEventProcessor部分===========================
//     // RawEventProcessor的按钮并禁用
//     const RawEventProcessorButtons = doc.querySelectorAll('#RawEventProcessor button');
//     RawEventProcessorButtons.forEach((button) => {
//         button.disabled = true;
//     });
//     const RawEventProcessorInitButton = doc.querySelector('#RawEventProcessor button:nth-child(2)');
//     const RawEventProcessorStartButton = doc.querySelector('#RawEventProcessor button:nth-child(3)');
//     const RawEventProcessorStopButton = doc.querySelector('#RawEventProcessor button:nth-child(4)');

//     const WvaluelInput = doc.querySelector('#RawEventProcessor input[placeholder="Wvalue"]');
//     WvaluelInput.value = 30.0;
//     const VdriftlInput = doc.querySelector('#RawEventProcessor input[placeholder="Vdrift"]');
//     VdriftlInput.value = 10.0;
//     const FEE00_01Input = doc.querySelector('#FEE00_01');
//     FEE00_01Input.value = 02;
//     const FEE02_03Input = doc.querySelector('#FEE02_03');
//     FEE02_03Input.value = 00;
//     const FEE04_05Input = doc.querySelector('#FEE04_05');
//     FEE04_05Input.value = 10;
//     const FEE06_07Input = doc.querySelector('#FEE06_07');
//     FEE06_07Input.value = 08;
//     const FEE08_09Input = doc.querySelector('#FEE08_09');
//     FEE08_09Input.value = 15;
//     const FEE10_11Input = doc.querySelector('#FEE10_11');
//     FEE10_11Input.value = 15;
//     const FEE12_13Input = doc.querySelector('#FEE12_13');
//     FEE12_13Input.value = 15;
//     const FEE14_15Input = doc.querySelector('#FEE14_15');
//     FEE14_15Input.value = 15;
//     const FEE16_17Input = doc.querySelector('#FEE16_17');
//     FEE16_17Input.value = 15;
//     const FEE18_19Input = doc.querySelector('#FEE18_19');
//     FEE18_19Input.value = 15;
//     const FEE20_21Input = doc.querySelector('#FEE20_21');
//     FEE20_21Input.value = 15;
//     const FEE22_23Input = doc.querySelector('#FEE22_23');
//     FEE22_23Input.value = 15;
//     const FEE24_25Input = doc.querySelector('#FEE24_25');
//     FEE24_25Input.value = 15;
//     const FEE26_27Input = doc.querySelector('#FEE26_27');
//     FEE26_27Input.value = 15;
//     const FEE28_29Input = doc.querySelector('#FEE28_29');
//     FEE28_29Input.value = 15;
//     const FEE30_31Input = doc.querySelector('#FEE30_31');
//     FEE30_31Input.value = 15;
//     const ElectrnicGainFilePathInput = doc.querySelector('#RawEventProcessor input[type="text"][placeholder="电子学增益配置文件"]');
//     ElectrnicGainFilePathInput.value = 'ElectronicFilePath';
//     const MicromegasGasFilePathInput = doc.querySelector('#RawEventProcessor input[type="text"][placeholder="阳极板增益配置文件"]');
//     MicromegasGasFilePathInput.value = 'MicromegasFilePath';

//     const NRawEventsPerFileInput = doc.querySelector('#RawEventProcessor input[type="text"][placeholder="单文件事件数"]');
//     const RawEventFilePathInput = doc.querySelector('#RawEventProcessor input[type="text"][placeholder="文件存储位置"]');
//     // RawEventFilePathInput.style.width = '500px';
//     //===========================ParameterProcessor部分===========================
//     // ParameterProcessor的按钮并禁用
//     // const ParameterProcessorButtons = doc.querySelectorAll('#ParameterProcessor button');
//     // ParameterProcessorButtons.forEach((button) => {
//     //     button.disabled = true;
//     // });
//     // const ParameterProcessorInitButton = doc.querySelector('#ParameterProcessor button:nth-child(2)');
//     // const ParameterProcessorStartButton = doc.querySelector('#ParameterProcessor button:nth-child(3)');
//     // const ParameterProcessorStopButton = doc.querySelector('#ParameterProcessor button:nth-child(4)');
//     // const ParameterFilePathInput = doc.querySelector('#ParameterProcessor input[type="text"][placeholder="文件存储位置"]');
//     // ParameterFilePathInput.style.width = '500px';
//     //===========================EventProcessor部分===========================
//     // EventProcessor的按钮并禁用
//     // const EventProcessorButtons = doc.querySelectorAll('#EventProcessor button');
//     // EventProcessorButtons.forEach((button) => {
//     //     button.disabled = true;
//     // });
//     // const EventProcessorInitButton = doc.querySelector('#EventProcessor button:nth-child(2)');
//     // const EventProcessorStartButton = doc.querySelector('#EventProcessor button:nth-child(3)');
//     // const EventProcessorStopButton = doc.querySelector('#EventProcessor button:nth-child(4)');
//     // const EventFilePathInput = doc.querySelector('#EventProcessor input[type="text"][placeholder="文件存储位置"]');
//     // EventFilePathInput.style.width = '500px';
//     //===========================QAProcessor部分===========================
//     // QAProcessor的按钮并禁用
//     const QAProcessorButtons = doc.querySelectorAll('#QAProcessor button');
//     QAProcessorButtons.forEach((button) => {
//         button.disabled = true;
//     });
//     const QAProcessorInitButton = doc.querySelector('#QAProcessor button:nth-child(2)');
//     const QAProcessorStartButton = doc.querySelector('#QAProcessor button:nth-child(3)');
//     const QAProcessorStopButton = doc.querySelector('#QAProcessor button:nth-child(4)');

//     var ws = null
//     let userName = 'Client'
//     let passWord = ''
//     const init = () => {
//         let url = location.search
//         if (url.indexOf('?') !== -1) {
//             let str = String(url).slice(0)
//             let arr =  str.split('&')
//             userName = arr[0].split('=')[1]
//             passWord = arr[1].split('=')[1]
//             console.log('userNamepassWord', userName, passWord)
//         }
// 	    bindEvent()
//     }
//     function bindEvent() {
//         //#Net
//         connectButton.addEventListener('click', connect, false);
// 	    disconnectButton.addEventListener('click',disconnect,false);
// 	    // hostAddressInput.addEventListener('keydown', sethostAddress, false);
//         // hostportInput.addEventListener('keydown', sethostport, false);
//         //#FEE
// 	    feeStartButton.addEventListener('click',feeStart,false);
// 	    feeStopButton.addEventListener('click',feeStop,false);
// 	    feeSetupButton.addEventListener('click',feeSetup,false);
//         feeselfhitButton.addEventListener('click',feeselfhit,false);
//         feeconnectsiTCP1Button.addEventListener('click',feeconnectsiTCP1,false);
//         feeconnectsiTCP2Button.addEventListener('click',feeconnectsiTCP2,false);
// 	    feesetupthresholdButton.addEventListener('click',feesetupthreshold,false);
// 	    feeslopeButton.addEventListener('click',feeslope,false);
//         feenchannelButton.addEventListener('click',feenchannel,false);
// 	    feehit_modeButton.addEventListener('click',feehit_mode,false);
//         // siTcpAddress_1_Input.addEventListener('keydown', setsiTcpAddress_1, false);
//         // siTcpport_1_Input.addEventListener('keydown', setsiTcpport_1, false);
//         // siTcpAddress_2_Input.addEventListener('keydown', setsiTcpAddress_2, false);
//         // siTcpport_2_Input.addEventListener('keydown', setsiTcpport_2, false);
//         // slopthresholdInput.addEventListener('keydown', setslopthreshold, false);
//         // nchannelInput.addEventListener('keydown', setnchannel, false);
//         // hitmodeInput.addEventListener('keydown', sethitmode, false);
//         //#DAQ
//         daqInitButton.addEventListener('click',daqInit,false);
//         daqStartButton.addEventListener('click',daqStart,false);
//         daqStopButton.addEventListener('click',daqStop,false);
//         // socketBufferSizeInput.addEventListener('keydown', setsocketBufferSize, false);
//         rawDataFileSizeInput.addEventListener('keydown', setrawDataFileSize, false);
//         rawDataFilePathInput.addEventListener('keydown', setrawDataFilePath, false);
//         //#RawEventProcessor
//         RawEventProcessorInitButton.addEventListener('click',RawEventProcessorInit,false);
//         RawEventProcessorStartButton.addEventListener('click',RawEventProcessorStart,false);
//         RawEventProcessorStopButton.addEventListener('click',RawEventProcessorStop,false);
//         NRawEventsPerFileInput.addEventListener('keydown', setNRawEventsPerFile, false);
//         RawEventFilePathInput.addEventListener('keydown', setRawEventFilePath, false);
//         //#ParameterProcessor
//         // ParameterProcessorInitButton.addEventListener('click',ParameterProcessorInit,false);
//         // ParameterProcessorStartButton.addEventListener('click',ParameterProcessorStart,false);
//         // ParameterProcessorStopButton.addEventListener('click',ParameterProcessorStop,false);
//         // ParameterFilePathInput.addEventListener('keydown', setParameterFilePath, false);
//         //#EventProcessor
//         // EventProcessorInitButton.addEventListener('click',EventProcessorInit,false);
//         // EventProcessorStartButton.addEventListener('click',EventProcessorStart,false);
//         // EventProcessorStopButton.addEventListener('click',EventProcessorStop,false);
//         // EventFilePathInput.addEventListener('keydown', setEventFilePath, false);
//         //#QAProcessor
//         QAProcessorInitButton.addEventListener('click',QAProcessorInit,false);
//         QAProcessorStartButton.addEventListener('click',QAProcessorStart,false);
//         QAProcessorStopButton.addEventListener('click',QAProcessorStop,false);
//     }
//     function QAProcessorStop(){
//         wsSend('stopeventqa');
//         QAProcessorInitButton.style.backgroundColor = 'white';
//         QAProcessorInitButton.disabled = false;
//         QAProcessorStartButton.disabled = true;
//         QAProcessorStopButton.disabled = true;
//     }
//     function QAProcessorStart(){
//         wsSend('starteventqa');
//         QAProcessorStartButton.disabled = true;
//         QAProcessorStopButton.disabled = false;
//     }
//     function QAProcessorInit(){
//         wsSend('initeventqa');
//         QAProcessorInitButton.style.backgroundColor = '#00FF00';
//         QAProcessorInitButton.disabled = true;
//         QAProcessorStartButton.disabled = false;
//         QAProcessorStopButton.disabled = false;
//     }
//     // function setEventFilePath(){
//     //     if(e.key==='Enter'){
//     //         const path = EventFilePathInput.value;
//     //         await wsSend('setdir %s',path);
//     //     }
//     // }
//     // function EventProcessorStop(){
//     //     wsSend();
//     //     EventProcessorInitButton.style.backgroundColor = 'white';
//     //     EventProcessorInitButton.disabled = false;
//     //     EventProcessorStartButton.disabled = true;
//     //     EventProcessorStopButton.disabled = true;
//     // }
//     // function EventProcessorStart(){
//     //     wsSend();
//     //     EventProcessorStartButton.disabled = true;
//     //     EventProcessorStopButton.disabled = false;
//     // }
//     // function EventProcessorInit(){
//     //     wsSend();
//     //     EventProcessorInitButton.style.backgroundColor = '#00FF00';
//     //     EventProcessorInitButton.disabled = true;
//     //     EventProcessorStartButton.disabled = false;
//     //     EventProcessorStopButton.disabled = false;
//     // }
//     // function setParameterFilePath(){
//     //     if(e.key==='Enter'){
//     //         const path = ParameterFilePathInput.value;
//     //         await wsSend('setdir %s',path);
//     //     }
//     // }
//     // function ParameterProcessorStop(){
//     //     wsSend();
//     //     ParameterProcessorInitButton.style.backgroundColor = 'white';
//     //     ParameterProcessorInitButton.disabled = false;
//     //     ParameterProcessorStartButton.disabled = true;
//     //     ParameterProcessorStopButton.disabled = true;
//     // }
//     // function ParameterProcessorStart(){
//     //     wsSend();
//     //     ParameterProcessorStartButton.disabled = true;
//     //     ParameterProcessorStopButton.disabled = false;
//     // }
//     // function ParameterProcessorInit(){
//     //     wsSend();
//     //     ParameterProcessorInitButton.style.backgroundColor = '#00FF00';
//     //     ParameterProcessorInitButton.disabled = true;
//     //     ParameterProcessorStartButton.disabled = false;
//     //     ParameterProcessorStopButton.disabled = false;
//     // }
//     function setRawEventFilePath(){
//         if(e.key==='Enter'){
//             const path = RawEventFilePathInput.value;
//             const command = `setdir ${path}`;
//             wsSend(command);
//         }
//     }
//     function setNRawEventsPerFile(){
//         if(e.key==='Enter'){
//             const NEvents = NRawEventsPerFileInput.value;
//             const command = `setEventsPerFile ${NEvents}`;
//             wsSend(command);
//         }
//     }
//     function RawEventProcessorStop(){
//         wsSend('stopdataprocessor');
//         RawEventProcessorInitButton.style.backgroundColor = 'white';
//         RawEventProcessorInitButton.disabled = false;
//         RawEventProcessorStartButton.disabled = true;
//         RawEventProcessorStopButton.disabled = true;
//     }
//     function RawEventProcessorStart(){
//         wsSend('startdataprocessor');
//         RawEventProcessorStartButton.disabled = true;
//         RawEventProcessorStopButton.disabled = false;
//     }
//     function RawEventProcessorInit(){
//         if (RawEventFilePathInput.value !== ''){
//             const path = RawEventFilePathInput.value;
//             const command = `setdir ${path}`;
//             wsSend(command);
//         }
//         if (NRawEventsPerFileInput.value !== ''){
//             const NEvents = NRawEventsPerFileInput.value;
//             const command = `setEventsPerFile ${NEvents}`;
//             wsSend(command);
//         }
//         wsSend('initdataprocessor');
//         RawEventProcessorInitButton.style.backgroundColor = '#00FF00';
//         RawEventProcessorInitButton.disabled = true;
//         RawEventProcessorStartButton.disabled = false;
//         RawEventProcessorStopButton.disabled = false;
//         const command1 = `setWvalueAndVdrift ${WvaluelInput.value} ${VdriftlInput.value}`;
//         wsSend(command1);
//         const command2 = `setGainFile ${ElectrnicGainFilePathInput.value} ${MicromegasGasFilePathInput.value}`;
//         // console.log('command2',command2)
//         wsSend(command2);
//         const FPC2 = [
//             {"0": FEE00_01Input.value},
//             {"1": FEE00_01Input.value},
//             {"2": FEE02_03Input.value},
//             {"3": FEE02_03Input.value},
//             {"4": FEE04_05Input.value},
//             {"5": FEE04_05Input.value},
//             {"6": FEE06_07Input.value},
//             {"7": FEE06_07Input.value},
//             {"8": FEE08_09Input.value},
//             {"9": FEE08_09Input.value},
//             {"10": FEE10_11Input.value},
//             {"11": FEE10_11Input.value},
//             {"12": FEE12_13Input.value},
//             {"13": FEE12_13Input.value},
//             {"14": FEE14_15Input.value},
//             {"15": FEE14_15Input.value},
//             {"16": FEE16_17Input.value},
//             {"17": FEE16_17Input.value},
//             {"18": FEE18_19Input.value},
//             {"19": FEE18_19Input.value},
//             {"20": FEE20_21Input.value},
//             {"21": FEE20_21Input.value},
//             {"22": FEE22_23Input.value},
//             {"23": FEE22_23Input.value},
//             {"24": FEE24_25Input.value},
//             {"25": FEE24_25Input.value},
//             {"26": FEE26_27Input.value},
//             {"27": FEE26_27Input.value},
//             {"28": FEE28_29Input.value},
//             {"29": FEE28_29Input.value},
//             {"30": FEE30_31Input.value},
//             {"31": FEE30_31Input.value}
//         ];        
//         // const jsonString = JSON.stringify(FPC2);
//         const jsonString = JSON.stringify(FPC2, null, 0);
//         // console.log('jsonString',jsonString)
//         const command3 = `setFPC2 ${jsonString}`
//         // console.log('command3',command3)
//         wsSend(command3)
            
//     }
//     function setrawDataFilePath(e){
//         if(e.key==='Enter'){
//             const path = rawDataFilePathInput.value;
//             const command = `setdir ${path}`;
//             wsSend(command);
//         }
//     }
//     function setrawDataFileSize(e){
//         if(e.key==='Enter'){
//             const size = rawDataFileSizeInput.value;
//             const command = `setrawdatafilesize ${size}`;
//             wsSend(command);
//         }
//     }
//     function daqStop(){
//         wsSend('stopsitcp');
//         daqInitButton.style.backgroundColor = 'white';
//         daqInitButton.disabled = false;
//         daqStartButton.disabled = true;
//         daqStopButton.disabled = true;
//     }
//     function daqStart(){
//         wsSend('startsitcp');
//         daqStartButton.disabled = true;
//         daqStopButton.disabled = false;
//     }
//     function daqInit() {
//         if (rawDataFilePathInput.value !== ''){
//             const path = rawDataFilePathInput.value;
//             const command = `setdir ${path}`;
//             wsSend(command);
//         }
//         if (rawDataFileSizeInput.value !== ''){
//             const size = rawDataFileSizeInput.value;
//             const command = `setrawdatafilesize ${size}`;
//             wsSend(command);
//         }
//         wsSend('initsitcp');
//         daqInitButton.style.backgroundColor = '#00FF00';
//         daqInitButton.disabled = true;
//         daqStartButton.disabled = false;
//         daqStopButton.disabled = false;
//         feeconnectsiTCP1Button.disabled = false;
//         feeconnectsiTCP2Button.disabled = false;
//     }
//     // function sethitmode(e) {
//     //     if(e.key==='Enter'){
//     //         const str = hitmodeInput.value;
//     //         console.log('触发模式:', str);
//     //     }
//     // }
//     // function setnchannel(e) {
//     //     if(e.key==='Enter'){
//     //         const str = nchannelInput.value;
//     //         console.log('符合通道:', str);
//     //     }
//     // }
//     // function setslopthreshold(e) {
//     //     if(e.key==='Enter'){
//     //         const str = slopthresholdInput.value;
//     //         console.log('斜率阈值:', str);
//     //     }
//     // }
//     // function setsiTcpport_2(e) {
//     //     if(e.key==='Enter'){
//     //         const str = siTcpport_2_Input.value;
//     //         console.log('siTcpport_2:', str);
//     //     }
//     // }
//     // function setsiTcpAddress_2(e) {
//     //     if(e.key==='Enter'){
//     //         const str = siTcpAddress_2_Input.value;
//     //         console.log('siTcpAddress_2:', str);
//     //     }
//     // }
//     // function setsiTcpport_1(e) {
//     //     if(e.key==='Enter'){
//     //         const str = siTcpport_1_Input.value;
//     //         console.log('siTcpport_1:', str);
//     //     }
//     // }
//     // function setsiTcpAddress_1(e) {
//     //     if(e.key==='Enter'){
//     //         const str = siTcpAddress_1_Input.value;
//     //         console.log('siTcpAddress_1:', str);
//     //     }
//     // }
//     async function feehit_mode(e){
//         const value = hitmodeInput.value;
//         const cmd = '00102831'+'4'+value[5]+'5'+value[4]+'6'+value[3]+'7'+value[2]+'83';
//         const command = `send2device ${cmd}`;
//         wsSend(command);
//         await new Promise(r => setTimeout(r, 1000));
//         wsSend('send2device 081020384150607083');
//         await new Promise(r => setTimeout(r, 1000));
//         wsSend('send2device 021020394F5F6F7F83');
//         await new Promise(r => setTimeout(r, 1000));
//     }
//     async function feenchannel(e) {
//         const value = nchannelInput.value;
//         const cmd = '02102831'+'4'+value[5]+'5'+value[4]+'6'+value[3]+'7'+value[2]+'83';
//         const command = `send2device ${cmd}`;
//         wsSend(command);
//         await new Promise(r => setTimeout(r, 1000));
//     }
//     async function feeslope(e) {
//         const value = slopthresholdInput.value;
//         const cmd = '00112831'+'4'+value[5]+'5'+value[4]+'6'+value[3]+'7'+value[2]+'83';
//         const command = `send2device ${cmd}`;
//         wsSend(command);
//         await new Promise(r => setTimeout(r, 1000));
//     }
//     function feesetupthreshold(e) {
//         wsSend('setupthreshold');
//     }
//     function feeconnectsiTCP2(){
//         const command = `connectdevice ${siTcpAddress_2_Input.value} ${siTcpport_2_Input.value}`;
//         wsSend(command);
//         feeconnectsiTCP2Button.style.backgroundColor = '#00FF00';
//         feeStartButton.disabled = false;
//         feeStopButton.disabled = false;
//         feeSetupButton.disabled = false;
//         feeselfhitButton.disabled = false;
//         feesetupthresholdButton.disabled = false;
//         feeslopeButton.disabled = false;
//         feenchannelButton.disabled = false;
//         feehit_modeButton.disabled = false;
//     }
//     function feeconnectsiTCP1(){
//         const command = `connectdevice ${siTcpAddress_1_Input.value} ${siTcpport_1_Input.value}`;
//         wsSend(command);
//         feeconnectsiTCP1Button.style.backgroundColor = '#00FF00';
//         feeStartButton.disabled = false;
//         feeStopButton.disabled = false;
//         feeSetupButton.disabled = false;
//         feeselfhitButton.disabled = false;
//         feesetupthresholdButton.disabled = false;
//         feeslopeButton.disabled = false;
//         feenchannelButton.disabled = false;
//         feehit_modeButton.disabled = false;
//     }
//     function feeselfhit(e) {
//         wsSend('selftrigger');
//         feeStartButton.disabled = true;
//         feeStopButton.disabled = false;
//     }
//     function feeSetup(e) {
//         feesetupthreshold(e);
//         feeslope(e);
//         feenchannel(e);
//         feehit_mode(e);
//     }
//     function feeStop(e) {
//         wsSend('stopdata');
//         feeStartButton.disabled = false;
//         feeStartButton.style.backgroundColor = 'white';
//         feeStopButton.disabled = true;
//         feeStopButton.style.backgroundColor = 'yellow';
//     }
//     function feeStart(e) {
//         wsSend('startdata');
//         feeStartButton.disabled = true;
//         feeStartButton.style.backgroundColor = '#00FF00';
//         feeStopButton.disabled = false;
//         feeStopButton.style.backgroundColor = 'white';
//     }
//     // function sethostport(e) {
//     //     if(e.key==='Enter'){
//     //         const str = hostportInput.value;
//     //         console.log('hostport:', str);
//     //     }
//     // }
//     // function sethostAddress(e) {
//     //     if(e.key==='Enter'){
//     //         const str = hostAddressInput.value;
//     //         console.log('hostAddress:', str);
//     //     }
//     // }
//     function disconnect(e) {
//         if(feeStopButton.disabled===false)feeStopButton.click();
//         if(daqStopButton.disabled===false)daqStopButton.click();
//         if(RawEventProcessorStopButton.disabled===false)RawEventProcessorStopButton.click();
//         // if(ParameterProcessorStopButton.disabled===false)ParameterProcessorStopButton.click();
//         // if(EventProcessorStopButton.disabled===false)EventProcessorStopButton.click();
//         if(QAProcessorStopButton.disabled===false)QAProcessorStopButton.click();
//         wsSend('shutdown');
//     }
//     function connect(e) {
//         if (!ws){
//             ws = new WebSocket('ws:'+hostAddressInput.value+':'+hostportInput.value);
//             ws.addEventListener('open', handleOpen, false);
//             ws.addEventListener('close', handleClose, false);
//             ws.addEventListener('error', handleError, false);
//             ws.addEventListener('message', handleMessage, false);
//         }else{
//             delete ws;
//             connectButton.setAttribute('disabled',false);
// 	        // const Buttons = doc.querySelectorAll('#main button');
//             Buttons.forEach((button) => {
//                 button.disabled = true;
//             });
//             ws = new WebSocket('ws:'+hostAddressInput.value+':'+hostportInput.value);
//             ws.addEventListener('open', handleOpen, false);
//             ws.addEventListener('close', handleClose, false);
//             ws.addEventListener('error', handleError, false);
//             ws.addEventListener('message', handleMessage, false);
//         }
//     }
//     function wsSend (msg) {
//         if(connectButton.disabled===false) return;
//         if (!msg.trim().length) return;
//         ws.send(msg);
//         date = new Date();
//         data ={
//                 user: userName,
//                 msg,
//                 type:'Request',
//                 dateTime: date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
//         }
//         appendMessage(createMsg(data));
//     }
//     function handleOpen (e) {
//         date = new Date();
//         data ={
//             user: userName,
//             msg:'connection established',
//             type:'Info',
//             dateTime: date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
//         }
// 	    appendMessage(createMsg(data));
//         connectButton.disabled=true;
//         connectButton.style.backgroundColor='#00FF00';
//         disconnectButton.disabled=false;
//         daqInitButton.disabled=false;
//         RawEventProcessorInitButton.disabled=false;
//         // ParameterProcessorInitButton.disabled=false;
//         // EventProcessorInitButton.disabled=false;
//         QAProcessorInitButton.disabled=false;
//         wsSend('register')
//     }
//     function handleClose (e) {
//         date = new Date();
//         data ={
//             user: userName,
//             msg:'connection closed',
//             type: 'Info',
//             dateTime: date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
//         }
// 	    appendMessage(createMsg(data));
//         // const Buttons = doc.querySelectorAll('#main button');
//         Buttons.forEach((button) => {
//             button.disabled = true;
//             button.style.backgroundColor='white';
//         });
//         connectButton.disabled=false;
//         delete ws;
//     }
//     function handleError (e) {
//         date = new Date();
//         data ={
//             user: userName,
//             msg:'connection error',
//             type: 'Info',
//             dateTime: date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
//         }
// 	    appendMessage(createMsg(data));
//         // const Buttons = doc.querySelectorAll('#main button');
//         Buttons.forEach((button) => {
//             button.disabled = true;
//             button.style.backgroundColor='white';
//         });
//         connectButton.disabled=false;
//         delete ws
//     }
//     function handleMessage (e) {
// 	    console.log('message', e);
// 	    date = new Date();
// 	    const data ={
//                 user: 'Server',
//                 msg: e.data,
//                 type: 'Response',
//                 dateTime: date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
// 	    };
// 	    appendMessage(createMsg(data));
// 	    window.scrollTo(0, doc.body.scrollHeight);
//         var rsp = e.data.split(" ");
//         if(rsp[0]=="dataRate"){
//             dataRateSpan.innerText = parseFloat(rsp[1]).toFixed(2);
//         }
//         else if(rsp[0]=="eventRate"){
//             eventRateSpan.innerText = parseFloat(rsp[1]).toFixed(2);
//         }
//         else if(rsp[0]=="selftrigger"){
//             alert("噪声测试配置完成");
//         }
//         else if(rsp[0]=="parameterEvent"){
//             if(parseInt(rsp[1]) == 0) alert("参数文件已产生");
//         }
//     }
//     function appendMessage(msg){
//         var textArea=document.getElementById('messages');
//         textArea.value=textArea.value+"\n"+msg;
//         textArea.scroll({ top: textArea.scrollHeight, left: 0, behavior: "smooth" });
//     }
//     function createMsg(data) {
//         const {user, msg, type, dateTime} = data;
//         return user+"  --"+type+"--\n  ( "+dateTime+" )    "+msg;
//     }
//     function dump(){
//         wsSend('dump');
//     }
//     setInterval(dump, 1000);
    
//     init()


// })(document);

((doc) => {
    //===========================FEE部分===========================
    // 获取电子学部分的按钮并禁用
    const feeButtons = doc.querySelectorAll('#FEE button');
    feeButtons.forEach((button) => {
        button.disabled = true;
    });
    // 获取电子学部分的按钮
    const connectButton = doc.querySelector('#FEE_server_connect');
    connectButton.disabled = false;
    const shutdownButton = doc.querySelector('#FEE_server_shutdown');
    const disconnectButton = doc.querySelector('#FEE_server_disconnect');

    const feeStartButton = doc.querySelector('#FEE_data_start');
    const feeStopButton = doc.querySelector('#FEE_data_stop');
    const feeSetupButton = doc.querySelector('#FEE_setup');
    const feeselfhitButton = doc.querySelector('#FEE_selftrigger');

    const feeSiTCP1EnableButton = doc.querySelector('#sitcp1_enable');
    const feeSiTCP1DisableButton = doc.querySelector('#sitcp1_disable');
    const feeSiTCP2EnableButton = doc.querySelector('#sitcp2_enable');
    const feeSiTCP2DisableButton = doc.querySelector('#sitcp2_disable');

    const feesetupthresholdButton = doc.querySelector('#setupthreshold');
    const feeThresholdFilePathInput = doc.querySelector('#thresholdFilePath');
    feeThresholdFilePathInput.value = './output/thresholdes.json'
    const feeSpanThresholdProcess = doc.querySelector('#thresholdprocess');
    const feeslopeButton = doc.querySelector('#slope');
    const feenchannelButton = doc.querySelector('#nchannel');
    const feehit_modeButton = doc.querySelector('#hit_mode');

    // 设置主机地址的默认值
    const hostAddressInput = doc.querySelector('#FEE_Net_IP');
    hostAddressInput.value = '10.155.101.208';
    // 设置端口的默认值
    const hostPortInput = doc.querySelector('#FEE_Net_Port');
    hostPortInput.value = '8000';
    // 设置电子学部分的SiTCP地址和端口

    const siTcpAddress_1_Input = doc.querySelector('#FEE input[type="text"][placeholder="SiTCP地址1"]');
    siTcpAddress_1_Input.value = '192.168.10.16';
    const siTcpport_1_Input = doc.querySelector('#FEE input[type="text"][placeholder="端口1"]');
    siTcpport_1_Input.value = '4660';
    const siTcpAddress_2_Input = doc.querySelector('#FEE input[type="text"][placeholder="SiTCP地址2"]');
    siTcpAddress_2_Input.value = '0.0.0.0';
    const siTcpport_2_Input = doc.querySelector('#FEE input[type="text"][placeholder="端口2"]');
    siTcpport_2_Input.value = '8001';
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
        //#Net
        connectButton.addEventListener('click', connect, false);
        shutdownButton.addEventListener('click', shutdown,false);
	    disconnectButton.addEventListener('click', disconnect,false);
        //#FEE
	    feeStartButton.addEventListener('click',feeStart,false);
	    feeStopButton.addEventListener('click',feeStop,false);

	    feeSetupButton.addEventListener('click',feeSetup,false);
        feeselfhitButton.addEventListener('click',feeselfhit,false);
        feeSiTCP1EnableButton.addEventListener('click',feeSiTCP1Enable,false);
        feeSiTCP1DisableButton.addEventListener('click',feeSiTCP1Disable,false);
        feeSiTCP2EnableButton.addEventListener('click',feeSiTCP2Enable,false);
        feeSiTCP2DisableButton.addEventListener('click',feeSiTCP2Disable,false);
	    feesetupthresholdButton.addEventListener('click',feesetupthreshold,false);
        
	    feeslopeButton.addEventListener('click',feeslope,false);
        feenchannelButton.addEventListener('click',feenchannel,false);
	    feehit_modeButton.addEventListener('click',feehit_mode,false);
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
        feenchannelButton.style.backgroundColor = 'white';
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
        //TODO: 多个FEE
    }
    function feesetupthreshold(e) {
        const value = feeThresholdFilePathInput.value;
        wsSend('setupthreshold '+ `${value}`);
        feesetupthresholdButton.disabled = true;
        feesetupthresholdButton.style.backgroundColor = 'white';
        //TODO: 多个FEE
    }
    function feeSiTCP1Enable(){
        const command = `setupdeviceaddress ${siTcpAddress_1_Input.value} ${siTcpport_1_Input.value}`;
        wsSend(command);
        // feeconnectsiTCP2Button.style.backgroundColor = '#00FF00';
        feeSiTCP1EnableButton.disabled = true;
        feeSiTCP1DisableButton.disabled = false;

        feeStartButton.disabled = false;
        feeStopButton.disabled = false;
        feeSetupButton.disabled = false;
        feeselfhitButton.disabled = false;
        feesetupthresholdButton.disabled = false;
        feeslopeButton.disabled = false;
        feenchannelButton.disabled = false;
        feehit_modeButton.disabled = false;
    }
    function feeSiTCP1Disable(){
        feeSiTCP1EnableButton.disabled = false;
        feeSiTCP1DisableButton.disabled = true;

        if(feeSiTCP2EnableButton.disabled == false){
            feeStartButton.disabled = true;
            feeStopButton.disabled = true;
            feeSetupButton.disabled = true;
            feeselfhitButton.disabled = true;
            feesetupthresholdButton.disabled = true;
            feeslopeButton.disabled = true;
            feenchannelButton.disabled = true;
            feehit_modeButton.disabled = true;
        }
    }
    function feeSiTCP2Enable(){
        const command = `setupdeviceaddress ${siTcpAddress_2_Input.value} ${siTcpport_2_Input.value}`;
        wsSend(command);
        feeSiTCP2EnableButton.disabled = true;
        feeSiTCP2DisableButton.disabled = false;

        feeStartButton.disabled = false;
        feeStopButton.disabled = false;
        feeSetupButton.disabled = false;
        feeselfhitButton.disabled = false;
        feesetupthresholdButton.disabled = false;
        feeslopeButton.disabled = false;
        feenchannelButton.disabled = false;
        feehit_modeButton.disabled = false;
    }
    function feeSiTCP2Disable(){
        feeSiTCP2EnableButton.disabled = false;
        feeSiTCP2DisableButton.disabled = true;

        if(feeSiTCP1EnableButton.disabled == false){
            feeStartButton.disabled = true;
            feeStopButton.disabled = true;
            feeSetupButton.disabled = true;
            feeselfhitButton.disabled = true;
            feesetupthresholdButton.disabled = true;
            feeslopeButton.disabled = true;
            feenchannelButton.disabled = true;
            feehit_modeButton.disabled = true;
        }
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
        feeStartButton.disabled = false;
        feeStartButton.style.backgroundColor = 'white';
        feeStopButton.disabled = true;
        feeStopButton.style.backgroundColor = 'yellow';
    }
    function feeStart(e) {
        wsSend('startdata');
        feeStartButton.disabled = true;
        feeStartButton.style.backgroundColor = '#00FF00';
        feeStopButton.disabled = false;
        feeStopButton.style.backgroundColor = 'white';
    }

    function shutdown(e) {
        wsSend('shutdown');
    }
    function disconnect(e) {
        ws.close();
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
        if(connectButton.disabled===false) return;
        if (!msg.trim().length) return;
        ws.send(msg);
        date = new Date();
        data ={
                user: userName,
                msg,
                type:'Request',
                dateTime: date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
        }
        appendMessage(createMsg(data));
    }
    function handleOpen (e) {
        date = new Date();
        data ={
            user: userName,
            msg:'connection established',
            type:'Info',
            dateTime: date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
        }
	    appendMessage(createMsg(data));
        connectButton.disabled=true;
        connectButton.style.backgroundColor='#00FF00';
        disconnectButton.disabled=false;
        shutdownButton.disabled = false;
        feeSiTCP1EnableButton.disabled = false;
        feeSiTCP2EnableButton.disabled = false;
        // wsSend('register')
    }
    function handleClose (e) {
        date = new Date();
        data ={
            user: userName,
            msg:'connection closed',
            type: 'Info',
            dateTime: date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
        }
	    appendMessage(createMsg(data));
        feeButtons.forEach((button) => {
            button.disabled = true;
            button.style.backgroundColor='white';
        });
        connectButton.disabled=false;
        connectButton.style.backgroundColor='';
        delete ws;
        ws = null;
    }
    function handleError (e) {
        date = new Date();
        data ={
            user: userName,
            msg:'connection error',
            type: 'Info',
            dateTime: date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
        }
	    appendMessage(createMsg(data));
        feeButtons.forEach((button) => {
            button.disabled = true;
            button.style.backgroundColor='white';
        });
        connectButton.disabled=false;
        connectButton.style.backgroundColor='';
        delete ws;
        ws = null;
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
    }
    init()
})(document);


((doc) => {
    //===========================DAQ1部分===========================
    //sitcp的按钮并禁用
    const Buttons = doc.querySelectorAll('#DAQ1 button');
    Buttons.forEach((button) => {
        button.disabled = true;
    });
    // 获取连接按钮
    const connectButton = doc.querySelector('#DAQ1_server_connect');
    connectButton.disabled = false;
    // 获取关闭按钮
    const shutdownButton = doc.querySelector('#DAQ1_server_shutdown');
    // 获取断开按钮
    const disconnectButton = doc.querySelector('#DAQ1_server_disconnect');
    // 设置主机地址的默认值
    const hostAddressInput = document.querySelector('#DAQ1 > div.content > div:nth-child(1) > input[type=text]:nth-child(2)');
    hostAddressInput.value = '10.155.101.208';
    // 设置端口的默认值
    const hostportInput = document.querySelector('#DAQ1 > div.content > div:nth-child(1) > input[type=text]:nth-child(3)');
    hostportInput.value = '8000';

    const daqInitButton = doc.querySelector('#DAQ1_init');
    const daqStartButton = doc.querySelector('#DAQ1_start');
    const daqStopButton = doc.querySelector('#DAQ1_stop');
    const decoderStartButton = doc.querySelector('#DAQ1_start_decoder');
    const decoderStopButton = doc.querySelector('#DAQ1_stop_decoder');
    const nTaskSpan = doc.querySelector('#DAQ1_nTask');
    const dataRateSpan = doc.querySelector('#DAQ1_dataRate');
    // const socketBufferSizeInput = doc.querySelector('#DAQ1 input[type="text"][placeholder="socket缓冲区大小"]');
    const bufferFileSizeInput = doc.querySelector('#DAQ1 input[type="text"][placeholder="文件大小"]');
    bufferFileSizeInput.value = '100000000';
    const buffersizeButton = doc.querySelector('#DAQ1_buffersize');
    const bufferFilePathInput = doc.querySelector('#DAQ1 input[type="text"][placeholder="文件存储位置"]');
    bufferFilePathInput.value = './output/buffers1' ;
    // rawDataFilePathInput.style.width = '500px';

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
        connectButton.addEventListener('click', connect, false);
        shutdownButton.addEventListener('click', shutdown,false);
	    disconnectButton.addEventListener('click',disconnect,false);
        //#DAQ
        daqInitButton.addEventListener('click',daqInit,false);
        daqStartButton.addEventListener('click',daqStart,false);
        daqStopButton.addEventListener('click',daqStop,false);
        decoderStartButton.addEventListener('click',decoderStart,false);
        decoderStopButton.addEventListener('click',decoderStop,false);
        buffersizeButton.addEventListener('click',setBufferSize,false);
        // socketBufferSizeInput.addEventListener('keydown', setsocketBufferSize, false);
        // rawDataFileSizeInput.addEventListener('keydown', setrawDataFileSize, false);
        // rawDataFilePathInput.addEventListener('keydown', setrawDataFilePath, false);
    }
    function setBufferSize(){
        buffersizeButton.disabled = true;
        buffersizeButton.style.backgroundColor='';
        const size = bufferFileSizeInput.value;
        wsSend('setBufferFileSize '+`${size}`)
    }
    function decoderStart(){
        wsSend('startDecoder');
        decoderStartButton.disabled = true;
        decoderStopButton.disabled = false;
    }
    function decoderStop(){
        wsSend('stopDecoder');
        decoderStartButton.disabled = false;
        decoderStopButton.disabled = true;
    }
    function daqStop(){
        wsSend('stopsitcp');
        daqInitButton.style.backgroundColor = '';
        daqInitButton.disabled = false;
        daqStartButton.disabled = true;
        daqStopButton.disabled = true;
        decoderStartButton.disabled = true;
        decoderStopButton.disabled = true;
    }
    function daqStart(){
        wsSend('startsitcp');
        daqStartButton.disabled = true;
        daqStopButton.disabled = false;
        decoderStartButton.disabled = false;
    }
    function daqInit() {
        // if (rawDataFilePathInput.value !== ''){
        //     const path = rawDataFilePathInput.value;
        //     const command = `setdir ${path}`;
        //     wsSend(command);
        // }
        // if (rawDataFileSizeInput.value !== ''){
        //     const size = rawDataFileSizeInput.value;
        //     const command = `setrawdatafilesize ${size}`;
        //     wsSend(command);
        // }
        const size = bufferFileSizeInput.value;
        const path = bufferFilePathInput.value;
        wsSend('initsitcp '+ `${size}`+' '+`${path}`);
        daqInitButton.style.backgroundColor = '#00FF00';
        daqInitButton.disabled = true;
        daqStartButton.disabled = false;
        daqStopButton.disabled = false;
        buffersizeButton.disabled = false;
    }

    function shutdown(e) {
        wsSend('shutdown');
    }
    function disconnect(e) {
        ws.close();
    }
    function connect(e) {
        if (!ws){
            ws = new WebSocket('ws:'+hostAddressInput.value+':'+hostportInput.value);
            ws.addEventListener('open', handleOpen, false);
            ws.addEventListener('close', handleClose, false);
            ws.addEventListener('error', handleError, false);
            ws.addEventListener('message', handleMessage, false);
        }
    }
    function wsSend (msg) {
        if(connectButton.disabled===false) return;
        if (!msg.trim().length) return;
        ws.send(msg);
        date = new Date();
        data ={
                user: userName,
                msg,
                type:'Request',
                dateTime: date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
        }
        appendMessage(createMsg(data));
    }
    function handleOpen (e) {
        date = new Date();
        data ={
            user: userName,
            msg:'connection established',
            type:'Info',
            dateTime: date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
        }
	    appendMessage(createMsg(data));
        connectButton.disabled=true;
        connectButton.style.backgroundColor='#00FF00';
        disconnectButton.disabled=false;
        daqInitButton.disabled=false;
        shutdownButton.disabled = false;
        wsSend('register')
    }
    function handleClose (e) {
        date = new Date();
        data ={
            user: userName,
            msg:'connection closed',
            type: 'Info',
            dateTime: date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
        }
	    appendMessage(createMsg(data));
        Buttons.forEach((button) => {
            button.disabled = true;
            button.style.backgroundColor='';
        });
        connectButton.disabled=false;
        connectButton.style.backgroundColor='';
        shutdownButton.disabled = true;
        delete ws;
        ws = null;
    }
    function handleError (e) {
        date = new Date();
        data ={
            user: userName,
            msg:'connection error',
            type: 'Info',
            dateTime: date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
        }
	    appendMessage(createMsg(data));
        Buttons.forEach((button) => {
            button.disabled = true;
            button.style.backgroundColor='white';
        });
        connectButton.disabled=false;
        connectButton.style.backgroundColor='';
        shutdownButton.disabled = true;
        delete ws;
        ws = null;
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
        if(rsp[0]=="dataRate"){
            dataRateSpan.innerText = parseFloat(rsp[1]).toFixed(2);
        }
        else if(rsp[0]=="nTask"){
            nTaskSpan.innerText = parseInt(rsp[1]);
        }
        else if(rsp[0]=="setBufferFileSize"){
            buffersizeButton.disabled = false;
            buffersizeButton.style.backgroundColor='#00FF00';
        }
    }

    function dump(){
        wsSend('dumpDAQ');
    }
    setInterval(dump, 1000);
    init()
})(document);

((doc) => {
    //===========================DAQ2部分===========================
    //sitcp的按钮并禁用
    const Buttons = doc.querySelectorAll('#DAQ2 button');
    Buttons.forEach((button) => {
        button.disabled = true;
    });
    // // 获取连接按钮
    // const connectButton = doc.querySelector('#DAQ2_server_connect');
    // connectButton.disabled = false;
    // // 获取关闭按钮
    // const shutdownButton = doc.querySelector('#DAQ2_server_shutdown');
    // // 获取断开按钮
    // const disconnectButton = doc.querySelector('#DAQ2_server_disconnect');
    // // 设置主机地址的默认值
    // const hostAddressInput = document.querySelector('#DAQ2 > div.content > div:nth-child(1) > input[type=text]:nth-child(2)');
    // hostAddressInput.value = '10.155.101.208';
    // // 设置端口的默认值
    // const hostportInput = document.querySelector('#DAQ2 > div.content > div:nth-child(1) > input[type=text]:nth-child(3)');
    // hostportInput.value = '8000';

    // const daqInitButton = doc.querySelector('#DAQ2_init');
    // const daqStartButton = doc.querySelector('#DAQ2_start');
    // const daqStopButton = doc.querySelector('#DAQ2_stop');
    // const decoderStartButton = doc.querySelector('#DAQ2_start_decoder');
    // const decoderStopButton = doc.querySelector('#DAQ2_stop_decoder');
    // const nTaskSpan = doc.querySelector('#DAQ2_nTask');
    // const dataRateSpan = doc.querySelector('#DAQ2_dataRate');
    // // const socketBufferSizeInput = doc.querySelector('#DAQ2 input[type="text"][placeholder="socket缓冲区大小"]');
    // const bufferFileSizeInput = doc.querySelector('#DAQ2 input[type="text"][placeholder="文件大小"]');
    // bufferFileSizeInput.value = '100000000';
    // const bufferFilePathInput = doc.querySelector('#DAQ2 input[type="text"][placeholder="文件存储位置"]');
    // bufferFilePathInput.value = './output/buffers2' ;
    // // rawDataFilePathInput.style.width = '500px';

    // var ws = null
    // let userName = 'Client'
    // let passWord = ''
    // const init = () => {
    //     let url = location.search
    //     if (url.indexOf('?') !== -1) {
    //         let str = String(url).slice(0)
    //         let arr =  str.split('&')
    //         userName = arr[0].split('=')[1]
    //         passWord = arr[1].split('=')[1]
    //         console.log('userNamepassWord', userName, passWord)
    //     }
	//     bindEvent()
    // }
    // function bindEvent() {
    //     //#Net
    //     // connectButton.addEventListener('click', connect, false);
    //     // shutdownButton.addEventListener('click', shutdown,false);
	//     // disconnectButton.addEventListener('click',disconnect,false);
    //     // //#DAQ
    //     // daqInitButton.addEventListener('click',daqInit,false);
    //     // daqStartButton.addEventListener('click',daqStart,false);
    //     // daqStopButton.addEventListener('click',daqStop,false);
    //     // decoderStartButton.addEventListener('click',decoderStart,false);
    //     // decoderStopButton.addEventListener('click',decoderStop,false);
    // }
    // function decoderStart(){
    //     wsSend('startDecoder');
    //     decoderStartButton.disabled = true;
    //     decoderStopButton.disabled = false;
    // }
    // function decoderStop(){
    //     wsSend('stopDecoder');
    //     decoderStartButton.disabled = false;
    //     decoderStopButton.disabled = true;
    // }
    // function daqStop(){
    //     wsSend('stopsitcp');
    //     daqInitButton.style.backgroundColor = '';
    //     daqInitButton.disabled = false;
    //     daqStartButton.disabled = true;
    //     daqStopButton.disabled = true;
    //     decoderStartButton.disabled = true;
    //     decoderStopButton.disabled = true;
    // }
    // function daqStart(){
    //     wsSend('startsitcp');
    //     daqStartButton.disabled = true;
    //     daqStopButton.disabled = false;
    //     decoderStartButton.disabled = false;
    // }
    // function daqInit() {
    //     const size = bufferFileSizeInput.value;
    //     const path = bufferFilePathInput.value;
    //     wsSend('initsitcp '+ `${size}`+' '+`${path}`);
    //     daqInitButton.style.backgroundColor = '#00FF00';
    //     daqInitButton.disabled = true;
    //     daqStartButton.disabled = false;
    //     daqStopButton.disabled = false;
    // }

    // function shutdown(e) {
    //     wsSend('shutdown');
    // }
    // function disconnect(e) {
    //     ws.close();
    // }
    // function connect(e) {
    //     if (!ws){
    //         ws = new WebSocket('ws:'+hostAddressInput.value+':'+hostportInput.value);
    //         ws.addEventListener('open', handleOpen, false);
    //         ws.addEventListener('close', handleClose, false);
    //         ws.addEventListener('error', handleError, false);
    //         ws.addEventListener('message', handleMessage, false);
    //     }
    // }
    // function wsSend (msg) {
    //     if(connectButton.disabled===false) return;
    //     if (!msg.trim().length) return;
    //     ws.send(msg);
    //     date = new Date();
    //     data ={
    //             user: userName,
    //             msg,
    //             type:'Request',
    //             dateTime: date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
    //     }
    //     appendMessage(createMsg(data));
    // }
    // function handleOpen (e) {
    //     date = new Date();
    //     data ={
    //         user: userName,
    //         msg:'connection established',
    //         type:'Info',
    //         dateTime: date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
    //     }
	//     appendMessage(createMsg(data));
    //     connectButton.disabled=true;
    //     connectButton.style.backgroundColor='#00FF00';
    //     disconnectButton.disabled=false;
    //     daqInitButton.disabled=false;
    //     shutdownButton.disabled = false;
    //     wsSend('register')
    // }
    // function handleClose (e) {
    //     date = new Date();
    //     data ={
    //         user: userName,
    //         msg:'connection closed',
    //         type: 'Info',
    //         dateTime: date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
    //     }
	//     appendMessage(createMsg(data));
    //     Buttons.forEach((button) => {
    //         button.disabled = true;
    //         button.style.backgroundColor='';
    //     });
    //     connectButton.disabled=false;
    //     connectButton.style.backgroundColor='';
    //     shutdownButton.disabled = true;
    //     delete ws;
    //     ws = null;
    // }
    // function handleError (e) {
    //     date = new Date();
    //     data ={
    //         user: userName,
    //         msg:'connection error',
    //         type: 'Info',
    //         dateTime: date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
    //     }
	//     appendMessage(createMsg(data));
    //     Buttons.forEach((button) => {
    //         button.disabled = true;
    //         button.style.backgroundColor='white';
    //     });
    //     connectButton.disabled=false;
    //     connectButton.style.backgroundColor='';
    //     shutdownButton.disabled = true;
    //     delete ws;
    //     ws = null;
    // }
    // function handleMessage (e) {
	//     console.log('message', e);
	//     date = new Date();
	//     const data ={
    //             user: 'Server',
    //             msg: e.data,
    //             type: 'Response',
    //             dateTime: date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
	//     };
	//     appendMessage(createMsg(data));
    //     var rsp = e.data.split(" ");
    //     if(rsp[0]=="dataRate"){
    //         dataRateSpan.innerText = parseFloat(rsp[1]).toFixed(2);
    //     }
    //     else if(rsp[0]=="nTask"){
    //         nTaskSpan.innerText = parseInt(rsp[1]);
    //     }
    // }

    // function dump(){
    //     wsSend('dumpDAQ');
    // }
    // setInterval(dump, 1000);
    // init()
})(document);


((doc) => {
    //===========================RawEventProcessor部分===========================
    // RawEventProcessor的按钮并禁用
    const RawEventProcessorButtons = doc.querySelectorAll('#RawEventProcessor button');
    RawEventProcessorButtons.forEach((button) => {
        button.disabled = true;
    });
    // event rate 显示
    const eventRateSpan = doc.querySelector('#eventRate');
    // 获取连接按钮
    const connectButton = doc.querySelector('#DP_server_connect');
    connectButton.disabled = false;
    // 获取关闭按钮
    const shutdownButton = doc.querySelector('#DP_server_shutdown');
    // 获取断开按钮
    const disconnectButton = doc.querySelector('#DP_server_disconnect');
    // 设置主机地址的默认值
    const hostAddressInput = document.querySelector('#DP_Net_IP');
    hostAddressInput.value = '10.155.101.208';
    // 设置端口的默认值
    const hostportInput = document.querySelector('#DP_Net_Port');
    hostportInput.value = '8000';

    const RawEventProcessorInitButton = doc.querySelector('#DP_init');
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
        connectButton.addEventListener('click', connect, false);
        shutdownButton.addEventListener('click',shutdown,false);
	    disconnectButton.addEventListener('click',disconnect,false);

	    // hostAddressInput.addEventListener('keydown', sethostAddress, false);
        // hostportInput.addEventListener('keydown', sethostport, false);
        //#RawEventProcessor
        RawEventProcessorInitButton.addEventListener('click',RawEventProcessorInit,false);
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
        RawEventProcessorInitButton.style.backgroundColor = 'white';
        RawEventProcessorInitButton.disabled = false;
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
        wsSend('initdataprocessor');
        RawEventProcessorInitButton.style.backgroundColor = '#00FF00';
        RawEventProcessorInitButton.disabled = true;
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
    function shutdown(e) {
        if(RawEventProcessorStopButton.disabled===false)RawEventProcessorStopButton.click();
        wsSend('shutdown');

    }
    function disconnect(e){
        // ws.disconnect()
    }
    function connect(e) {
        if (!ws){
            ws = new WebSocket('ws:'+hostAddressInput.value+':'+hostportInput.value);
            ws.addEventListener('open', handleOpen, false);
            ws.addEventListener('close', handleClose, false);
            ws.addEventListener('error', handleError, false);
            ws.addEventListener('message', handleMessage, false);
        }
    }
    function wsSend (msg) {
        if(connectButton.disabled===false) return;
        if (!msg.trim().length) return;
        ws.send(msg);
        date = new Date();
        data ={
                user: userName,
                msg,
                type:'Request',
                dateTime: date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
        }
        appendMessage(createMsg(data));
    }
    function handleOpen (e) {
        date = new Date();
        data ={
            user: userName,
            msg:'connection established',
            type:'Info',
            dateTime: date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
        }
	    appendMessage(createMsg(data));
        connectButton.disabled=true;
        connectButton.style.backgroundColor='#00FF00';
        disconnectButton.disabled=false;
        RawEventProcessorInitButton.disabled=false;
        shutdownButton.disabled = false;
        wsSend('register')
    }
    function handleClose (e) {
        date = new Date();
        data ={
            user: userName,
            msg:'connection closed',
            type: 'Info',
            dateTime: date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
        }
	    appendMessage(createMsg(data));
        RawEventProcessorButtons.forEach((button) => {
            button.disabled = true;
            button.style.backgroundColor='white';
        });
        connectButton.disabled=false;
        connectButton.style.backgroundColor='';
        shutdownButton.disabled = true;
        delete ws;
        ws = null;
    }
    function handleError (e) {
        date = new Date();
        data ={
            user: userName,
            msg:'connection error',
            type: 'Info',
            dateTime: date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
        }
	    appendMessage(createMsg(data));
        RawEventProcessorButtons.forEach((button) => {
            button.disabled = true;
            button.style.backgroundColor='white';
        });
        connectButton.disabled=false;
        connectButton.style.backgroundColor='';
        delete ws;
        ws = null;
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
    }
    function appendMessage(msg){
        var textArea=document.getElementById('messages');
        textArea.value=textArea.value+"\n"+msg;
        textArea.scroll({ top: textArea.scrollHeight, left: 0, behavior: "smooth" });
    }
    function createMsg(data) {
        const {user, msg, type, dateTime} = data;
        return user+"  --"+type+"--\n  ( "+dateTime+" )    "+msg;
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
    // data rate 显示
    const QAEventRateSpan = doc.querySelector('#QAEventRate');
    // 获取连接按钮
    const connectButton = doc.querySelector('#QA_server_connect');
    connectButton.disabled = false;
    // 获取关闭按钮
    const shutdownButton = doc.querySelector('#QA_server_shutdown');
    // 获取断开按钮
    const disconnectButton = doc.querySelector('#QA_server_disconnect');
    // 设置主机地址的默认值
    const hostAddressInput = document.querySelector('#QAProcessor > div.content > div > input[type=text]:nth-child(2)');
    hostAddressInput.value = '10.155.101.208';
    // 设置端口的默认值
    const hostportInput = document.querySelector('#QAProcessor > div.content > div > input[type=text]:nth-child(3)');
    hostportInput.value = '8006';

    const QAProcessorInitButton = doc.querySelector('#QA_init');
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
        //#Net
        connectButton.addEventListener('click', connect, false);
        shutdownButton.addEventListener('click',shutdown,false);
	    disconnectButton.addEventListener('click',disconnect,false);
	    // hostAddressInput.addEventListener('keydown', sethostAddress, false);
        // hostportInput.addEventListener('keydown', sethostport, false);
        //#QAProcessor
        QAProcessorInitButton.addEventListener('click',QAProcessorInit,false);
        QAProcessorStartButton.addEventListener('click',QAProcessorStart,false);
        QAProcessorStopButton.addEventListener('click',QAProcessorStop,false);
    }
    function QAProcessorStop(){
        wsSend('stopeventqa');
        QAProcessorInitButton.style.backgroundColor = 'white';
        QAProcessorInitButton.disabled = false;
        QAProcessorStartButton.disabled = true;
        QAProcessorStopButton.disabled = true;
    }
    function QAProcessorStart(){
        wsSend('starteventqa');
        QAProcessorStartButton.disabled = true;
        QAProcessorStopButton.disabled = false;
        setTimeout(reloadQAFram, 2000);
    }
    function reloadQAFram(){
        var iframe = doc.querySelector('#QAFrame');
        iframe.src = iframe.src;
    }
    function QAProcessorInit(){
        wsSend('initeventqa');
        QAProcessorInitButton.style.backgroundColor = '#00FF00';
        QAProcessorInitButton.disabled = true;
        QAProcessorStartButton.disabled = false;
        QAProcessorStopButton.disabled = false;
    }
    function shutdown(e) {
        if(QAProcessorStopButton.disabled===false)QAProcessorStopButton.click();
        wsSend('shutdown');
    }
    function disconnect(e) {
    }
    function connect(e) {
        if (!ws){
            ws = new WebSocket('ws:'+hostAddressInput.value+':'+hostportInput.value);
            ws.addEventListener('open', handleOpen, false);
            ws.addEventListener('close', handleClose, false);
            ws.addEventListener('error', handleError, false);
            ws.addEventListener('message', handleMessage, false);
        }
    }
    function wsSend (msg) {
        if(connectButton.disabled===false) return;
        if (!msg.trim().length) return;
        ws.send(msg);
        date = new Date();
        data ={
                user: userName,
                msg,
                type:'Request',
                dateTime: date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
        }
        appendMessage(createMsg(data));
    }
    function handleOpen (e) {
        date = new Date();
        data ={
            user: userName,
            msg:'connection established',
            type:'Info',
            dateTime: date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
        }
	    appendMessage(createMsg(data));
        connectButton.disabled=true;
        connectButton.style.backgroundColor='#00FF00';
        disconnectButton.disabled=false;
        QAProcessorInitButton.disabled=false;
        shutdownButton.disabled = false;
        wsSend('register')
    }
    function handleClose (e) {
        date = new Date();
        data ={
            user: userName,
            msg:'connection closed',
            type: 'Info',
            dateTime: date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
        }
	    appendMessage(createMsg(data));

        QAProcessorButtons.forEach((button) => {
            button.disabled = true;
            button.style.backgroundColor='white';
        });
        connectButton.disabled=false;
        connectButton.style.backgroundColor='';
        shutdownButton.disabled = true;
        delete ws;
        ws = null;
    }
    function handleError (e) {
        date = new Date();
        data ={
            user: userName,
            msg:'connection error',
            type: 'Info',
            dateTime: date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
        }
	    appendMessage(createMsg(data));

        QAProcessorButtons.forEach((button) => {
            button.disabled = true;
            button.style.backgroundColor='white';
        });
        connectButton.disabled=false;
        connectButton.style.backgroundColor='';
        delete ws;
        ws = null;
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
        if(rsp[0]=="QAEventRate"){
            QAEventRateSpan.innerText = parseFloat(rsp[1]).toFixed(2);
        }
    }
    function appendMessage(msg){
        var textArea=document.getElementById('messages');
        textArea.value=textArea.value+"\n"+msg;
        textArea.scroll({ top: textArea.scrollHeight, left: 0, behavior: "smooth" });
    }
    function createMsg(data) {
        const {user, msg, type, dateTime} = data;
        return user+"  --"+type+"--\n  ( "+dateTime+" )    "+msg;
    }
    function dump(){
        wsSend('dumpQA');
    }
    setInterval(dump, 1000);
    
    init()


})(document);