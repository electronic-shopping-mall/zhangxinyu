import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InformationdetailPage } from '../informationdetail/informationdetail';

/**
 * Generated class for the CreativeSpacePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-creative-space',
  templateUrl: 'creative-space.html',
})
export class CreativeSpacePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreativeSpacePage');
  }

  goDetail(){
    this.navCtrl.push(InformationdetailPage);
  }
}
