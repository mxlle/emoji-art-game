import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Picture} from '../../../game-logic/game';
import {masterFaker} from '../../../game-logic/gameConsts';

@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PictureComponent implements OnInit {
  @Input() picture!: Picture;
  @Input() selected: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  get masterFaker(): typeof masterFaker {
    return masterFaker;
  }
}