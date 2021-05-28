import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { RecordService } from '../services/record.service';

@Component({
  selector: 'app-microphone',
  templateUrl: './microphone.component.html',
  styleUrls: ['./microphone.component.scss']
})

export class MicrophoneComponent {

  recordingStarted: boolean = undefined;

  constructor(public dataService: DataService, public recordService: RecordService) {}

  startRecording() {
    this.recordService.startRecording();
    this.recordingStarted = true;
  }

  stopRecording() {
    this.recordService.endRecording();
    this.recordingStarted = false;
  }
}
