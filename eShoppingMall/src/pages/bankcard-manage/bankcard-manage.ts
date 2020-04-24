import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { AddbankcardPage } from '../addbankcard/addbankcard';
import {HttpClient,HttpHeaders} from '@angular/common/http';

/**
 * Generated class for the BankcardManagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bankcard-manage',
  templateUrl: 'bankcard-manage.html',
})
export class BankcardManagePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private http:HttpClient,public actionSheetCtrl: ActionSheetController) {
  }

  userID;
  cardData;
  isChooseBankCard;
  chooseBankCardData;
  ionViewWillEnter() {
    this.userID=localStorage.getItem("userID");
    this.isChooseBankCard=localStorage.getItem("isChooseBankCard");
    this.http.post('/api/bankcard',{"userID":this.userID}).subscribe(data=>{
      this.cardData=Array.prototype.slice.call(data);
      console.log(this.cardData);
    })
  }
  goBack(){
    this.navCtrl.pop();
  }
  goAdd(){
    this.navCtrl.push(AddbankcardPage);
  }
  presentActionSheet(id) {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [{
        text: '解除绑定',
        role: 'remove',
        handler: () => {
          this.http.post('/api/delete/bankcard',{"bankcardID":id,"userID":this.userID}).subscribe(data=>{
            this.cardData=Array.prototype.slice.call(data);
          });
        }
      },{
        text: '取消',
        role: 'cancel',
        handler: () => {
          console.log("cancel");
        }
      }]
    });
    if(this.isChooseBankCard=='0'){
      actionSheet.present();
    }else{
      this.http.post('/api/specific/bankcard',{"userID":this.userID,"bankcardID":id}).subscribe(data=>{
        this.chooseBankCardData=Array.prototype.slice.call(data);
        console.log(this.chooseBankCardData);
        this.navCtrl.getPrevious().data.chooseBankCardData = this.chooseBankCardData;
        this.navCtrl.pop();
      });
    }
  }
}
