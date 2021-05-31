import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { IScene } from '../entities/i-story';

@Component({
  selector: 'app-textfield',
  templateUrl: './textfield.component.html',
  styleUrls: ['./textfield.component.scss']
})
export class TextfieldComponent implements OnInit {

  currentScene: IScene;

  constructor(private dataService: DataService) {
    this.dataService.currentScene.subscribe( scene => {
      this.currentScene = scene;
    });
  }

  ngOnInit(): void {
  }
}
