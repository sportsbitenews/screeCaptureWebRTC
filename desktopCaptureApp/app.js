//Api key en peerjs, la que esta puesta tendrias que cambiarla http://peerjs.com/peerserver
var peer = new Peer({ key: 't8jdgbn69x315rk9', debug: 3});

peer.on('open', function(){
  console.log(peer.id);
});

// Receiving a call
peer.on('call', function(call){
  // Answer the call automatically (instead of prompting user) for demo purposes
  call.answer(window.localStream);
  llamada(call);
});

peer.on('error', function(err){
  alert(err.message);
  console.log(err.message);
});

function gotStream(stream) {
  var video = document.querySelector("video");
  video.src = URL.createObjectURL(stream);
  //id del par al que llamas, para nuestro proposito podemos hacer esto, en cualquier otro caso no valdrá 
  var call = peer.call('clienteByInterzonas', stream);
  localstream = stream;
  stream.onended = function() { console.log("Ended"); };
}

function getUserMediaError() {
  console.log("getUserMedia() failed.");
}

function llamada (call) {
  alert('step3')
  console.log('step3');
  // Wait for stream on the call, then set peer video display
  call.on('stream', function(stream){
    $('#video').prop('src', URL.createObjectURL(stream));
  });
}


function onAccessApproved(id) {
  if (!id) {
    console.log("Access rejected.");
    return;
  }

  navigator.webkitGetUserMedia({
      audio:false,
      video: { 
        mandatory: { 
          chromeMediaSource: "desktop",
          chromeMediaSourceId: id,
          minWidth: "536",
          minHeight: "150",
          maxWidth: "536",
          maxHeight: "150" 
        } 
      }
  }, gotStream, getUserMediaError);
}

var pending_request_id = null;

document.querySelector('#start').addEventListener('click', function(e) {
  pending_request_id = chrome.desktopCapture.chooseDesktopMedia(
      ["screen", "window"], onAccessApproved);
});


