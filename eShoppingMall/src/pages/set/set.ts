import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,App,AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { ResetpwdPage } from '../resetpwd/resetpwd';

/**
 * Generated class for the SetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-set',
  templateUrl: 'set.html',
})
export class SetPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public app:App,private http:HttpClient,public alertCtrl: AlertController) {
  }
  ionViewDidLoad() {
  }
  logOut(){
    const alert1 =this.alertCtrl.create({
      title: '确定退出登录吗',
      message: '   ',
      buttons: [
        {
          text: '取消',
          cssClass: 'secondary',
          // handler: (blash) => {
          //   console.log('Confirm Cancel: blah',blash);
          // }
        }, {
          text: '退出登录',
          handler: () => {
            this.app.getRootNavs()[0].setRoot(LoginPage);
          }
        }
      ]
    });
    alert1.present();
  }
  goReset(){
    this.navCtrl.push(ResetpwdPage);
  }
  goBack(){
    this.navCtrl.pop();
  }
}
