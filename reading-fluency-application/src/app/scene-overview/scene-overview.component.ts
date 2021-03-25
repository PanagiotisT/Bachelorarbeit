import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../services/data.service';
import { IStory } from '../entities/i-story';
import { LogService } from '../services/log.service';
import { UnityWebGlComponent } from '../unity-web-gl/unity-web-gl.component';

@Component({
  selector: 'app-scene-overview',
  templateUrl: './scene-overview.component.html',
  styleUrls: ['./scene-overview.component.scss']
})
export class SceneOverviewComponent implements OnInit{

  @ViewChild(UnityWebGlComponent) child: UnityWebGlComponent;

  story: IStory;
  sceneIndex: number;

  messageFromUnity = 'Hier erscheint die Nachricht die von Unity empfangen wird.';

  constructor(private dataService: DataService, private logService: LogService) {
    this.dataService.currentStory.subscribe( story => {
      this.story = story;
      console.log(this.constructor.name);
      logService.object(this, story);
    });

    this.dataService.currentIndex.subscribe( index => {
      this.sceneIndex = index;
      console.log(this.constructor.name + '  ' + index);
    });

    logService.text(this, 'Constructor message!');
  }

  ngOnInit(): void {
    (window as any).sendButtonMessageListener = (message: string) => {
      this.messageFromUnity = message;
    };
  }

  selectScene(index: number) {
    console.log(this.constructor.name);
    this.dataService.setScene(index);
    this.child.changeUnityScene();
  }

}
