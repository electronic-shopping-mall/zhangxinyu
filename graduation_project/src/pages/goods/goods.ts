import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the GoodsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-goods',
  templateUrl: 'goods.html',
})
export class GoodsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GoodsPage');
  }

  isActive=1; //用于标记s商品页的3个导航按钮， 0表示商品 1表示详情 2表示评论
  imgs=['01','02','03','04','05','06','07','08','09','010','011','012','013','015','016','017','018','019','020'];

  isClick(i){
    this.isActive=i;
  }
  goHome(){
    this.navCtrl.pop();
  }
}
