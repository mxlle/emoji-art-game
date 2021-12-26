import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from '@angular/core';
import { Picture, Player } from '../../../../game-logic/game';

@Component({
  selector: 'app-player-info',
  templateUrl: './player-info.component.html',
  styleUrls: ['./player-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerInfoComponent implements OnInit {
  @Input() player!: Player;
  @HostBinding('class.isCurrent') @Input() isCurrentPlayer: boolean = false;
  @HostBinding('style.--border-color') get color(): string {
    return this.player.color ?? 'transparent';
  }

  get selectedPictures(): number {
    return this.player.pictures?.filter((pic: Picture) => !!pic.painterTheme).length ?? 0;
  }

  constructor() {}

  ngOnInit(): void {}
}
