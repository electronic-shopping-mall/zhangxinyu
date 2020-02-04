import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { LoginPage } from '../login/login';
/**
 * Generated class for the RegistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-regist',
  templateUrl: 'regist.html',
})
export class RegistPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private http:HttpClient,public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistPage');
  }
  phone; //双向数据绑定 用户输入的手机号信息
  pwd;  //双向数据绑定 用户输入的密码信息
  arr; //从后端返回的关于注册是否成功的信息 

  //控制弹窗的参数信息
  IsShowTwoBtnDialog: boolean = false;
  IsShowCover: boolean = false;

  gainCode(){  //获取验证码函数
    var div=document.getElementById('codeShow');
    var num=Math.floor(Math.random()*20+1);
    div.style.backgroundImage='url(../assets/imgs/codebackimg/back'+num+'.png)';//设置验证码的背景图片
    div.style.display='block';
    var val=document.getElementById('gaincode'); //获取按钮
    var countdown=30;
    val.setAttribute("disabled", "true"); //不能点击
    val.innerHTML=countdown + "s后<br>重新发送";
    countdown--;
    var timer=setInterval(function(){ //倒计时
      if (countdown == 0) {
        val.innerHTML="获取验证码";
        countdown = 30;
        clearInterval(timer);
        val.removeAttribute("disabled");  //可点击
      } else {
        val.setAttribute("disabled", "true"); //不能点击
        val.innerHTML=countdown + "s后<br>重新发送";
        countdown--;
      }
    },1000);

    var seed = new Array(
      'abcdefghijklmnopqrstuvwxyz',
      'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      '0123456789'
    ); //创建需要的数据数组
    var idx;
    var result = ''; //返回的结果变量
    for (var i=0; i<6; i++){
      idx = Math.floor(Math.random()*3); //获得随机数据的整数部分-获取一个随机整数
      result += seed[idx].substr(Math.floor(Math.random()*(seed[idx].length)), 1);//根据随机数获取数据中一个值
    }
    div.innerHTML=result;
  }

  regist(){
  //   this.http.post('/api/register',{phone:this.phone,pwd:this.pwd}).subscribe(data=>{
  //     this.arr=data;
  //     if(this.arr.status==1){
  //       const alert1 = this.alertCtrl.create({
  //         title: '注册成功',
  //         subTitle: '该手机号已被注册',
  //         buttons: ['OK']
  //       });
  //       alert1.present();
  //     }
  //   });
  //显示弹窗
  this.IsShowTwoBtnDialog = true;
  this.IsShowCover = true;
  }
 
  TwoBtnCancel() {
    this.IsShowTwoBtnDialog = false;
    this.IsShowCover = false;
  }
 
  TwoBtnSure(){
    this.IsShowTwoBtnDialog = false;
    this.IsShowCover = false;
    this.navCtrl.push(LoginPage);
  }
 
  CloseDialog() {
    if (this.IsShowTwoBtnDialog) {
      this.IsShowTwoBtnDialog = false;
      this.IsShowCover = false;
    }
  }

}
