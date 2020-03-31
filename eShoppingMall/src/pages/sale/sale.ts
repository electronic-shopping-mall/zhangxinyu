import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GoodsPage } from '../goods/goods';
import {HttpClient,HttpHeaders} from '@angular/common/http';

/**
 * Generated class for the SalePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-sale',
  templateUrl: 'sale.html',
})
export class SalePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private http:HttpClient) {
  }
  goodsData;
  ionViewWillEnter(){
    this.http.post('/api/goods/Typeparent',{"type":'甩卖'}).subscribe(data=>{
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
