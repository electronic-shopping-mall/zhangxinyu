import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SetPage } from '../set/set';
import { InfoPage } from '../info/info';
import { AddressPage } from '../address/address';
import { OrderPage } from '../order/order';
import { WalletPage } from '../wallet/wallet';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { MycommentPage } from '../mycomment/mycomment';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(public navCtrl: NavController,private http:HttpClient) {

  }
  userID;
  userBalance; //用户的账户余额
  infoData;  //后台返回的用户信息
  headImg; //用户头像
  userName; //用户昵称
  ionViewWillEnter() {
    console.log('ionViewDidLoad SetPage');
    this.userID=localStorage.getItem("userID");
    console.log('ionViewDidLoad InfoPage');
    this.http.post('/api/userinfo',{"userID":this.userID}).subscribe(data=>{
      this.infoData=Array.prototype.slice.call(data);
      this.userBalance=this.infoData[0].userBalance
      this.headImg=this.infoData[0].picture;
      this.userName=this.infoData[0].userName;
    })
  }
  goOrder(){
    this.navCtrl.push(OrderPage);
  }
  goWallet(){
    this.navCtrl.push(WalletPage);
  }
  goSet(){
    this.navCtrl.push(SetPage);
  }
  goComment(){
    this.navCtrl.push(MycommentPage)
  }
  goInfo(){
    this.navCtrl.push(InfoPage);
  }
  goAddress(){
    localStorage.setItem("isChooseAddress",'0');  //设置本地存储 0表示是从用户中心页面进入收货地址页 1表示从购买页面进入收货地址页
    this.navCtrl.push(AddressPage);
  }
}
