import { Injectable } from '@angular/core';
import { IScene, IStory } from '../entities/i-story';
import { BehaviorSubject, } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private story: BehaviorSubject<IStory> = new BehaviorSubject({} as IStory);
  private scene: BehaviorSubject<IScene> = new BehaviorSubject({} as IScene);
  private index: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  currentStory = this.story.asObservable();
  currentScene = this.scene.asObservable();
  currentIndex = this.index.asObservable();

  constructor() {
    this.checkLocalStorageForValues();
  }

  checkLocalStorageForValues() {
    if (Object.keys(this.story.getValue()).length === 0) {
      this.story.next(this.getLocalStorageData('story'));
    }

    if (this.index.getValue() === 0) {
      this.index.next(this.getLocalStorageData('index'));
    }

    if (Object.keys(this.scene.getValue()).length === 0) {
      this.scene.next(this.story.getValue().scenes[this.index.getValue()]);
    }
  }

  setStory(story: IStory) {
    this.story.next(story);
    localStorage.setItem('story', JSON.stringify(this.story.value));
  }

  setScene(index: number) {
    this.index.next(index);
    this.scene.next(this.story.getValue().scenes[index]);
    localStorage.setItem('index', JSON.stringify(this.index.value));
  }

  getLocalStorageData(storageName: string) {
    return JSON.parse(localStorage.getItem(storageName));
  }
}
