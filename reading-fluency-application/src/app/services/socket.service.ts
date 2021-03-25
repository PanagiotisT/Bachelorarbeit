import { Injectable, OnDestroy } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { LogService } from './log.service';

@Injectable({
  providedIn: 'root'
})
export class SocketService implements OnDestroy {

  socket: any;
  readonly uri: string = 'http://localhost:3000';

  constructor(private logService: LogService) {
    // @ts-ignore
    this.socket = io(this.uri);
    console.log('Socket Service Constructor');
  }

  listen(eventName: string) {
    return new Observable( (subscriber => {
      this.socket.on(eventName, (data) => {
        subscriber.next(data);
      });
    }));
  }

  emit(eventName, data) {
    this.socket.emit(eventName, data);
  }

  ngOnDestroy() {
    this.logService.text(this, 'On Destroy');
  }

}
