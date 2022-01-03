import { ChangeDetectionStrategy, Component, Directive, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-flip-card',
  templateUrl: './flip-card.component.html',
  styleUrls: ['./flip-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlipCardComponent implements OnInit {
  @HostBinding('class.show-back') @Input() showBack: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}

@Directive({
  selector: '[appFlipCardFront]',
})
export class FlipCardFrontDirective {}

@Directive({
  selector: '[appFlipCardBack]',
})
export class FlipCardBackDirective {}
