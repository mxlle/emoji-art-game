import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HomeModule } from './home/home.module';
import { GameViewModule } from './game-view/game-view.module';
import { CardOverviewModule } from './card-overview/card-overview.module';
import { AppUpdateService } from './update.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    MatButtonModule,
    MatIconModule,
    GameViewModule,
    HomeModule,
    CardOverviewModule,
  ],
  providers: [AppUpdateService],
  bootstrap: [AppComponent],
})
export class AppModule {}
