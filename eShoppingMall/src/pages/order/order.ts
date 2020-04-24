import { Component } from '@angular/core';
import { NavController, NavParams, Footer,AlertController,App } from 'ionic-angular';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { OrderdetailPage } from '../orderdetail/orderdetail';
import { CommentPage } from '../comment/comment';
import { ContactPage } from '../contact/contact';
import { TabsPage } from '../tabs/tabs';
import { TopupPage } from '../topup/topup';

/**
 * Generated class for the OrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {

  constructor(public navCtrl: NavController,public app:App,public navParams: NavParams,private http:HttpClient,public alertCtrl: AlertController) {
  }
  isActive=1; //默认请求全部订单
  show;
  userID;  //用户的ID
  orderData; //用户所有的订单信息  一个订单号对应多个商品
  orderNumberArray=[]; //订单号数组（去重之后）
  orderNumberData; //根据每个订单号返回的订单信息
  finishData=[]; //最终要呈现在页面的订单信息
  infoData;
  userBalance; //用户的账户余额

  ionViewWillEnter(){
    this.userID=localStorage.getItem("userID");
    this.isActive=1;
    this.orderNumberArray=[];
    this.finishData=[];
    this.http.post('/api/order',{"userID":this.userID}).subscribe(data=>{
      this.orderData=Array.prototype.slice.call(data);
      if(this.orderData.length==0){
        this.show=1;
      }else{
        this.show=2;
        var temp=[];
        // console.log("orderData init",this.orderData);
        for(var i=0;i<this.orderData.length;i++){
          temp.push(this.orderData[i].orderNumber);
        }
        this.orderNumberArray=this.delDuplicate(temp);
        // console.log("orderNumberArray",this.orderNumberArray);
        for(var k=0;k<this.orderNumberArray.length;k++){
          for(var m=0;m<this.orderData.length;m++){
            if(this.orderData[m].orderNumber==this.orderNumberArray[k]){
              var obj={
                "orderNumber":this.orderData[m].orderNumber,
                "orderStatus":this.orderData[m].orderStatus,
                "createTime":this.orderData[m].createTime
              }
              this.finishData.push(obj);
            }
          }
        }
        this.finishData=this.deteleObject(this.finishData);
  
        var i=0;
        do{
          this.getData(i);
          i++;
        }while(i!=this.orderNumberArray.length);
        console.log("finishData",this.finishData);
      }
    });
    this.http.post('/api/userinfo',{"userID":this.userID}).subscribe(data=>{
      this.infoData=Array.prototype.slice.call(data);
      this.userBalance=this.infoData[0].userBalance
    })
  }
  
  isClick(i){
    this.isActive=i;
    // console.log(this.isActive)
    this.qiehuan(this.isActive);
  }

  //顶部导航栏切换
  qiehuan(isActive){
    if(isActive==1){
      this.orderNumberArray=[];
      this.finishData=[];
      this.http.post('/api/order',{"userID":this.userID}).subscribe(data=>{
        this.orderData=Array.prototype.slice.call(data);
        if(this.orderData.length==0){
          this.show=1;
        }else{
          this.show=2;
          var temp=[];
          for(var i=0;i<this.orderData.length;i++){
            temp.push(this.orderData[i].orderNumber);
          }
          this.orderNumberArray=this.delDuplicate(temp);
          for(var k=0;k<this.orderNumberArray.length;k++){
            for(var m=0;m<this.orderData.length;m++){
              if(this.orderData[m].orderNumber==this.orderNumberArray[k]){
                var obj={
                  "orderNumber":this.orderData[m].orderNumber,
                  "orderStatus":this.orderData[m].orderStatus,
                  "createTime":this.orderData[m].createTime
                }
                this.finishData.push(obj);
              }
            }
          }
          this.finishData=this.deteleObject(this.finishData);
    
          var i=0;
          do{
            this.getData(i);
            i++;
          }while(i!=this.orderNumberArray.length);
        }
      });
    }
    if(isActive==2){
      this.orderNumberArray=[];
      this.finishData=[];
      this.http.post('/api/order/specific',{"userID":this.userID,"orderStatus":'待付款'}).subscribe(data=>{
        this.orderData=Array.prototype.slice.call(data);
        if(this.orderData.length==0){
          this.show=1;
        }else{
          this.show=2;
          var temp=[];
          for(var i=0;i<this.orderData.length;i++){
           temp.push(this.orderData[i].orderNumber);
          }
          this.orderNumberArray=this.delDuplicate(temp);
          for(var k=0;k<this.orderNumberArray.length;k++){
            for(var m=0;m<this.orderData.length;m++){
              if(this.orderData[m].orderNumber==this.orderNumberArray[k]){
                var obj={
                  "orderNumber":this.orderData[m].orderNumber,
                  "orderStatus":this.orderData[m].orderStatus,
                  "createTime":this.orderData[m].createTime
                }
                this.finishData.push(obj);
              }
            }
          }
          this.finishData=this.deteleObject(this.finishData);
    
          var i=0;
          do{
            this.getData(i);
            i++;
          }while(i!=this.orderNumberArray.length);
        }
      });
    }
    if(isActive==3){
      this.orderNumberArray=[];
      this.finishData=[];
      this.http.post('/api/order/specific',{"userID":this.userID,"orderStatus":'已付款'}).subscribe(data=>{
        this.orderData=Array.prototype.slice.call(data);
        if(this.orderData.length==0){
          this.show=1;
        }else{
          this.show=2;
          var temp=[];
          for(var i=0;i<this.orderData.length;i++){
           temp.push(this.orderData[i].orderNumber);
          }
          this.orderNumberArray=this.delDuplicate(temp);
          for(var k=0;k<this.orderNumberArray.length;k++){
            for(var m=0;m<this.orderData.length;m++){
              if(this.orderData[m].orderNumber==this.orderNumberArray[k]){
                var obj={
                  "orderNumber":this.orderData[m].orderNumber,
                  "orderStatus":this.orderData[m].orderStatus,
                  "createTime":this.orderData[m].createTime
                }
                this.finishData.push(obj);
              }
            }
          }
          this.finishData=this.deteleObject(this.finishData);
    
          var i=0;
          do{
            this.getData(i);
            i++;
          }while(i!=this.orderNumberArray.length);
        }
      });
    }
    if(isActive==4){
      this.orderNumberArray=[];
      this.finishData=[];
      this.http.post('/api/order/specific',{"userID":this.userID,"orderStatus":'已发货'}).subscribe(data=>{
        this.orderData=Array.prototype.slice.call(data);
        if(this.orderData.length==0){
          this.show=1;
        }else{
          this.show=2;
          var temp=[];
          for(var i=0;i<this.orderData.length;i++){
           temp.push(this.orderData[i].orderNumber);
          }
          this.orderNumberArray=this.delDuplicate(temp);
          for(var k=0;k<this.orderNumberArray.length;k++){
            for(var m=0;m<this.orderData.length;m++){
              if(this.orderData[m].orderNumber==this.orderNumberArray[k]){
                var obj={
                  "orderNumber":this.orderData[m].orderNumber,
                  "orderStatus":this.orderData[m].orderStatus,
                  "createTime":this.orderData[m].createTime
                }
                this.finishData.push(obj);
              }
            }
          }
          this.finishData=this.deteleObject(this.finishData);
    
          var i=0;
          do{
            this.getData(i);
            i++;
          }while(i!=this.orderNumberArray.length);
        }
      });
    }
    if(isActive==5){
      this.orderNumberArray=[];
      this.finishData=[];
      this.http.post('/api/order/specific',{"userID":this.userID,"orderStatus":'已完成'}).subscribe(data=>{
        this.orderData=Array.prototype.slice.call(data);
        if(this.orderData.length==0){
          this.show=1;
        }else{
          this.show=2;
          var temp=[];
          for(var i=0;i<this.orderData.length;i++){
           temp.push(this.orderData[i].orderNumber);
          }
          this.orderNumberArray=this.delDuplicate(temp);
          for(var k=0;k<this.orderNumberArray.length;k++){
            for(var m=0;m<this.orderData.length;m++){
              if(this.orderData[m].orderNumber==this.orderNumberArray[k]){
                var obj={
                  "orderNumber":this.orderData[m].orderNumber,
                  "orderStatus":this.orderData[m].orderStatus,
                  "createTime":this.orderData[m].createTime
                }
                this.finishData.push(obj);
              }
            }
          }
          this.finishData=this.deteleObject(this.finishData);
    
          var i=0;
          do{
            this.getData(i);
            i++;
          }while(i!=this.orderNumberArray.length);
        }
      });
    }
  }

  //去掉数组中的重复元素
  delDuplicate(array){ 
    var newArr = [];
    for(var i=0;i<array.length;i++){
        //开闭原则
        var bool = true;
        //每次都要判断新数组中是否有旧数组中的值。
        for(var j=0;j<newArr.length;j++){
            if(array[i] === newArr[j]){
                bool = false;
            }
        }
        if(bool){
            newArr[newArr.length] = array[i];
        }
    }
    return newArr;
  }

  //去掉数组中的重复对象
  deteleObject(obj) { 
    var uniques = [];
    var stringify = {};
    for (var i = 0; i < obj.length; i++) {
        var keys = Object.keys(obj[i]);
        keys.sort(function(a, b) {
            return (Number(a) - Number(b));
        });
        var str = '';
        for (var j = 0; j < keys.length; j++) {
            str += JSON.stringify(keys[j]);
            str += JSON.stringify(obj[i][keys[j]]);
        }
        if (!stringify.hasOwnProperty(str)) {
            uniques.push(obj[i]);
            stringify[str] = true;
        }
    }
    uniques = uniques;
    return uniques;
  }

  //获取每个订单号对应的所有商品
  getData(i){
    var totalNum=0;
    var totalPrice=0;
    var orderNumberTemp=this.orderNumberArray[i];
    this.http.post('/api/orderNumber',{"orderNumber":this.orderNumberArray[i],"userID":this.userID}).subscribe(data=>{
      this.orderNumberData=Array.prototype.slice.call(data);
      // console.log(this.orderNumberData);
      var k=0;
      do{
        totalNum+=this.orderNumberData[k].amount;
        totalPrice+=this.orderNumberData[k].price*this.orderNumberData[k].amount;
        this.getComment(this.orderNumberData[k].productID,orderNumberTemp,this.orderNumberData,i,k);
        k++;
      }while(k!=this.orderNumberData.length);

      this.finishData[i]["totalNum"]=totalNum;
      this.finishData[i]["totalPrice"]=totalPrice;
    }); 
  }

  commentData;
  // commentTemp=[];
  //查看某订单下对应的商品是否被评价过 
  getComment(pID,oNumber,orderNumberData,i,k){
    console.log(pID,oNumber,i,k);
    console.log(orderNumberData);
    this.http.post('/api/comment/specific',{"userID":this.userID,"productID":pID,"orderNumber":oNumber}).subscribe(data=>{
      this.commentData=Array.prototype.slice.call(data);
      // console.log(this.commentData);
      // console.log(this.orderNumberData);
      if(this.commentData.length!=0){
        orderNumberData[k]['isComment']=1;
      }else{
        orderNumberData[k]['isComment']=0;
      }
      this.finishData[i]["productArray"]=orderNumberData;
    })
  }

  //查看订单详情
  goDetail(orderNumber){ 
    localStorage.setItem("orderNumber",orderNumber);
    this.navCtrl.push(OrderdetailPage);
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
  cancelOrder(orderNumber,productArray){  
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
            for(var i=0;i<productArray.length;i++){
              this.http.post('/api/cancelOrder',{"orderNumber":orderNumber,"productID":productArray[i].productID,"amount":productArray[i].amount,"type":productArray[i].type}).subscribe(data=>{
                if(data['status']==1){
                  this.IsShowDialogTwo=true;   
                  this.IsShowCover = true;
                  var that=this;
                  setTimeout(function(){
                    if (that.IsShowDialogTwo) {
                      that.IsShowDialogTwo = false;
                      that.IsShowCover = false;
                    }
                    that.qiehuan(that.isActive);
                  },1000);
                }
              });
            }
          }
        }
      ]
    });
    alert.present();
  }

  //支付
  pay(orderNumber,totalPrice){
    // console.log(totalPrice,this.userBalance);
    var restMoney=this.userBalance-totalPrice; 
    var currentdate=this.getDate();
    console.log(restMoney,currentdate);
    if(totalPrice<=this.userBalance){
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
                    that.qiehuan(that.isActive);
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
            text: '确定',
            handler: () => {
              this.qiehuan(this.isActive);
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
                this.qiehuan(this.isActive);
              }
            });
          }
        }
      ]
    });
    alert.present();
  }
  
  goBack(){
    this.navCtrl.popToRoot();
  }
}
