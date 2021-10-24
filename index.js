navigator.mediaDevices.getUserMedia({audio:true})
.then(stream => {handlerFunction(stream)})


      function handlerFunction(stream) {
      rec = new MediaRecorder(stream);
      rec.ondataavailable = e => {
        audioChunks.push(e.data);
        if (rec.state == "inactive"){
          let blob = new Blob(audioChunks,{type:'audio/mpeg-3'});
          recordedAudio.src = URL.createObjectURL(blob);
          recordedAudio.controls=true;
          recordedAudio.autoplay=true;
          sendData(blob)
        }
      }
    }
          function sendData(data) {}

  record.onclick = e => {
    console.log('record was clicked')
    record.disabled = true;
    record.style.backgroundColor = "blue"
    stopRecord.disabled=false;
    audioChunks = [];
    rec.start();
  }
  stopRecord.onclick = e => {
    console.log("stopRecord was clicked")
    record.disabled = false;
    stop.disabled=true;
    record.style.backgroundColor = "red"
    rec.stop();
  }

  MediaRecorder.onstop = fucntion(e){
    console.log("data available after MediaRecorder.stop() called")
    var audio = document.createElement('audio');
    audio.controls = true;
    var blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
    var audioURL = window.URL.createObjectURL(blob);
    audio.src = audioURL;
    console.log("recorder stopped");
  }