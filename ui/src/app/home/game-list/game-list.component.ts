import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, TrackByFunction } from '@angular/core';
import { getClearedForDeletion, getPhaseEmojis, getPlayerInGame, isRoleActive, ListGame, Player, pointsEmoji } from '../../../game-logic';
import { trackByObjectId } from '../../util/ui-helpers';
import { getCurrentUserId } from '../../../data/functions';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameListComponent implements OnInit {
  @Input() label: string = '';
  @Input() games: ListGame[] = [];
  @Input() initialLimit: number = 5;
  @Output() delete: EventEmitter<string> = new EventEmitter<string>();

  limit: number = this.initialLimit;

  readonly trackByGameId: TrackByFunction<ListGame> = trackByObjectId;
  readonly getPhaseEmojis = getPhaseEmojis;
  readonly currentUserId: string = getCurrentUserId();
  readonly pointsEmoji: string = pointsEmoji;

  private readonly limitStep: number = 5;

  ngOnInit() {
    this.limit = this.initialLimit;
  }

  increaseLimit() {
    this.limit += this.limitStep;
  }

  getPlayersString(game: ListGame): string {
    return game.players.map((pl: Player) => pl.name).join(', ') || '-';
  }

  isCurrentPlayersTurn(game: ListGame) {
    return isRoleActive(game, getPlayerInGame(game, this.currentUserId));
  }

  isDeleteAllowed(game: ListGame): boolean {
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
