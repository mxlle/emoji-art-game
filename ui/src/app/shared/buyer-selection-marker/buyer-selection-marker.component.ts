import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { BuyerSelection } from '../../../game-logic/game';

@Component({
  selector: 'app-buyer-selection-marker',
  templateUrl: './buyer-selection-marker.component.html',
  styleUrls: ['./buyer-selection-marker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuyerSelectionMarkerComponent implements OnInit {
  @Input() selections: BuyerSelection[] = [];

  constructor() {}

  ngOnInit(): void {}
}
