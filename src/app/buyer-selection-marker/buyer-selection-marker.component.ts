import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { BuyerSelection } from '../game';

@Component({
  selector: 'app-buyer-selection-marker',
  templateUrl: './buyer-selection-marker.component.html',
  styleUrls: ['./buyer-selection-marker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuyerSelectionMarkerComponent implements OnInit {
  @Input() selection: BuyerSelection = {};

  get themes(): string[] {
    return Object.keys(this.selection);
  }

  constructor() {}

  ngOnInit(): void {}
}
