import { ChangeDetectionStrategy, Component, Directive, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @Input() @HostBinding('class.clickable') clickable?: boolean;
  @Input() @HostBinding('class.disabled') disabled?: boolean;
  @Input() @HostBinding('class.selected') selected?: boolean;
}

@Directive({
  selector: '[appCardTopRight]',
})
export class CardTopRightDirective {}

@Directive({
  selector: '[appCardBottomLeft]',
})
export class CardBottomLeftDirective {}
