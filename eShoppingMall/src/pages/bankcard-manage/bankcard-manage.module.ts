import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BankcardManagePage } from './bankcard-manage';

@NgModule({
  declarations: [
    BankcardManagePage,
  ],
  imports: [
    IonicPageModule.forChild(BankcardManagePage),
  ],
})
export class BankcardManagePageModule {}
