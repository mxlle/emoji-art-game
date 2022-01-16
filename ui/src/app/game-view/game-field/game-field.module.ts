import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameFieldComponent } from './game-field.component';
import { CardModule } from '../../ui-components/card/card.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { PictureModule } from '../../shared/picture/picture.module';
import { DemandPickerModule } from './demand/demand-picker/demand-picker.module';
import { PlayerHandModule } from './player-hand/player-hand.module';
import { CurrentOfferModule } from './current-offer/current-offer.module';
import { CurrentThemesModule } from './current-themes/current-themes.module';
import { PlayerInfoModule } from '../../shared/player-info/player-info.module';
import { QuickAccessBarModule } from './quick-access-bar/quick-access-bar.module';
import { PhaseInfoModule } from './phase-info/phase-info.module';
import { JokersModule } from './jokers/jokers.module';
import { DemandModule } from './demand/demand.module';
import { RoleNotifierModule } from '../role-notifier/role-notifier.module';

@NgModule({
  declarations: [GameFieldComponent],
  exports: [GameFieldComponent],
  imports: [
    CommonModule,
    CardModule,
    MatButtonModule,
    MatCardModule,
    PictureModule,
    DemandPickerModule,
    PlayerHandModule,
    CurrentOfferModule,
    CurrentThemesModule,
    PlayerInfoModule,
    QuickAccessBarModule,
    PhaseInfoModule,
    JokersModule,
    DemandModule,
    RoleNotifierModule,
  ],
})
export class GameFieldModule {}
