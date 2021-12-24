import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentOfferComponent } from './current-offer.component';
import { PictureModule } from '../../../shared/picture/picture.module';

@NgModule({
  declarations: [CurrentOfferComponent],
  exports: [CurrentOfferComponent],
  imports: [CommonModule, PictureModule],
})
export class CurrentOfferModule {}
