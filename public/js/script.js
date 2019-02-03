'use strict';

const socket = io();

//const outputYou = document.querySelector('.output-you');
//const outputBot = document.querySelector('.output-bot');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

function inputText() {
  let search =  document.getElementById("inputText").value;
  document.getElementById("inputText").value = ""
  //outputYou.innerHTML = search;
  let panel_body = document.getElementById('panel-body')
  let incoming_msg = document.createElement('div')
  incoming_msg.classList.add('incoming_msg')
  let received_msg = document.createElement('div')
  received_msg.classList.add('received_msg')
  let received_withd_msg = document.createElement('div')
  received_withd_msg.classList.add('received_withd_msg')
  let paragraph = document.createElement('p')
  paragraph.innerHTML = 'you : ' + search
  received_withd_msg.appendChild(paragraph)
  received_msg.appendChild(received_withd_msg)
  incoming_msg.appendChild(received_msg)
  panel_body.appendChild(incoming_msg)

  socket.emit('chat message', search);
  console.log(search);
 }

 function inputTextByEnterKey(e) {
   if (e.keyCode === 13)
   {
    let search =  document.getElementById("inputText").value;
    document.getElementById("inputText").value = ""
    let panel_body = document.getElementById('panel-body')
  let incoming_msg = document.createElement('div')
  incoming_msg.classList.add('incoming_msg')
  let received_msg = document.createElement('div')
  received_msg.classList.add('received_msg')
  let received_withd_msg = document.createElement('div')
  received_withd_msg.classList.add('received_withd_msg')
  let paragraph = document.createElement('p')
  paragraph.innerHTML = 'you : ' + search
  received_withd_msg.appendChild(paragraph)
  received_msg.appendChild(received_withd_msg)
  incoming_msg.appendChild(received_msg)
  panel_body.appendChild(incoming_msg)
    socket.emit('chat message', search);
    console.log(search);
   }
   else
   {
     //console.log("not enter key pressed")
   }
 }
 

// document.querySelector('button').addEventListener('click', () => {
//   recognition.start();
// });

document.querySelector('#microphone').addEventListener('click', () => {
  recognition.start();
});

recognition.addEventListener('speechstart', () => {
  console.log('Speech has been detected.');
});

recognition.addEventListener('result', (e) => {
  console.log('Result has been detected.');

  let last = e.results.length - 1;
  let text = e.results[last][0].transcript;
  console.log(text);
  let panel_body = document.getElementById('panel-body')
  let incoming_msg = document.createElement('div')
  incoming_msg.classList.add('incoming_msg')
  let received_msg = document.createElement('div')
  received_msg.classList.add('received_msg')
  let received_withd_msg = document.createElement('div')
  received_withd_msg.classList.add('received_withd_msg')
  let paragraph = document.createElement('p')
  paragraph.innerHTML = 'you : ' + text
  received_withd_msg.appendChild(paragraph)
  received_msg.appendChild(received_withd_msg)
  incoming_msg.appendChild(received_msg)
  panel_body.appendChild(incoming_msg)

  console.log('Confidence: ' + e.results[0][0].confidence);

  socket.emit('chat message', text);
});

recognition.addEventListener('speechend', () => {
  recognition.stop();
});

recognition.addEventListener('error', (e) => {

 let panel_body = document.getElementById('panel-body')
 let outgoing_msg = document.createElement('div')
 outgoing_msg.classList.add('outgoing_msg')
 let sent_msg = document.createElement('div')
 sent_msg.classList.add('sent_msg')
 let paragraph = document.createElement('p')
 paragraph.innerHTML = 'bot : ' + 'Error: ' + e.error
 sent_msg.appendChild(paragraph)
 outgoing_msg.appendChild(sent_msg)
 panel_body.appendChild(outgoing_msg)


});

function synthVoice(text) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance();
  utterance.text = text;
  synth.speak(utterance);
}

socket.on('bot reply', function(replyText) {
  synthVoice(replyText);

  if(replyText == '') replyText = 'No answer...';
  let panel_body = document.getElementById('panel-body')
  let outgoing_msg = document.createElement('div')
  outgoing_msg.classList.add('outgoing_msg')
  let sent_msg = document.createElement('div')
  sent_msg.classList.add('sent_msg')
  let paragraph = document.createElement('p')
  paragraph.innerHTML = 'bot : ' + replyText
  sent_msg.appendChild(paragraph)
  outgoing_msg.appendChild(sent_msg)
  panel_body.appendChild(outgoing_msg)
 
});
