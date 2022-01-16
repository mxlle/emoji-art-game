import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from '@angular/core';
import { masterFaker, Picture, Role } from '../../../game-logic';

@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PictureComponent implements OnInit {
  @Input() picture!: Picture;
  @Input() selected: boolean = false;
  @HostBinding('class.clickable') @Input() clickable: boolean = false;
  @Input() disabled: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  get masterFaker(): typeof masterFaker {
    return masterFaker;
  }
  get Role(): typeof Role {
    return Role;
  }
}
