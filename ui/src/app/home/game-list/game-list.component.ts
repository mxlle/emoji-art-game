import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, TrackByFunction } from '@angular/core';
import { GameInfo } from '../../../game-logic/game';
import { trackByObjectId } from '../../ui-helpers';
import { getCurrentUserId } from '../../../data/functions';
import { getClearedForDeletion } from '../../../game-logic/gameLogic';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameListComponent implements OnInit {
  @Input() games: GameInfo[] = [];
  @Output() delete: EventEmitter<string> = new EventEmitter<string>();

  readonly trackByGameId: TrackByFunction<GameInfo> = trackByObjectId;
  readonly currentUserId: string = getCurrentUserId();

  constructor() {}

  ngOnInit(): void {}

  isDeleteAllowed(game: GameInfo): boolean {
    return game.hostId === this.currentUserId || getClearedForDeletion(game);
  }

  deleteHover(event: MouseEvent) {
    event.stopImmediatePropagation();
    event.stopPropagation();
  }

  deleteClick(event: MouseEvent, gameId: string) {
    event.stopPropagation();
    this.delete.emit(gameId);
  }
}
