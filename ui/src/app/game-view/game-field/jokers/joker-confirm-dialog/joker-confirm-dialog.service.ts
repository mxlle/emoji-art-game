import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Joker, Picture } from '../../../../../game-logic/game';
import { JokerConfirmDialogComponent, JokerConfirmDialogData } from './joker-confirm-dialog.component';
import { Observable } from 'rxjs';

@Injectable()
export class JokerConfirmDialogService {
  constructor(private _dialog: MatDialog) {}

  openDialog(joker: Joker, options?: Picture[] | number[]): Observable<true | string | number | undefined> {
    return this._dialog
      .open(JokerConfirmDialogComponent, {
        data: <JokerConfirmDialogData>{
          joker: joker,
          options,
        },
        autoFocus: false,
      })
      .afterClosed();
  }
}
