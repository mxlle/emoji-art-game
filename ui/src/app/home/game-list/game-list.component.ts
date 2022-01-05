import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, TrackByFunction } from '@angular/core';
import { GameInfo, Player } from '../../../game-logic/game';
import { trackByObjectId } from '../../util/ui-helpers';
import { getCurrentUserId } from '../../../data/functions';
import { getClearedForDeletion, getPlayerInGame, isRoleActive } from '../../../game-logic/gameLogic';
import { getPhaseEmojis, pointsEmoji } from '../../../game-logic/gameConsts';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameListComponent {
  @Input() label: string = '';
  @Input() games: GameInfo[] = [];
  @Output() delete: EventEmitter<string> = new EventEmitter<string>();

  readonly trackByGameId: TrackByFunction<GameInfo> = trackByObjectId;
  readonly getPhaseEmojis = getPhaseEmojis;
  readonly currentUserId: string = getCurrentUserId();
  readonly pointsEmoji: string = pointsEmoji;

  getPlayersString(game: GameInfo): string {
    return game.players.map((pl: Player) => pl.name).join(', ') || '-';
  }

  isCurrentPlayersTurn(game: GameInfo) {
    return isRoleActive(game, getPlayerInGame(game, this.currentUserId));
  }

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
