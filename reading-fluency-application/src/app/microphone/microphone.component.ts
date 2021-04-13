import { Component, OnDestroy, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service';
import * as RecordRTC from 'recordrtc';
import { LogService } from '../services/log.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Options } from 'recordrtc';

@Component({
  selector: 'app-microphone',
  templateUrl: './microphone.component.html',
  styleUrls: ['./microphone.component.scss']
})

export class MicrophoneComponent {

  readonly constraints = { audio: true, video: false };

  public recordAudio: any;
  mediaStream: any;
  audioURL: any;
  recordingStarted: boolean = undefined;
  canAnalyzeAudio: boolean = false;

  constructor(public socketService: SocketService, private logService: LogService, private domSanitizer: DomSanitizer) { }

  sanitizeAudioUrl(url: string) {
    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }

  recordingStart() {
    console.log('Start recording');
    this.recordingStarted = true;
    this.canAnalyzeAudio = false;
    navigator.mediaDevices.getUserMedia(this.constraints).then(this.successCallback.bind(this), this.errorCallback.bind(this));
  }

  successCallback(stream) {
    this.mediaStream = stream;
    const that  = this;
    const options : Options = {
      type: 'audio',
      // mimeType: 'audio/webm',
      recorderType: RecordRTC.StereoAudioRecorder,
      sampleRate: 44100,
      audioBitsPerSecond : 128000,
      numberOfAudioChannels: 1,
      desiredSampRate: 16000,
      timeSlice: 2000,
      ondataavailable(blob) {
        console.log(blob);
        // that.socketService.emit('start-record-audio', blob);
      }
    };

    this.recordAudio = new RecordRTC(this.mediaStream, options);
    this.recordAudio.startRecording();
  }

  recordingStop() {
    // Stop recording button nur drücken können, wenn eine Aufnahme gestartet wurde!
    console.log('Stop recording');
    // this.socketService.emit('stop-record-audio', '');
    console.log(this.recordAudio.getBlob())
    this.recordAudio.stopRecording( () => {
      let blobAudio = this.recordAudio.getBlob();
      // this.socketService.emit('start-record-audio', blobAudio);
      this.audioURL = URL.createObjectURL(blobAudio);
      console.log(URL.createObjectURL(blobAudio));
      this.mediaStream.stop();
      this.recordingStarted = false;
      this.canAnalyzeAudio = true;
      this.socketService.emit('stop-record-audio', blobAudio)
    })
  }

  errorCallback(error) {
    console.log(error);
  }

}
