import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiService } from './services/api.service';
import { DataService } from './services/data.service';
import { LogService } from './services/log.service';
import { SocketService } from './services/socket.service';
import { MicrophoneComponent } from './microphone/microphone.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SceneOverviewComponent } from './scene-overview/scene-overview.component';
import { StoriesOverviewComponent } from './stories-overview/stories-overview.component';
import { TextfieldComponent } from './textfield/textfield.component';
import { UnityWebGlComponent } from './unity-web-gl/unity-web-gl.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    MicrophoneComponent,
    PageNotFoundComponent,
    SceneOverviewComponent,
    StoriesOverviewComponent,
    TextfieldComponent,
    UnityWebGlComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ApiService, DataService, LogService, SocketService,],
  bootstrap: [AppComponent]
})
export class AppModule { }
