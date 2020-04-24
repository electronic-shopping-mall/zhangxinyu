import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import {HttpClient,HttpHeaders} from '@angular/common/http';

import { AddAddressPage } from '../add-address/add-address';
import { EditAddressPage } from '../edit-address/edit-address';

/**
 * Generated class for the AddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-address',
  templateUrl: 'address.html',
})
export class AddressPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private http:HttpClient,public alertCtrl: AlertController) {
  }

  show; //标记两种页面显示 1表示地址为空 2表示地址不为空
  userID;  //用于标记当前是哪个用户的登录
  addressData; //从后台返回的某用户的收获地址

  //每次进入页面时触发
  ionViewWillEnter() {
    this.userID=localStorage.getItem('userID');
    console.log(this.userID);
    this.http.post("/api/address",{"userID":this.userID}).subscribe(data=>{
      this.addressData=Array.prototype.slice.call(data);
      console.log(this.addressData);
      if(this.addressData.length==0){
        this.show=1;
      }else{
        this.show=2;
      }
    });
  }

  goAdd(){
    this.navCtrl.push(AddAddressPage);
  }

  changeDefault(i){ //修改默认地址
    if(this.addressData[i].isDefault=='false'){
      this.addressData[i].isDefault='true';
      this.http.post('/api/changeDefault',{'addressID':this.addressData[i].addressID,'userID':this.userID,'isDefault':this.addressData[i].isDefault}).subscribe(data=>{
      });
      for(var j=0;j<this.addressData.length;j++){
        if(j!=i){
          this.addressData[j].isDefault='false';
        }
      }
    }else{
      this.addressData[i].isDefault='false';
      this.http.post('/api/changeDefault',{'addressID':this.addressData[i].addressID,'userID':this.userID,'isDefault':this.addressData[i].isDefault}).subscribe(data=>{
      });
    }

  }

  edit(i){  //编辑地址
    localStorage.setItem('addressID',this.addressData[i].addressID);
    this.navCtrl.push(EditAddressPage);
  }

  delete(addressID,i){  //删除地址
    console.log(this.addressData[i].addressID);
    const alert =this.alertCtrl.create({
      title: '确定删除该收货地址吗？',
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
            console.log(addressID);
            this.http.post('/api/deleteAddress',{"addressID":addressID,"userID":this.userID}).subscribe(data=>{
              this.addressData=Array.prototype.slice.call(data);
              if(this.addressData.length==0){
                this.show=1;
              }else{
                this.show=2;
              }
            });
          }
        }
      ]
    });
    alert.present();
  }

  flag;
  backData;// 返回给上个页面的用户选择的地址信息
  chooseAddress(id){
    this.flag=localStorage.getItem('isChooseAddress');
    if(this.flag=='1'){
      // localStorage.setItem("addressID",id);
      this.http.post('/api/specificAddress',{'addressID':id}).subscribe(data=>{
        this.backData=Array.prototype.slice.call(data);
        console.log(this.addressData);
        this.navCtrl.getPrevious().data.chooseAddressData = this.backData;
        this.navCtrl.pop();
      });
    }
  }
  goBack(){
    this.navCtrl.pop();
  }
}
