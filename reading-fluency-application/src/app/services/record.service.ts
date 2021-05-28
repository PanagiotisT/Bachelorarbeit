import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';
import { DataService } from './data.service';
import { Options } from 'recordrtc';
import * as RecordRTC from 'recordrtc';
import getBlobDuration from 'get-blob-duration';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

	readonly constraints = { audio: true, video: false };

	public recordAudio: RecordRTC;
	mediaStream: any;

	constructor(public socketService: SocketService, public dataService: DataService) { }

	startRecording() {
		console.log('Start recording');
		this.dataService.setAudioUrl(undefined)
		navigator.mediaDevices.getUserMedia(this.constraints).then(this.successCallback.bind(this), this.errorCallback.bind(this));
	}

	successCallback(stream) {
		this.mediaStream = stream;
		const that  = this;
		const options : Options = {
			type: 'audio',
			recorderType: RecordRTC.StereoAudioRecorder,
			numberOfAudioChannels: 1,
			timeSlice: 100,
			ondataavailable(blob) {
				console.log(blob);
				that.socketService.emit('receive-audio-blob', blob);
			}
		};

		this.recordAudio = new RecordRTC(this.mediaStream, options);
		this.recordAudio.startRecording();
	}

	endRecording() {
		console.log('Stop recording');
		this.recordAudio.stopRecording( () => {
			this.dataService.setAudioUrl(URL.createObjectURL(this.recordAudio.getBlob()));
			this.mediaStream.stop();
			this.socketService.emit('stop-record-audio', "");
			this.getDuration();
		})
	}

	async getDuration() {
		const duration = await getBlobDuration(this.dataService.getAudioUrl());
		this.dataService.audioLengthInSeconds = duration;
		console.log('Seconds = ' + this.dataService.audioLengthInSeconds)
	}

	errorCallback(error) {
		console.log(error);
	}
}
