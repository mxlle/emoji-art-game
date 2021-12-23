import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MockModeComponent} from './mock-mode.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {CardModule} from '../shared/card/card.module';

@NgModule({
  declarations: [MockModeComponent],
  exports: [MockModeComponent],
  imports: [CommonModule, MatCardModule, MatButtonModule, CardModule],
})
export class MockModeModule {}
