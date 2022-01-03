import { ChangeDetectionStrategy, Component, HostBinding, Input, TrackByFunction } from '@angular/core';
import { GamePhase, Joker, JokerType, Player, PublicGame } from '../../../../game-logic/game';
import apiFunctions from '../../../../data/apiFunctions';
import { JokerConfirmDialogService } from './joker-confirm-dialog/joker-confirm-dialog.service';
import { getJokerLabel, maxDemand, minDemand } from '../../../../game-logic/gameConsts';

@Component({
  selector: 'app-jokers',
  templateUrl: './jokers.component.html',
  styleUrls: ['./jokers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [JokerConfirmDialogService],
})
export class JokersComponent {
  @Input() game!: PublicGame;
  @Input() currentPlayer: Player | null = null;

  @HostBinding('class.inactive') get inactive(): boolean {
    return GamePhase.Evaluate === this.game.phase;
  }

  readonly trackByJoker: TrackByFunction<Joker> = (_, joker: Joker) => joker.type;
  readonly getJokerLabel = getJokerLabel;

  constructor(private _jokerConfirmDialogService: JokerConfirmDialogService) {}

  userIsAllowed(joker: Joker): boolean {
    return this.currentPlayer?.role === joker.role;
  }

  isAvailable(joker: Joker): boolean {
    return !joker.used && joker.phase === this.game.phase;
  }

  useJoker(joker: Joker) {
    if (!joker.used && this.isAvailable(joker)) {
      let options;
      if (JokerType.CHANGE_DEMAND === joker.type) {
        const smallerDemand = this.game.currentDemand - 1;
        const biggerDemand = this.game.currentDemand + 1;
        options = [];
        if (smallerDemand >= minDemand) options.push(smallerDemand);
        if (biggerDemand <= maxDemand) options.push(biggerDemand);
      } else if (JokerType.QUESTION_PICTURE === joker.type) {
        options = this.game.currentOffer;
      }

      this._jokerConfirmDialogService.openDialog(joker, options).subscribe((result) => {
        if (result) {
          switch (joker.type) {
            case JokerType.EXCHANGE_THEMES:
              apiFunctions.useExchangeThemesJoker(this.game.id);
              break;
            case JokerType.SWAP_HAND:
              apiFunctions.useSwapHandJoker(this.game.id);
              break;
            case JokerType.CHANGE_DEMAND:
              if (typeof result === 'number') {
                apiFunctions.useChangeDemandJoker(this.game.id, result);
              }
              break;
            case JokerType.QUESTION_PICTURE:
              if (typeof result === 'string') {
                apiFunctions.useQuestionPictureJoker(this.game.id, result);
              }
              break;
          }
        }
      });
    }
  }
}
