import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { SETTING_COLOR, SETTING_NAME } from '../../../../data/constants';
import { randomArrayValue } from '../../../../game-tools/random-util';
import { allColors } from '../../../../game-tools/color-util';
import { Player } from '../../../../game-logic/game';
import { getCurrentUserId } from '../../../../data/functions';

@Component({
  selector: 'app-player-editor',
  templateUrl: './player-editor.component.html',
  styleUrls: ['./player-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerEditorComponent {
  @Output() playerSubmit: EventEmitter<Player> = new EventEmitter<Player>();

  name: string = window.localStorage.getItem(SETTING_NAME) ?? '';
  color: string = window.localStorage.getItem(SETTING_COLOR) ?? randomArrayValue(allColors);

  submitPlayer() {
    window.localStorage.setItem(SETTING_NAME, this.name);
    window.localStorage.setItem(SETTING_COLOR, this.color);
    this.playerSubmit.emit({ id: getCurrentUserId(), name: this.name, color: this.color });
  }
}
