import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,App,AlertController } from 'ionic-angular';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { TabsPage } from '../tabs/tabs';
import { GoodsPage } from '../goods/goods';
import { BuyPage } from '../buy/buy';

/**
 * Generated class for the ShoppingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shopping',
  templateUrl: 'shopping.html',
})
export class ShoppingPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private http:HttpClient,public app:App,public alertCtrl: AlertController) {
  }

  userID; //标记是哪个用户登录的
  show; //标记页面显示什么 1表示购物车为空 2表示购物车不为空  注意得有一个初始默认值，否则页面初始加载为undefined 页面识别不出
  cartData=[]; //请求的购物车数据
  foot; //标记底部显示 1表示结算 2表示删除所选
  head; //标记顶部显示 1表示正常的结算模式，右上角文字显示编辑  2表示编辑模式，右上角文字显示完成
  totalPrice=0; //所选商品总价 初始值为0
  totalNum=0; //所选商品的总数量 初始值为0
  flag=[]; //标志数组  标记checkbox按钮是否点击

  ionViewDidLoad(){
    // this.userID=localStorage.getItem('userID');
    // this.http.post("/api/shoppingCart",{"userID":this.userID}).subscribe(data=>{
    //   this.cartData=Array.prototype.slice.call(data);
    //   if(this.cartData.length==0){
    //     this.show=1;
    //   }else{
    //     this.show=2;
    //   }
      // console.log(this.cartData.length);
      // for(var i=0;i<this.cartData.length;i++){
      //   this.flag[i]=false;
      // }
      // console.log(this.flag);
    // });
  }

  ionViewWillEnter() {
    console.log('idArray',this.idArray);
    this.userID=localStorage.getItem('userID');
    console.log(this.userID);
    this.http.post("/api/shoppingCart",{"userID":this.userID}).subscribe(data=>{
      this.cartData=Array.prototype.slice.call(data);
      console.log('cartData',this.cartData);
      if(this.cartData.length==0){
        this.show=1;
        this.head=0;
        this.foot=0;
      }else{
        this.show=2;
        this.head=1;
        this.foot=1;
      }
      this.totalNum=0;
      this.totalPrice=0;
      this.chooseAll=0;
      this.idArray=[];
      for(var i=0;i<this.cartData.length;i++){
        this.flag[i]=false;
      }
    console.log('flag',this.flag);
    });
  }

  //商品数量增加和减少
  add(i){
    this.cartData[i].amount++;
    this.http.post('/api/addNum',{"num":this.cartData[i].amount,"cartID":this.cartData[i].cartID}).subscribe(data=>{
      if(data['status']==1){
        this.http.post("/api/shoppingCart",{"userID":this.userID}).subscribe(data=>{
          this.cartData=Array.prototype.slice.call(data);
        });
      }
    });
    if(this.flag[i]==true || this.chooseAll==1){
      this.totalNum++;
      this.totalPrice+=this.cartData[i].price;
    }
  }
  drop(i){
    if(this.cartData[i].amount!=1){
      this.cartData[i].amount--;
      this.http.post('/api/dropNum',{"num":this.cartData[i].amount,"cartID":this.cartData[i].cartID}).subscribe(data=>{
        if(data['status']==1){
          this.http.post("/api/shoppingCart",{"userID":this.userID}).subscribe(data=>{
            this.cartData=Array.prototype.slice.call(data);
          });
        }
      });
      if(this.flag[i]==true || this.chooseAll==1){
        this.totalNum--;
        this.totalPrice-=this.cartData[i].price;
      }
    }
  }

  //去逛逛
  goHome(){
    this.app.getRootNavs()[0].setRoot(TabsPage);
  }

  //编辑
  edit(){
    this.foot=2;
    this.head=2;
  }

  //完成
  finish(){
    this.foot=1;
    this.head=1;
  }

//选择单个商品
idArray=[]; //把已选择的商品的cartID放到一个数组里面
choose(id,i){
  console.log('点击的商品id',id);
  if(this.flag[i]==false){
    this.flag[i]=true;
    console.log(this.flag);
    this.idArray.push(id);
    this.totalNum+=this.cartData[i].amount;
    console.log(this.idArray);
    // for(var j=0;j<this.idArray.length;j++){
    //   if(this.idArray[j]==this.cartData[i].productID){
    //     this.totalPrice+=this.cartData[i].price;
    //   }
    // }
    if(this.idArray.length==this.cartData.length){
      this.chooseAll=1;
    }
    this.totalPrice+=this.cartData[i].price*this.cartData[i].amount;
  }else{
    this.flag[i]=false;
    console.log(this.flag);
    for(var j=0;j<this.idArray.length;j++){
      if(id==this.idArray[j]){
        this.totalPrice=this.totalPrice-this.cartData[i].price*this.cartData[i].amount;
        this.idArray.splice(j,1);
      }
    }
    console.log(this.idArray);
    this.totalNum-=this.cartData[i].amount;
    if(this.idArray.length!=this.cartData.length){
      this.chooseAll=0;
    }

  }
  // console.log(this.idArray);
}

  //全选
  chooseAll=0; //标记是否点了全选按钮 0表示未点击 1表示点击
  allChoose(){
    if(this.head==1){
      this.totalNum=0;
      this.totalPrice=0;
      this.idArray=[];
      if(this.chooseAll==0){
        for(var i=0;i<this.cartData.length;i++){
          this.flag[i]=true;
          this.idArray[i]=this.cartData[i].cartID;
          this.totalNum+=this.cartData[i].amount;
          this.totalPrice+=this.cartData[i].price*this.cartData[i].amount;
        }
        console.log(this.flag);
        this.chooseAll=1;

        // for(var j=0;j<this.cartData.length;j++){
        //   this.totalPrice+=this.cartData[j].price*this.cartData[j].amount;
        // }
        console.log(this.idArray);
      }else{
        for(var i=0;i<this.cartData.length;i++){
          this.flag[i]=false;
        }
        this.chooseAll=0;

        this.totalNum=0;
        this.totalPrice=0;
        this.idArray=[];
        console.log(this.idArray);

      }
    }else{
      if(this.chooseAll==0){
        for(var i=0;i<this.cartData.length;i++){
          this.flag[i]=true;
          this.idArray[i]=this.cartData[i].cartID;
          this.totalNum+=this.cartData[i].amount;
          this.totalPrice+=this.cartData[i].price*this.cartData[i].amount;
        }
        this.chooseAll=1;
      }else{
        for(var i=0;i<this.cartData.length;i++){
          this.flag[i]=false;
        }
        this.totalNum=0;
        this.totalPrice=0;
        this.idArray=[];
        this.chooseAll=0;
      }
    }
  }

  //删除购物车中的商品
  delete(){
    const alert =this.alertCtrl.create({
      title: '删除所选'+this.idArray.length+'件商品',
      message: '   ',
      buttons: [
        {
          text: '取消',
          cssClass: 'secondary',
          // handler: (blash) => {
          //   console.log('Confirm Cancel: blah',blash);
          // }
        }, {
          text: '删除',
          handler: () => {
            console.log('Confirm Okay');
            this.http.post('/api/deleteCart',{"userID":this.userID,"array":this.idArray}).subscribe(data=>{
              if(data['status']==1){
                console.log('删除成功');
                this.http.post("/api/shoppingCart",{"userID":this.userID}).subscribe(data=>{
                  this.cartData=Array.prototype.slice.call(data);
                  if(this.cartData.length==0){
                    this.show=1;
                    this.head=0;
                    this.foot=0;
                    this.idArray=[];
                    for(var i=0;i<this.cartData.length;i++){
                      this.flag[i]=false;
                    }
                  }else{
                    this.show=2;
                    this.head=2;
                    this.foot=2;
                    this.idArray=[];
                    this.totalNum=0;
                    this.totalPrice=0;
                    for(var i=0;i<this.cartData.length;i++){
                      this.flag[i]=false;
                    }
                  }
                });
              }
            });
            
          }
        }
      ]
    });
    alert.present();
    
  }

  //查看商品详情
  goGoods(id){
    localStorage.setItem("productID",id);
    this.navCtrl.push(GoodsPage);
  }
  pay(){
    // console.log(this.totalNum);
    var val=document.getElementById('jiesuan'); //获取按钮
    if(this.totalNum==0){
      val.setAttribute("disabled", "true"); //不能点击
    }
    else{
      val.removeAttribute("disabled");
      this.navCtrl.push(BuyPage,{
        idArray:this.idArray
      });
    }
  }
}
