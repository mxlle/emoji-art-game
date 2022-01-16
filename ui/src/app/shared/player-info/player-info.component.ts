import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { Player } from '../../../game-logic';

@Component({
  selector: 'app-player-info',
  templateUrl: './player-info.component.html',
  styleUrls: ['./player-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerInfoComponent {
  @Input() player!: Player;
  @HostBinding('style.--border-color') get color(): string {
    return this.player.color;
  }
}
