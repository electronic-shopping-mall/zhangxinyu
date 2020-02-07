import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SearchPage } from '../search/search';
import { GoodsPage } from '../goods/goods';
import { ShowerPage } from '../shower/shower';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  goSearch(){
    this.navCtrl.push(SearchPage);
  }
  goGoods(){
    this.navCtrl.push(GoodsPage);
  }
  goShower(){
    this.navCtrl.push(ShowerPage);
  }
}
