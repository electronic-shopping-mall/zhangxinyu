import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { TopupPage } from '../topup/topup';
import { CommentPage } from '../comment/comment';

/**
 * Generated class for the OrderdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-orderdetail',
  templateUrl: 'orderdetail.html',
})
export class OrderdetailPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private http:HttpClient,public alertCtrl: AlertController) {
  }

  userID;
  orderNumber;//订单编号
  orderStatus; //订单状态
  orderData;  //订单信息
  name;  //收货人姓名
  phone; //收货人手机号
  address; //收货地址
  totalPrice=0; //订单总价 
  totalNum=0; //订单总数
  infoData;
  userBalance;
  
  minute;
  second;
  createTime; //订单创建时间
  ionViewWillEnter() {
    this.userID=localStorage.getItem('userID');
    this.orderNumber=localStorage.getItem("orderNumber");
    this.http.post('/api/userinfo',{"userID":this.userID}).subscribe(data=>{
      this.infoData=Array.prototype.slice.call(data);
      this.userBalance=this.infoData[0].userBalance
    })
    // console.log(this.orderNumber);
    this.http.post('/api/order/detail',{"orderNumber":this.orderNumber}).subscribe(data=>{
      this.orderData=Array.prototype.slice.call(data);
      console.log(this.orderData);
      this.totalNum=0;
      this.totalPrice=0;
      for(var j=0;j<this.orderData.length;j++){
        this.totalNum+=this.orderData[j].amount;
        this.totalPrice+=this.orderData[j].price*this.orderData[j].amount;
      }
      this.name=this.orderData[0].address.split(',')[0];
      this.phone=this.orderData[0].address.split(',')[1];
      this.address=this.orderData[0].address.split(',')[2];
      this.orderStatus=this.orderData[0].orderStatus;    
      this.createTime=this.orderData[0].createTime;
      // console.log(this.address);
      // console.log(this.orderData);
      for(var i=0;i<this.orderData.length;i++){
        this.getComment(i);
      }
    });

    var timestamp2=new Date().getTime();
    var second = parseInt((timestamp2-this.orderNumber) / 1000+'');
    // console.log(second);
    if(second<1800){
      var time=1800-second;//30分钟换算成1800秒
      var that=this;
      var timer=setInterval(function(){
        time=time-1;
        if(time==0){  //取消倒计时  删除相关订单 对应商品库存加1 已售减1
          console.log('hhh');
          clearInterval(timer);
          for(var i=0;i<that.orderData.length;i++){
            that.http.post('/api/cancelOrder',{"orderNumber":that.orderNumber,"productID":that.orderData[i].productID,"amount":that.orderData[i].amount,"type":that.orderData[i].type}).subscribe(data=>{
            });
          }
          that.navCtrl.pop();
        }
        that.minute=parseInt(time/60+'');
        that.second=parseInt(time%60+'');
      },1000);
    }
  }

  commentData;
  getComment(i){
    this.http.post('/api/comment/specific',{"userID":this.userID,"productID":this.orderData[i].productID,"orderNumber":this.orderData[i].orderNumber}).subscribe(data=>{
      this.commentData=Array.prototype.slice.call(data);
      if(this.commentData.length!=0){
        this.orderData[i]['isComment']=1;
      }else{
        this.orderData[i]['isComment']=0;
      }
    })
  }

  //评论
  comment(productID,orderNumber){
    // console.log(orderNumber);
    this.navCtrl.push(CommentPage,{
      "productID":productID,
      "orderNumber":orderNumber
    });
  }

  IsShowDialogOne: boolean = false;
  IsShowDialogTwo: boolean = false;
  IsShowCover: boolean = false;
  //取消订单
  cancelOrder(orderNumber,orderData){
    const alert =this.alertCtrl.create({
      title: '确定取消该订单吗？',
      message: '   ',
      buttons: [
        {
          text: '取消',
          cssClass: 'secondary',
          // handler: (blash) => {
          //   console.log('Confirm Cancel: blah',blash);
          // }
        }, {
          text: '确认',
          handler: () => {
            console.log('Confirm Okay');
            for(var i=0;i<orderData.length;i++){
              this.http.post('/api/cancelOrder',{"orderNumber":orderNumber,"productID":orderData[i].productID,"amount":orderData[i].amount,"type":orderData[i].type}).subscribe(data=>{

              });
            }
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
        }
      ]
    });
    alert.present();
  }

  //支付
  pay(orderNumber){
    console.log(orderNumber,this.totalPrice);
    var restMoney=this.userBalance-this.totalPrice; 
    var currentdate=this.getDate();
    if(this.totalPrice<=this.userBalance){
      const alert1 =this.alertCtrl.create({
        title: '确定支付吗？',
        message: '   ',
        buttons: [
          {
            text: '取消',
            cssClass: 'secondary',
            // handler: (blash) => {
            //   console.log('Confirm Cancel: blah',blash);
            // }
          }, {
            text: '确认',
            handler: () => {
              // console.log('Confirm Okay');
              this.http.post('/api/pay',{"userID":this.userID,"orderNumber":orderNumber,"restMoney":restMoney,"time":currentdate}).subscribe(data=>{
                if(data['status']==1){
                  this.IsShowDialogOne=true;   
                  this.IsShowCover = true;
                  var that=this;
                  setTimeout(function(){
                    if (that.IsShowDialogOne) {
                      that.IsShowDialogOne = false;
                      that.IsShowCover = false;
                    }
                    that.navCtrl.pop();
                  },1000);
                }
              });
            }
          }
        ]
      });
      alert1.present();
    }else{
      const alert2 =this.alertCtrl.create({
        title: '账户余额不足，请及时充值',
        message: '   ',
        buttons: [
          {
            text: '取消',
            cssClass: 'secondary',
            // handler: (blash) => {
            //   console.log('Confirm Cancel: blah',blash);
            // }
          }, {
            text: '立即充值',
            handler: () => {
              this.navCtrl.push(TopupPage); //前往充值页面
            }
          }
        ]
      });
      alert2.present();
    }
  }

  month;
  strdate;
  hour;
  minutes;
  seconds;
  getDate(){   //获取当前时间函数
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    this.month = date.getMonth() + 1;
    this.strdate = date.getDate();
    this.hour= date.getHours();
    this.minutes=date.getMinutes();
    this.seconds=date.getSeconds();
    if (this.month >= 1 && this.month <= 9) {
        this.month = "0" + this.month;
    }
    if (this.strdate >= 0 && this.strdate <= 9) {
        this.strdate = "0" + this.strdate;
    }
    if (this.hour >= 0 && this.hour <= 9) {
      this.hour = "0" + this.hour;
    }
    if (this.minutes >= 0 && this.minutes <= 9) {
      this.minutes = "0" + this.minutes;
    }
    if(this.seconds>=0 && this.seconds<=9){
      this.seconds="0"+this.seconds;
    }
    var currentdate = date.getFullYear() + seperator1 + this.month + seperator1 + this.strdate
            + " " + this.hour+ seperator2 + this.minutes + seperator2 + this.seconds;
    return currentdate;
  }

  //确认收货
  gain(orderNumber){
    const alert=this.alertCtrl.create({
      title: '确定已经收到商品？',
      message: '   ',
      buttons: [
        {
          text: '取消',
          cssClass: 'secondary',
          // handler: (blash) => {
          //   console.log('Confirm Cancel: blah',blash);
          // }
        }, {
          text: '确定',
          handler: () => {
            this.http.post('/api/gain',{"orderNumber":orderNumber}).subscribe(data=>{
              if(data['status']==1){
                this.navCtrl.pop();
              }
            });
          }
        }
      ]
    });
    alert.present();
  }
  goBack(){
    this.navCtrl.pop();
  }
}
