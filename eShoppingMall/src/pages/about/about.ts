import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CreativeSpacePage } from '../creative-space/creative-space';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController) {

  }
  goCreative(){
    this.navCtrl.push(CreativeSpacePage)
  }
}
