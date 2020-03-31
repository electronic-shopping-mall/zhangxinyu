import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {HttpClient,HttpHeaders} from '@angular/common/http';

/**
 * Generated class for the Resetpwd2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-resetpwd2',
  templateUrl: 'resetpwd2.html',
})
export class Resetpwd2Page {

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,private http:HttpClient) {
  }
  userID;
  pwd; 
  againpwd;
  phone;
  ionViewDidLoad() {
    this.userID=localStorage.getItem("userID")
    console.log('ionViewDidLoad Regist2Page');
  }
  sure(){
    if(this.pwd==undefined || this.againpwd==undefined){
      const alert =this.alertCtrl.create({
        title: '密码信息不能为空',
        message: '   ',
        buttons: ['取消','确认']
      });
      alert.present();
    }else if(this.pwd.length<6 || this.pwd.length>16){
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
      this.http.post('/api/resetpwd',{"password":this.pwd,"userID":this.userID}).subscribe(data=>{
        if(data['status']==1){
          const alert3 =this.alertCtrl.create({
            title: '密码修改成功',
            message: '   ',
            buttons: [
              {
                text: '取消',
              }, {
                text: '完成',
                handler: () => {
                  this.navCtrl.popToRoot();
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
