import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Injectable({
  providedIn: 'root',
})
export class AppUpdateService {
  constructor(private readonly updates: SwUpdate) {
    this.updates.versionUpdates.subscribe((event) => {
      console.log(event);
      this.showAppUpdateAlert();
    });
  }
  showAppUpdateAlert() {
    const shouldUpdate = window.confirm('Update available - update now?');
    if (shouldUpdate) {
      this.doAppUpdate();
    }
  }
  doAppUpdate() {
    this.updates.activateUpdate().then(() => document.location.reload());
  }
}
