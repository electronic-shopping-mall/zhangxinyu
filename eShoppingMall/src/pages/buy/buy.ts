import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { AddressPage } from '../address/address';
import { AddAddressPage } from '../add-address/add-address';
import { TopupPage } from '../topup/topup';
import { OrderPage } from '../order/order';

/**
 * Generated class for the BuyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-buy',
  templateUrl: 'buy.html',
})
export class BuyPage {
  userID; //用户id

  choosed; //商品详情页购买时，用户选择的商品型号
  productID;  //商品详情页购买时，用户购买的商品ID
  num; //商品详情页购买时，选择的商品数量

  totalNum=0; //所有商品的总数量
  totalPrice=0; //所有商品的总价格

  idArrayStr;
  idArray; //购物车中结算时 选择的购物车中的商品
  productData=[]; //后台返回的商品信息

  addressData; //用户的地址信息
  moaddress; //用户的默认地址信息
  name; //收货人姓名
  phone; //收货人手机号
  address; //收货人地址
  show; //1表示用户收货地址不为空，自动显示用户的默认地址，如果没有默认地址，自动显示地址栏的第一个地址 2表示收货地址为空，点击店家说收货地址

  chooseAddressData;//地址选择页面返回的用户选择的地址信息
  addAddressData;//地址添加页面返回的用户添加的地址信息

  userBalance;  //用户账户余额

  constructor(public navCtrl: NavController, public navParams: NavParams,private http:HttpClient,public alertCtrl: AlertController) {
    this.choosed= navParams.get('choosed');
    this.productID=navParams.get('productID');
    this.num=navParams.get('num');
    this.idArray=navParams.get('idArray');
  }

  ionViewWillEnter(){
    this.userID=localStorage.getItem('userID');
    this.http.post('/api/userinfo',{"userID":this.userID}).subscribe(data=>{
      this.userBalance=Array.prototype.slice.call(data)[0].userBalance;
      console.log('用户账户余额',this.userBalance);
    })
    this.chooseAddressData = this.navParams.get('chooseAddressData');
    this.addAddressData=this.navParams.get('addAddressData');

    this.http.post("/api/address",{"userID":this.userID}).subscribe(data=>{
      this.addressData=Array.prototype.slice.call(data);
      // console.log(this.addressData);
      if(this.addressData.length==0){  //用户没有收获地址
        this.show=2;  
      }else{
        this.show=1;   //用户有收货地址
        if(this.chooseAddressData==undefined){ //刚跳转到订单页面 地址栏的显示 
          this.http.post("/api/address/mo",{"userID":this.userID}).subscribe(data=>{
            this.moaddress=Array.prototype.slice.call(data);
            if(this.moaddress.length==0){ //没有默认地址默认显示第一个收获地址
              this.name=this.addressData[0].name;
              this.phone=this.addressData[0].phone;
              this.address=this.addressData[0].area+' '+this.addressData[0].detail_address;
            }else{  //有默认地址，显示用户的默认地址
              this.name=this.moaddress[0].name;
              this.phone=this.moaddress[0].phone;
              this.address=this.moaddress[0].area+' '+this.moaddress[0].detail_address;
            }
          });
        }else{  //用户自己选择的收货地址
          this.name=this.chooseAddressData[0].name;
          this.phone=this.chooseAddressData[0].phone;
          this.address=this.chooseAddressData[0].area+' '+this.chooseAddressData[0].detail_address;
        }
      }
    });
  }
  ionViewDidLoad() {
    // console.log(this.choosed);
    // console.log(this.productID);
    // console.log(this.idArray);
    // console.log(this.num);
    if(this.idArray==undefined){
      this.http.post('/api/buy',{"parameter":'single',"productID":this.productID}).subscribe(data=>{
        this.productData=Array.prototype.slice.call(data);
        this.totalNum=this.num;
        this.totalPrice=this.num*this.productData[0].price;
      });
    }else{
      this.http.post('/api/buy',{"parameter":'more',"cartIDArray":this.idArray}).subscribe(data=>{
        this.productData=Array.prototype.slice.call(data);
        console.log(this.productData);
        for(var i=0;i<this.productData.length;i++){
          this.totalNum+=this.productData[i].amount;
          this.totalPrice+=this.productData[i].amount*this.productData[i].price;
        }
      })
    }
  }

  chooseAddress(){
    localStorage.setItem("isChooseAddress",'1');  //设置本地存储 0表示是从用户中心页面进入收货地址页 1表示从购买页面进入收货地址页
    this.navCtrl.push(AddressPage);
  }

  addAddress(){
    this.navCtrl.push(AddAddressPage);
  }
  //控制弹窗的参数信息
  IsShowDialogTwo: boolean = false;
  IsShowCover: boolean = false;
  pay(){
    if(this.name==undefined || this.phone==undefined || this.address==undefined){
      const alert1= this.alertCtrl.create({
        title: '请选择收货地址',
        message: '',
        buttons: ['确定']
      });
      alert1.present();
    }else{
      if(this.totalPrice<=this.userBalance){
        const alert2 =this.alertCtrl.create({
          title: '确定购买这'+this.totalNum+'件商品吗',
          message: '   ',
          buttons: [
            {
              text: '取消',
              cssClass: 'secondary',
              handler: (blash) => {
                var currentDate=this.getDate();
                if(this.idArray==undefined){
                  this.http.post('/api/creatOrder',{"isPay":false,"parameter":'single',"userID":this.userID,"productID":this.productID,"amount":this.num,"type":this.choosed,"status":'待付款',"currentDate":currentDate, "address":this.name+','+this.phone+','+this.address}).subscribe(data=>{
                    if(data['status']==1){
                      console.log('未付款');
                      // var that=this;
                      // setTimeout(function(){
                      //   that.navCtrl.pop();
                      // },1000);
                    }
                  });
                }else{
                  var timestamp=new Date().getTime();
                  for(var i=0;i<this.productData.length;i++){
                    this.http.post('/api/creatOrder',{"isPay":false,"parameter":'more',"orderNumber":timestamp,"userID":this.userID,"productID":this.productData[i].productID,"amount":this.productData[i].amount,"type":this.productData[i].type,"status":'待付款',"currentDate":currentDate,"address":this.name+','+this.phone+','+this.address}).subscribe(data=>{
                      if(data['status']==1){
                        console.log('未付款');
                        // var that=this;
                        // setTimeout(function(){
                        //   that.navCtrl.pop();
                        // },1000);
                      }
                    });
                  }
                }
                this.navCtrl.push(OrderPage);
              }
            }, {
              text: '确认',
              handler: () => {
                var restMoney=this.userBalance-this.totalPrice;
                var currentDate=this.getDate();
                console.log(currentDate);
                if(this.idArray==undefined){
                  console.log(this.productID);
                  console.log(this.num);
                  console.log(this.choosed);
                  this.productID=this.productID+'';
                  this.http.post('/api/creatOrder',{"isPay":true,"parameter":'single',"userID":this.userID,"productID":this.productID,"amount":this.num,"type":this.choosed,"status":'已付款',"currentDate":currentDate,"address":this.name+','+this.phone+','+this.address,"restMoney":restMoney}).subscribe(data=>{
                    if(data['status']==1){
                      console.log('购买成功');
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
                  });
                }else{
                  var timestamp=new Date().getTime();
                  for(var i=0;i<this.productData.length;i++){
                    this.http.post('/api/creatOrder',{"isPay":true,"parameter":'more',"orderNumber":timestamp,"userID":this.userID,"productID":this.productData[i].productID,"amount":this.productData[i].amount,"type":this.productData[i].type,"status":'已付款',"currentDate":currentDate,"address":this.name+','+this.phone+','+this.address,"restMoney":restMoney}).subscribe(data=>{
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
                }
              }
            }
          ]
        });
        alert2.present();
      }else{
        const alert3 =this.alertCtrl.create({
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
        alert3.present();
      }
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
  goBack(){
    this.navCtrl.pop();
  }
}
