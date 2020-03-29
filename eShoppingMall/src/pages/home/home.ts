import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SearchPage } from '../search/search';
import { GoodsPage } from '../goods/goods';
import { ShowerPage } from '../shower/shower';
import { FurniturePage } from '../furniture/furniture';
import { LeisurePage } from '../leisure/leisure';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { NewPage } from '../new/new';
import { HotPage } from '../hot/hot';
import { BedPage } from '../bed/bed';
import { CookPage } from '../cook/cook';
import { HouseworkPage } from '../housework/housework';
import { CommodityPage } from '../commodity/commodity';
import { SalePage } from '../sale/sale';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,private http:HttpClient) {

  }

  goodsDatah;
  ionViewDidLoad(){
    this.http.post('/api/home',{}).subscribe(data=>{
      this.goodsDatah=Array.prototype.slice.call(data);
    });
  }
  goSearch(){
    this.navCtrl.push(SearchPage);
  }
  goGoods(id){
    localStorage.setItem('productID',id);
    this.navCtrl.push(GoodsPage);
  }
  goNew(){
    this.navCtrl.push(NewPage);
  }
  goHot(){
    this.navCtrl.push(HotPage);
  }
  goShower(){
    this.navCtrl.push(ShowerPage);
  }
  goFurniture(){
    this.navCtrl.push(FurniturePage);
  }
  goLeisure(){
    this.navCtrl.push(LeisurePage);
  }
  goBed(){
    this.navCtrl.push(BedPage);
  }
  goCook(){
    this.navCtrl.push(CookPage);
  }
  goHousework(){
    this.navCtrl.push(HouseworkPage);
  }
  goCommodity(){
    this.navCtrl.push(CommodityPage);
  }
  goSale(){
    this.navCtrl.push(SalePage);
  }
}
