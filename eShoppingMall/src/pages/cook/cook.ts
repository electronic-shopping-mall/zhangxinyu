import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { GoodsPage } from '../goods/goods';

/**
 * Generated class for the CookPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-cook',
  templateUrl: 'cook.html',
})
export class CookPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private http:HttpClient) {
  }
  goodsData;
  ionViewWillEnter() {
    this.http.post('/api/goods/Typeparent',{"type":'下厨'}).subscribe(data=>{
      this.goodsData=Array.prototype.slice.call(data);
      // console.log(this.goodsData);
    });
  }
  isActive=1;
  isClick(i){
    this.isActive=i;
    if(this.isActive==1){
      this.http.post('/api/goods/Typeparent',{"type":'下厨'}).subscribe(data=>{
        this.goodsData=Array.prototype.slice.call(data);
      });
    }
    if(this.isActive==2){
      this.http.post('/api/goods/Typechild',{"type":'锅具'}).subscribe(data=>{
        this.goodsData=Array.prototype.slice.call(data);
      });
    }
    if(this.isActive==3){
      this.http.post('/api/goods/Typechild',{"type":'厨房电器'}).subscribe(data=>{
        this.goodsData=Array.prototype.slice.call(data);
      });
    }
    if(this.isActive==4){
      this.http.post('/api/goods/Typechild',{"type":'餐具'}).subscribe(data=>{
        this.goodsData=Array.prototype.slice.call(data);
      });
    }
    if(this.isActive==5){
      this.http.post('/api/goods/Typechild',{"type":'水杯水壶'}).subscribe(data=>{
        this.goodsData=Array.prototype.slice.call(data);
      });
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
