import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { GoodsPage } from '../goods/goods';

/**
 * Generated class for the FurniturePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-furniture',
  templateUrl: 'furniture.html',
})
export class FurniturePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private http:HttpClient) {
  }
  isActive=1;
  isClick(i){
    this.isActive=i;
    if(this.isActive==1){
      this.http.post('/api/goods/Typeparent',{"type":'家具'}).subscribe(data=>{
        this.goodsData=Array.prototype.slice.call(data);
      });
    }
    if(this.isActive==2){
      this.http.post('/api/goods/Typechild',{"type":'沙发'}).subscribe(data=>{
        this.goodsData=Array.prototype.slice.call(data);
      });
    }
    if(this.isActive==3){
      this.http.post('/api/goods/Typechild',{"type":'餐桌椅'}).subscribe(data=>{
        this.goodsData=Array.prototype.slice.call(data);
      });
    }
    if(this.isActive==4){
      this.http.post('/api/goods/Typechild',{"type":'床和席梦思'}).subscribe(data=>{
        this.goodsData=Array.prototype.slice.call(data);
      });
    }
    if(this.isActive==5){
      this.http.post('/api/goods/Typechild',{"type":'休闲椅'}).subscribe(data=>{
        this.goodsData=Array.prototype.slice.call(data);
      });
    }
  }
  goodsData;
  ionViewWillEnter() {
    this.http.post('/api/goods/Typeparent',{"type":'家具'}).subscribe(data=>{
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
