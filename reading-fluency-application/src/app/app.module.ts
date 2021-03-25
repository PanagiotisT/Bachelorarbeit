import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiService } from './services/api.service';
import { DataService } from './services/data.service';
import { LogService } from './services/log.service';
import { SocketService } from './services/socket.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [ApiService, DataService, LogService, SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
