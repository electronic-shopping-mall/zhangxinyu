import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpClient,HttpHeaders} from '@angular/common/http';

/**
 * Generated class for the AddbankcardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addbankcard',
  templateUrl: 'addbankcard.html',
})
export class AddbankcardPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private http:HttpClient) {
  }

  userID;
  show=1;
  bankname;
  cardholder;
  cardnumber;
  ionViewDidLoad() {
    this.userID=localStorage.getItem("userID");
    console.log('ionViewDidLoad AddbankcardPage');
  }
  goBack(){
    this.navCtrl.pop();
  }
  sure(){
    this.http.post('/api/add/bankcard',{"userID":this.userID,"bankname":this.bankname,"cardholder":this.cardholder,"cardnumber":this.cardnumber}).subscribe(data=>{
      if(data["status"]==1){
        console.log('插入成功');
        this.navCtrl.getPrevious().data.addBankCardData = [this.bankname,this.cardnumber];
        this.navCtrl.pop();
      }
    });
  }
}
