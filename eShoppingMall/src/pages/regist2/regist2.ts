import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController ,App} from 'ionic-angular';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { LoginPage } from '../login/login';

/**
 * Generated class for the Regist2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-regist2',
  templateUrl: 'regist2.html',
})
export class Regist2Page {

  constructor(public app:App,public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,private http:HttpClient) {
    this.phone= navParams.get('phone');
  }

  pwd;
  againpwd;
  phone;
  ionViewDidLoad() {
    console.log('ionViewDidLoad Regist2Page');
  }
  regist(){
    if(this.pwd.length<6 || this.pwd.length>16){
      const alert1 =this.alertCtrl.create({
        title: '请输入6-16位的密码信息',
        message: '   ',
        buttons: ['取消','确认']
      });
      alert1.present();
    }else if(this.pwd!=this.againpwd){
      const alert2 =this.alertCtrl.create({
        title: '两次密码输入不一致',
        message: '   ',
        buttons: ['取消','确认']
      });
      alert2.present();
    }else{
      this.http.post('/api/register',{"phone":this.phone,"password":this.pwd}).subscribe(data=>{
        if(data['status']==1){
          const alert3 =this.alertCtrl.create({
            title: '注册成功',
            message: '   ',
            buttons: [
              {
                text: '取消',
                cssClass: 'secondary',
                // handler: (blash) => {
                //   console.log('Confirm Cancel: blah',blash);
                // }
              }, {
                text: '立即登录',
                handler: () => {
                  this.app.getRootNavs()[0].setRoot(LoginPage);
                }
              }
            ]
          });
          alert3.present();
        }
      });
    }
  }
  goBack(){
    this.navCtrl.pop();
  }
}
