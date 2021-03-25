import { Component, OnDestroy, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service';
import * as RecordRTC from 'recordrtc';
import { LogService } from '../services/log.service';
import { take } from 'rxjs/operators';

const constraints = { audio: true };

@Component({
  selector: 'app-microphone',
  templateUrl: './microphone.component.html',
  styleUrls: ['./microphone.component.scss']
})

export class MicrophoneComponent implements OnInit, OnDestroy {

  public recordAudio: any;

  constructor(public socketService: SocketService, private logService: LogService) { }

  ngOnInit() {
    console.log('ON INIT');
    this.socketService.listen('test emit').subscribe( (data) => {
      this.logService.text(this, data);
    });
  }

  ngOnDestroy() {
    this.logService.text(this, 'On Destroy');
  }

  // Call from Button
  startRecording() {
    console.log('Start recording');
    navigator.mediaDevices.getUserMedia(constraints).then(this.successCallback.bind(this), this.errorCallback.bind(this));
  }

  successCallback(stream) {
    const that  = this;
    const options = {
      type: 'audio',
      mimeType: 'audio/webm',
      sampleRate: 44100,
      audioBitsPerSecond : 128000,
      desiredSampleRate: 16000,
      timeSlice: 4000,
      ondataavailable(blob) {
        console.log(blob);
      } // get intervals based blobs
    };

    this.recordAudio = new RecordRTC.MediaStreamRecorder(stream, options);
    this.recordAudio.record();
  }

  stopRecording() {
    console.log('Stop recording');
    this.recordAudio.stop(() => {
      // below one is recommended
      // const blob = this.getBlob();
      // console.log(blob);

      // Was steht in dem Blob?
    });
  }

  errorCallback(error) {
  }

}
