import { Component } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CommentPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private http:HttpClient) {
    this.productID= navParams.get('productID');
    this.orderNumber=navParams.get('orderNumber');
  }

  userID;
  productID;
  orderNumber;
  goodData; 
  image;  //商品图片
  title //商品标题
  star=[{level:'非常差',flag:true},{level:'差',flag:true},{level:'一般',flag:true},{level:'好',flag:true},{level:'非常好',flag:true}];
  level='非常好';
  currentDate;
  content;
  ionViewDidLoad() {
    this.userID=localStorage.getItem("userID");
    this.http.post('/api/goods',{"productID":this.productID}).subscribe(data=>{
      this.goodData=Array.prototype.slice.call(data);
      this.image=this.goodData[0].images.split('|')[0];
      this.title=this.goodData[0].title;
    });

  }
  changeStar(i){
    this.level=this.star[i].level;
    for(var j=i+1;j<this.star.length;j++){
      this.star[j].flag=false;
    }
    for(var k=0;k<=i;k++){
      this.star[k].flag=true;
    }
  }
  IsShowDialogTwo: boolean = false;
  IsShowCover: boolean = false;
  publish(){
    if(this.content==undefined){
      this.content='您没有填写评价内容';
    }
    // console.log("level",this.level);
    this.currentDate=this.getDate();
    // console.log(this.currentDate);
    this.http.post('/api/add/comment',{"userID":this.userID,"productID":this.productID,'orderNumber':this.orderNumber,"content":this.content,"time":this.currentDate,"level":this.level}).subscribe(data=>{
      if(data['status']==1){
        this.IsShowDialogTwo=true;   
        this.IsShowCover = true;
        var that=this;
        setTimeout(function(){
          if (that.IsShowDialogTwo) {
            that.IsShowDialogTwo = false;
            that.IsShowCover = false;
          }
          that.navCtrl.popToRoot();
        },1000);
      }
    });
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

  goBack(){
    this.navCtrl.pop();
  }
}
