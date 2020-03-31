import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BankcardManagePage } from '../bankcard-manage/bankcard-manage';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { TopupPage } from '../topup/topup';

/**
 * Generated class for the WalletPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-wallet',
  templateUrl: 'wallet.html',
})
export class WalletPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private http:HttpClient) {
  }

  userID;
  userBalance;
  infoData;
  ionViewWillEnter() {
    console.log('ionViewDidLoad WalletPage');
    this.userID=localStorage.getItem("userID");
    this.http.post('/api/userinfo',{"userID":this.userID}).subscribe(data=>{
      this.infoData=Array.prototype.slice.call(data);
      this.userBalance=this.infoData[0].userBalance;
    })
  }
  goBack(){
    this.navCtrl.pop();
  }
  goBank(){
    localStorage.setItem("isChooseBankCard","0");
    this.navCtrl.push(BankcardManagePage);
  }
  addMoney(){
    this.navCtrl.push(TopupPage);
  }
}
