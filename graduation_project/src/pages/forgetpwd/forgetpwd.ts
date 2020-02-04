import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ForgetpwdPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgetpwd',
  templateUrl: 'forgetpwd.html',
})
export class ForgetpwdPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgetpwdPage');
  }

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
}
