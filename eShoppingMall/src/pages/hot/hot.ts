import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { GoodsPage } from '../goods/goods';

/**
 * Generated class for the HotPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-hot',
  templateUrl: 'hot.html',
})
export class HotPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private http:HttpClient) {
  }
  goodsData;
  ionViewWillEnter(){
    this.http.post('/api/goods/Typeparent',{"type":'热卖'}).subscribe(data=>{
      this.goodsData=Array.prototype.slice.call(data);
    });
  }
  goGoods(id){
    localStorage.setItem('productID',id);
    this.navCtrl.push(GoodsPage);
  }
  goBack(){
    this.navCtrl.pop();
  }
}
