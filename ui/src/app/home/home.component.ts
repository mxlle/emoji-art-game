import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {mockGameId} from "../mock-mode/mock-service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  readonly testGameUrl = `/${mockGameId}`

  constructor() { }

  ngOnInit(): void {
  }

}
