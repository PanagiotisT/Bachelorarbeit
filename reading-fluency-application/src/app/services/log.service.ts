import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  titleStyle = 'font-size: 16px; font-weight: bold';
  textStyle = 'font-size: 13px;';
  constructor() { }

  object(clazz, objectToLog) {
    console.log(`${this.logTime(clazz)} %o`, this.titleStyle, objectToLog);
  }

  text(clazz, msg) {
    console.log(`${this.logTime(clazz)} %c${msg}` , this.titleStyle, this.textStyle);
  }

  logTime(clazz): string {
    return `%c ${new Date().toLocaleString()} - ${clazz.constructor.name}`;
  }
}
