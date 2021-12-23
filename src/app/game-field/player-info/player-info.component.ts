import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from '@angular/core';
import { Game, Picture, Player } from '../../game';

@Component({
  selector: 'app-player-info',
  templateUrl: './player-info.component.html',
  styleUrls: ['./player-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerInfoComponent implements OnInit {
  @Input() game!: Game;
  @Input() player!: Player;

  @HostBinding('style.--border-color') get color(): string {
    return this.player.color ?? 'transparent';
  }

  get selectedPictures(): number {
    return this.player.pictures.filter((pic: Picture) => !!pic.painterTheme).length;
  }

  constructor() {}

  ngOnInit(): void {}
}
