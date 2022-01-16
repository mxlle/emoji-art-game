import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { getJokerLabel, Joker, JokerType, Picture } from '../../../../../game-logic';

export interface JokerConfirmDialogData {
  joker: Joker;
  options?: Picture[] | number[];
}

@Component({
  selector: 'app-joker-confirm-dialog',
  templateUrl: './joker-confirm-dialog.component.html',
  styleUrls: ['./joker-confirm-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JokerConfirmDialogComponent {
  selectedValue?: number | string;

  readonly getJokerLabel = getJokerLabel;
  readonly JokerType: typeof JokerType = JokerType;

  get isBooleanCheck(): boolean {
    return [JokerType.EXCHANGE_THEMES, JokerType.SWAP_HAND].includes(this.data.joker.type);
  }

  get demandOptions(): number[] {
    return (this.data.options as number[]) ?? [];
  }

  get pictureOptions(): Picture[] {
    return (this.data.options as Picture[]) ?? [];
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: JokerConfirmDialogData) {}
}
