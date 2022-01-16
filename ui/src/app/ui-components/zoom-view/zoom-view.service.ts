import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ZoomViewComponent } from './zoom-view.component';

@Injectable({
  providedIn: 'root',
})
export class ZoomViewService {
  constructor(private _dialog: MatDialog) {}

  open(emoji: string) {
    this._dialog.open(ZoomViewComponent, {
      data: { emoji },
      maxHeight: 'auto',
      maxWidth: 'auto',
    });
  }
}
