import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, App } from 'ionic-angular';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { RegistPage } from '../regist/regist';
import { ForgetpwdPage } from '../forgetpwd/forgetpwd';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private http:HttpClient,public app:App,public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  phone; //用户输入的手机号
  password; //用户输入的密码
  userID; //用户的ID

  login(){
    if(this.phone==undefined || this.password==undefined){
      const alert3= this.alertCtrl.create({
        title: '登录失败',
        message: '请输入完整的登录信息',
        buttons: ['确定']
      });
      alert3.present();
    }else if(this.phone.toString().length!=11){
      const alert4= this.alertCtrl.create({
        title: '登录失败',
        message: '请输入正确的手机号信息',
        buttons: ['确定']
      });
      alert4.present();
    }else{
      this.http.post('/api/login',{"phone":this.phone,"pwd":this.password}).subscribe(data=>{
        if(data['status']==1){ //手机号未被注册
          const alert1= this.alertCtrl.create({
            title: '登录失败',
            message: '该手机号还未被注册',
            buttons: ['确定']
          });
          alert1.present();
          this.phone='';
          this.password='';     
        }
        if(data['status']==2){ //密码正确
          console.log('密码正确');
          this.userID=data['id'];
          localStorage.setItem("userID",this.userID); //设置本地存储 将登陆的用户ID存起来
          this.app.getRootNavs()[0].setRoot(TabsPage);
        }
        if(data['status']==3){ //密码错误
          const alert2= this.alertCtrl.create({
            title: '登录失败',
            message: '密码输入错误',
            buttons: ['确定']
          });
          alert2.present();
          // this.phone='';
          this.password='';     
        }
      });
    }
  }

  forgetPwd(){
    this.navCtrl.push(ForgetpwdPage);
  }

  regist(){
    this.navCtrl.push(RegistPage);
  }
}
