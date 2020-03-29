import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { GoodsPage } from '../goods/goods';

/**
 * Generated class for the HouseworkPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-housework',
  templateUrl: 'housework.html',
})
export class HouseworkPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private http:HttpClient) {
  }
  goodsData;
  ionViewWillEnter() {
    this.http.post('/api/goods/Typeparent',{"type":'家务'}).subscribe(data=>{
      this.goodsData=Array.prototype.slice.call(data);
      // console.log(this.goodsData);
    });
  }
  isActive=1;
  isClick(i){
    this.isActive=i;
    if(this.isActive==1){
      this.http.post('/api/goods/Typeparent',{"type":'家务'}).subscribe(data=>{
        this.goodsData=Array.prototype.slice.call(data);
      });
    }
    if(this.isActive==2){
      this.http.post('/api/goods/Typechild',{"type":'洗衣液'}).subscribe(data=>{
        this.goodsData=Array.prototype.slice.call(data);
      });
    }
    if(this.isActive==3){
      this.http.post('/api/goods/Typechild',{"type":'家务工具'}).subscribe(data=>{
        this.goodsData=Array.prototype.slice.call(data);
      });
    }
    if(this.isActive==4){
      this.http.post('/api/goods/Typechild',{"type":'储物收纳'}).subscribe(data=>{
        this.goodsData=Array.prototype.slice.call(data);
      });
    }
    if(this.isActive==5){
      this.http.post('/api/goods/Typechild',{"type":'清洁剂'}).subscribe(data=>{
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
