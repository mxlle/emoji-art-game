import { ChangeDetectionStrategy, Component } from '@angular/core';
import { getJokerLabel, getPhaseEmojis, masterFaker } from '../../../game-logic/gameConsts';
import { GamePhase, JokerType, Role } from '../../../game-logic/game';

@Component({
  selector: 'app-quick-rules',
  templateUrl: './quick-rules.component.html',
  styleUrls: ['./quick-rules.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuickRulesComponent {
  readonly faker = masterFaker;

  readonly roles = Role.PAINTER + Role.BUYER;
  readonly themes = '🎸🐇';
  readonly demand = getPhaseEmojis(GamePhase.Demand);
  readonly paint = getPhaseEmojis(GamePhase.Offer);
  readonly buy = getPhaseEmojis(GamePhase.Choose);
  readonly evaluate = getPhaseEmojis(GamePhase.Evaluate);
  readonly repeat = '🔁⌛';
  readonly jokers = getJokerLabel({ type: JokerType.SWAP_HAND });
}