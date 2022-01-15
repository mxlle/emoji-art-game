import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgLetDirective } from './ng-let.directive';
import { ScaleDirective } from './scale.directive';
import { TranslateToCenterDirective } from './translateToCenter.directive';
import { PlayerColorPipe } from './player-color.pipe';
import { PlayerGradientPipe } from './player-gradient.pipe';

@NgModule({
  declarations: [NgLetDirective, ScaleDirective, TranslateToCenterDirective, PlayerColorPipe, PlayerGradientPipe],
  exports: [NgLetDirective, ScaleDirective, TranslateToCenterDirective, PlayerColorPipe, PlayerGradientPipe],
  imports: [CommonModule],
})
export class HelpersModule {}
