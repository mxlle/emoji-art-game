import { ChangeDetectionStrategy, Component, Input, TrackByFunction } from '@angular/core';
import { BuyerSelection } from '../../../game-logic/game';

@Component({
  selector: 'app-buyer-selection-marker',
  templateUrl: './buyer-selection-marker.component.html',
  styleUrls: ['./buyer-selection-marker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuyerSelectionMarkerComponent {
  @Input() selections: BuyerSelection[] = [];
  trackBySelectionTheme: TrackByFunction<BuyerSelection> = (_index: number, selection: BuyerSelection) => selection.theme;
}
