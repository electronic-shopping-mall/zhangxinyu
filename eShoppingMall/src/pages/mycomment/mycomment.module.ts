import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MycommentPage } from './mycomment';

@NgModule({
  declarations: [
    MycommentPage,
  ],
  imports: [
    IonicPageModule.forChild(MycommentPage),
  ],
})
export class MycommentPageModule {}
