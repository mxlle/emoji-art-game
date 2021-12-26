import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent implements OnInit {
  @Input() @HostBinding('class.selected') selected?: boolean;
  @Input() @HostBinding('class.emoji') useEmojiFont?: boolean;

  constructor() {}

  ngOnInit(): void {}
}
