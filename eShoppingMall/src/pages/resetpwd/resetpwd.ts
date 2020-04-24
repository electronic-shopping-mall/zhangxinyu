import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Resetpwd2Page } from '../resetpwd2/resetpwd2';

/**
 * Generated class for the ResetpwdPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-resetpwd',
  templateUrl: 'resetpwd.html',
})
export class ResetpwdPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,private http:HttpClient) {
  }
  userID;
  pwd;//请求到的用户密码信息
  oldpwd;  //用户输入的旧密码
  infoData;
  ionViewDidLoad() {
    this.userID=localStorage.getItem("userID");
    this.http.post('/api/userinfo',{"userID":this.userID}).subscribe(data=>{
      this.infoData=Array.prototype.slice.call(data);
      console.log(this.infoData);
      this.pwd=this.infoData[0].password;
    })
  }
  next(){
    if(this.oldpwd==undefined){
      const alert1 =this.alertCtrl.create({
        title: '密码信息不能为空',
        message: '   ',
        buttons: ['取消','确认']
      });
      alert1.present();
    }else{
      if(this.oldpwd==this.pwd){
        this.navCtrl.push(Resetpwd2Page);
      }else{
        const alert2 =this.alertCtrl.create({
          title: '原始密码输入错误',
          message: '   ',
          buttons: ['取消','确认']
        });
        alert2.present();
      }
    }
  }
  goBack(){
    this.navCtrl.pop();
  }
}
