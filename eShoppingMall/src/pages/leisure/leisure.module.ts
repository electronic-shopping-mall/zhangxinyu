import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LeisurePage } from './leisure';

@NgModule({
  declarations: [
    LeisurePage,
  ],
  imports: [
    IonicPageModule.forChild(LeisurePage),
  ],
})
export class LeisurePageModule {}
