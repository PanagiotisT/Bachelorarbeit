import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-unity-web-gl',
  templateUrl: './unity-web-gl.component.html',
  styleUrls: ['./unity-web-gl.component.scss']
})
export class UnityWebGlComponent implements OnInit {

  gameInstance: any;
  progress = 0;
  isReady = false;

  currentIndex: number;

  constructor(private dataService: DataService) {
    this.dataService.currentIndex.subscribe( index => {
      this.currentIndex = index;
    });
  }

  ngOnInit(): void {
    const loader = (window as any).UnityLoader;

    // Anpassen / Odnername wird immer der Story.name sein und der Index zeigt welche Szene geladen werden soll
    this.gameInstance = loader.instantiate(
        'gameContainer',
        '/assets/Build/Unity.json', {
          onProgress: (gameInstance: any, progress: number) => {
            this.progress = progress;
            if (progress === 1) {
              this.isReady = true;
            }
          }
        });
  }

  // Unity Funktion aufrufen:
  // this.gameInstance.SendMessage(Parameter 1 = Das GameObject von Unity, welches angesprochen werden soll Bsp.: 'GameObject',
  //                               Parameter 2 = Der Methodennamen aus dem GameObject Bsp.: 'ChangeDisplayText',
  //                               Parameter 3 = Parameter für die aufgerufene Funktion die Übergeben werden sollen)


  // Werte aus Unity empfangen:
  // https://docs.unity3d.com/Manual/webgl-interactingwithbrowserscripting.html
  // In Unity eine .jslib Datei erstellen Funktion erstellen, die einen Pointer aus einer C# Funktion bekommt und an eine window funktion sendet

  changeUnityScene() {
    this.gameInstance.SendMessage('SceneManager', 'loadSceneWithIndex', this.currentIndex);
  }

}
