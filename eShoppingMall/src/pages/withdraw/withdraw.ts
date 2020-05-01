import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { BankcardManagePage } from '../bankcard-manage/bankcard-manage';
import {HttpClient,HttpHeaders} from '@angular/common/http';

/**
 * Generated class for the WithdrawPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-withdraw',
  templateUrl: 'withdraw.html',
})
export class WithdrawPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private http:HttpClient,public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WithdrawPage');
  }
  userID;
  userBalance;
  chooseBankCardData;//银行卡选择页面返回的用户选择的银行卡信息
  bankcard='请选择银行卡'; //用户选择的银行卡信息
  cardnumber;
  ionViewWillEnter() {
    this.userID=localStorage.getItem("userID");
    this.chooseBankCardData=this.navParams.get('chooseBankCardData');
    if(this.chooseBankCardData!=undefined){
      this.cardnumber=this.chooseBankCardData[0].cardnumber.replace(/\s/g, "");
      this.cardnumber=this.cardnumber.substring(this.cardnumber.length-4);
      this.bankcard=this.chooseBankCardData[0].bankname+'（'+this.cardnumber+'）';
      console.log(this.cardnumber);
    }
    this.http.post('/api/userinfo',{"userID":this.userID}).subscribe(data=>{
      this.userBalance=Array.prototype.slice.call(data)[0].userBalance;
    });
  }
  getfocus(){
    var inp=document.getElementById("inp");
    console.log(inp);
    inp.focus();
  }
  //控制弹窗的参数信息
  IsShowDialogTwo: boolean = false;
  IsShowCover: boolean = false;
  money;
  sure(){
    console.log(this.money);
    if(this.chooseBankCardData==undefined){
      const alert1= this.alertCtrl.create({
        title: '请选择银行卡',
        message: '',
        buttons: ['确定']
      });
      alert1.present();
    }
    else if(this.money==undefined){
      const alert2= this.alertCtrl.create({
        title: '请输入充值金额',
        message: '',
        buttons: ['确定']
      });
      alert2.present();
    }
    else{
      var endMoney=this.userBalance-this.money;
      this.http.post('/api/topup',{"userID":this.userID,"money":endMoney}).subscribe(data=>{
        if(data['status']==1){
          this.IsShowDialogTwo=true;   
          this.IsShowCover = true;
          var that=this;
          setTimeout(function(){
            if (that.IsShowDialogTwo) {
              that.IsShowDialogTwo = false;
              that.IsShowCover = false;
            }
            that.navCtrl.pop();
          },1000);
        }
      });
    }
  }
  goBack(){
    this.navCtrl.pop();
  }
  chooseBankCard(){
    localStorage.setItem("isChooseBankCard",'1');
    this.navCtrl.push(BankcardManagePage);
  }
}
