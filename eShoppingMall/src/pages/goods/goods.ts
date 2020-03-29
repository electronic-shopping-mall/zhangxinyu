import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { BuyPage } from '../buy/buy';

/**
 * Generated class for the GoodsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-goods',
  templateUrl: 'goods.html',
})
export class GoodsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private http:HttpClient,public alertCtrl: AlertController) {
  }

  userID; //标记登录的是哪个用户
  productID; //商品ID，标记点开的是哪个商品
  goodData; //请求过来的商品数据
  typeData; //请求过来的商品类型数据
  images; //商品轮播的图片
  len; //轮播图片的数组长度
  title; //商品名字
  price; //商品价格
  describe; //商品描述
  sale=0; //销量
  details;//商品详情图片
  commentData; //跟该商品有关的所有评论
  commentNum; //评论总数

  choosed; //已选择的商品型号
  stock;//库存
  num=1; //加入购物车时选择的商品数量 默认是1件
  isBuy; //标志用户点击的是加入购物车还是购买  加入购物车是1  购买是2

  ionViewWillEnter() {
    this.productID=localStorage.getItem('productID');
    this.userID=localStorage.getItem('userID');
    this.http.post('/api/goods',{"productID":this.productID}).subscribe(data=>{
      this.goodData=Array.prototype.slice.call(data);
      // console.log(this.goodData);
      this.images=this.goodData[0].images.split('|');
      this.len=this.images.length;
      this.price=this.goodData[0].price;
      this.describe=this.goodData[0].describeText;
      this.title=this.goodData[0].title;
      this.details=this.goodData[0].detail.split('|');
    });
    this.http.post('/api/goods/type',{"productID":this.productID}).subscribe(data=>{
      this.typeData=Array.prototype.slice.call(data);
      console.log('该商品对应的所有型号',this.typeData);
      this.sale=0;
      for(var i=0;i<this.typeData.length;i++){
        this.sale+=this.typeData[i].soldNum
      }
      this.choosed=this.typeData[0].type;
      this.stock=this.typeData[0].stockNum;
    });

    this.http.post('/api/goods/comment',{"productID":this.productID}).subscribe(data=>{
      this.commentData=Array.prototype.slice.call(data);
      this.commentNum=this.commentData.length;
      console.log('跟该商品有关的所有评论',this.commentData)
    });
  }

  isActive=1; //用于标记商品页的3个导航按钮， 0表示商品 1表示详情 2表示评论
  isClick(i){
    this.isActive=i;
  }

  goHome(){
    this.navCtrl.pop();
  }

  //控制弹窗的参数信息
  IsShowDialogOne: boolean = false;
  IsShowDialogTwo: boolean = false;
  IsShowCover: boolean = false;

  //加入购物车
  addToCart(){
    this.num=1;
    this.IsShowDialogOne = true;
    this.IsShowCover = true;
    this.isBuy=1;
  }

  //立即购买
  buy(){
    this.num=1;
    this.IsShowDialogOne = true;
    this.IsShowCover = true;
    this.isBuy=2;
  }

  //关闭弹窗
  CloseDialogOne(){
    if (this.IsShowDialogOne) {
      this.IsShowDialogOne = false;
      this.IsShowCover = false;
    }
  }

  CloseDialog() {
    if (this.IsShowDialogOne) {
      this.IsShowDialogOne = false;
      this.IsShowCover = false;
    }
    if (this.IsShowDialogTwo) {
      this.IsShowDialogTwo = false;
      this.IsShowCover = false;
    }
  }

  //选择商品型号时改变颜色及相应库存
  change(str,i){
    console.log(str);
    this.choosed=str;
    this.stock=this.typeData[i].stockNum;
  }

  drop(){
    if(this.num!=0){
      this.num--;
    }
  }
  add(){
    this.num++;
  }

  //确定
  sure(){
    if(this.stock==0){
      var val=document.getElementById('sure'); //获取按钮
      val.setAttribute("disabled", "true"); //不能点击
    }else{
      this.IsShowDialogOne = false;
      this.IsShowCover = false;
      if(this.isBuy==1){
        this.http.post('/api/addToCart',{"userID":this.userID,"productID":this.productID,"type":this.choosed,"num":this.num}).subscribe(data=>{
          if(data['status']==1){
            console.log('添加购物车成功');    
            this.IsShowDialogTwo=true;   
            this.IsShowCover = true;
            var that=this;
            setTimeout(function(){
              if (that.IsShowDialogTwo) {
                that.IsShowDialogTwo = false;
                that.IsShowCover = false;
              }
            },1000);
          }
        });
      }else{
        this.navCtrl.push(BuyPage,{ //向购买页面传递参数
          choosed:this.choosed,
          productID:this.productID,
          num:this.num
        });
      }
    }
  }
  goBack(){
    this.navCtrl.pop();
  }
}
