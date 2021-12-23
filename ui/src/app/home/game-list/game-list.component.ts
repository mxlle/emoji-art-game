import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, TrackByFunction } from '@angular/core';
import { Game } from '../../../game-logic/game';
import { trackByObjectId } from '../../ui-helpers';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameListComponent implements OnInit {
  @Input() games: Game[] = [];
  @Output() delete: EventEmitter<string> = new EventEmitter<string>();

  readonly trackByGameId: TrackByFunction<Game> = trackByObjectId;

  constructor() {}

  ngOnInit(): void {}

  deleteHover(event: MouseEvent) {
    event.stopImmediatePropagation();
    event.stopPropagation();
  }

  deleteClick(event: MouseEvent, gameId: string) {
    event.stopPropagation();
    this.delete.emit(gameId);
  }
}
