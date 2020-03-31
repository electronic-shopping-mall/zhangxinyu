import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GoodsPage } from '../goods/goods';

/**
 * Generated class for the SearchresultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-searchresult',
  templateUrl: 'searchresult.html',
})
export class SearchresultPage {

  resultData;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.resultData=navParams.get('resultData');
  }

  show;
  ionViewDidLoad() {
    if(this.resultData.length==0){
      this.show=1;
    }else{
      this.show=2;
    }
  }
  goGoods(id){
    localStorage.setItem('productID',id);
    this.navCtrl.push(GoodsPage);
  }
  goBack(){
    this.navCtrl.pop();
  }
}
