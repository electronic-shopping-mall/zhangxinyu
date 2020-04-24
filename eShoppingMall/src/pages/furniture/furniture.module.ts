import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FurniturePage } from './furniture';

@NgModule({
  declarations: [
    FurniturePage,
  ],
  imports: [
    IonicPageModule.forChild(FurniturePage),
  ],
})
export class FurniturePageModule {}
