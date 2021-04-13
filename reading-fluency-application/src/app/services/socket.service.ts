import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { LogService } from './log.service';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService implements OnDestroy {

  public socketIo: any;
  readonly uri: string = 'http://localhost:3000';

  constructor(private logService: LogService) {
    this.socketIo = io(this.uri);
  }

  listen(eventName: string) {
    return new Observable( (subscriber => {
      this.socketIo.on(eventName, (data) => {
        subscriber.next(data);
      });
    }));
  }

  emit(eventName, data) {
    this.socketIo.emit(eventName, data);
  }

  ngOnDestroy() {
    this.logService.text(this, 'On Destroy');
  }

}
