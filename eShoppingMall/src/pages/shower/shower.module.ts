import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShowerPage } from './shower';

@NgModule({
  declarations: [
    ShowerPage,
  ],
  imports: [
    IonicPageModule.forChild(ShowerPage),
  ],
})
export class ShowerPageModule {}
