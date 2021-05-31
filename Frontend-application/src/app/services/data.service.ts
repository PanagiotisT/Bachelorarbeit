import { Injectable } from '@angular/core';
import { IScene, IStory } from '../entities/i-story';
import { BehaviorSubject, } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

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

  audioLengthInSeconds: number;
  audioUrl;
  localData: boolean;

  constructor(private domSanitizer: DomSanitizer) {
    // this.checkLocalStorageForValues();
  }

  sanitizeUrl(url: string) {
    return this.domSanitizer.bypassSecurityTrustUrl(url);
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

  setAudioUrl(url) {
   this.audioUrl = url;
  }

  getAudioUrl() {
    return this.audioUrl;
  }
}
