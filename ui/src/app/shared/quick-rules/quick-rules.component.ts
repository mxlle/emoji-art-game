import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GamePhase, getJokerLabel, getPhaseEmojis, JokerType, masterFaker, Role } from '../../../game-logic';

@Component({
  selector: 'app-quick-rules',
  templateUrl: './quick-rules.component.html',
  styleUrls: ['./quick-rules.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuickRulesComponent {
  readonly faker = masterFaker;

  readonly roles = Role.PAINTER + Role.BUYER;
  readonly themes = 'πΈπ';
  readonly demand = getPhaseEmojis(GamePhase.Demand);
  readonly paint = getPhaseEmojis(GamePhase.Offer);
  readonly buy = getPhaseEmojis(GamePhase.Choose);
  readonly evaluate = getPhaseEmojis(GamePhase.Evaluate);
  readonly repeat = 'πβ';
  readonly jokers = getJokerLabel({ type: JokerType.SWAP_HAND });
}
