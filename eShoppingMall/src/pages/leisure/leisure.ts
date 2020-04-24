import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { GoodsPage } from '../goods/goods';

/**
 * Generated class for the LeisurePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-leisure',
  templateUrl: 'leisure.html',
})
export class LeisurePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private http:HttpClient) {
  }
  goodsData;
  ionViewWillEnter() {
    this.http.post('/api/goods/Typeparent',{"type":'家居服'}).subscribe(data=>{
      this.goodsData=Array.prototype.slice.call(data);
      // console.log(this.goodsData);
    });
  }
  isActive=1;
  isClick(i){
    this.isActive=i;
    if(this.isActive==1){
      this.http.post('/api/goods/Typeparent',{"type":'家居服'}).subscribe(data=>{
        this.goodsData=Array.prototype.slice.call(data);
      });
    }
    if(this.isActive==2){
      this.http.post('/api/goods/Typechild',{"type":'保暖'}).subscribe(data=>{
        this.goodsData=Array.prototype.slice.call(data);
      });
    }
    if(this.isActive==3){
      this.http.post('/api/goods/Typechild',{"type":'薄款'}).subscribe(data=>{
        this.goodsData=Array.prototype.slice.call(data);
      });
    }
    if(this.isActive==4){
      this.http.post('/api/goods/Typechild',{"type":'婴童服'}).subscribe(data=>{
        this.goodsData=Array.prototype.slice.call(data);
      });
    }
    if(this.isActive==5){
      this.http.post('/api/goods/Typechild',{"type":'家居拖鞋'}).subscribe(data=>{
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
