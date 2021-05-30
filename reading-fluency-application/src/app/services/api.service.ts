import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { IStories } from '../entities/i-stories';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  story = [{
    "name": "Zauberlehrling",
    "description": "Eine Hexe lebt alleine im Wald. Eines Tages sieht Sie in einer Vision, dass bald eine Elfe eintreffen wird. Die Hexe soll die Elfe bei sich aufnehmen und die Künste der Magie lehren.",
    "image": "images/lehrling.png",
    "scenes": [
      {
        "name": "Szene 1",
        "text": "Ich frage mich wann die Elfe eintreffen wird. "
      },
      {
        "name": "Szene 2",
        "text": "Die Hexe ist sehr stark."
      }
    ],
    "characters": {
      "total": 2,
      "teller": false,
      "character": [
        "Hexe",
        "Elfe"
      ]
    },
    "unityWebGL": "Geschichte1"
  }]


  constructor(private httpClient: HttpClient, private dataService: DataService) { }

  getStories() {
    return this.httpClient.get('http://localhost:3000/stories')
      .pipe(
          catchError(this.handleError())
      );
  }

  handleError(operation = 'operation', result?: any) {
    return (error: any): Observable<any> => {
      console.log("Server not available. Using local Data.")
      this.dataService.localData = true;
      return of(this.story);
    };
  }
}
