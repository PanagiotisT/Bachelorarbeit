import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { SocketService } from '../services/socket.service';
import { IStory } from '../entities/i-story';

@Component({
  selector: 'app-unity-web-gl',
  templateUrl: './unity-web-gl.component.html',
  styleUrls: ['./unity-web-gl.component.scss']
})
export class UnityWebGlComponent implements OnInit {

  gameInstance: any;
  isReady = false;

  currentIndex: number;
  currentStory: IStory;

  constructor(private dataService: DataService, private socketService: SocketService) {
    this.dataService.currentIndex.subscribe( index => {
      this.currentIndex = index;
    });

    this.dataService.currentStory.subscribe( story => {
      this.currentStory = story;
    })

    this.socketService.listen('receive-emotions').subscribe( emotion => {
      this.sendInformationToUnity(emotion);
    })
  }

  ngOnInit(): void {
    const loader = (window as any).UnityLoader;

    this.gameInstance = loader.instantiate('gameContainer', `/assets/${this.currentStory.unityWebGL}/Build/BuildTest.json`);
  }

  changeUnityScene() {
    this.gameInstance.SendMessage('SceneLoader', 'loadSceneWithIndex', this.currentIndex);
  }

  sendInformationToUnity(emotions) {
    this.gameInstance.SendMessage('LogicHandler', 'receiveEmotions', emotions);
    this.gameInstance.SendMessage('LogicHandler', 'receiveAudioUrl', this.dataService.audioUrl);
    this.gameInstance.SendMessage('LogicHandler', 'receiveAudioLength', this.dataService.audioLengthInSeconds);
  }

}
