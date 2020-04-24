import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { SearchresultPage } from '../searchresult/searchresult';
import { setupUrlSerializer } from 'ionic-angular/umd/navigation/url-serializer';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private http:HttpClient,public alertCtrl: AlertController) {
  }
  userID;
  searchText;
  infoData;
  temp=[];
  history=[];
  hot=["家居服","毛巾","收纳箱","被子","炒锅","枕头","椅子","纸巾","洗衣液","水杯","床品"];
  ionViewWillEnter() {
    this.userID=localStorage.getItem("userID");
    this.http.post('/api/userinfo',{"userID":this.userID}).subscribe(data=>{
      this.infoData=Array.prototype.slice.call(data);
      console.log(this.infoData);
      if(this.infoData[0].searchHistory){
        this.temp=this.infoData[0].searchHistory.split(',');
        for(var i=0;i<this.temp.length-1;i++){
          this.history[i]=this.temp[i];
        }
        this.history=this.delDuplicate(this.history);
      }
    })
  }

  resultData;
  goResult(){
    console.log(this.searchText);
    if(this.searchText==undefined){
      const alert2 =this.alertCtrl.create({
        title: '请输入搜索关键字',
        message: '   ',
        buttons: ['取消','确认']
      });
      alert2.present();
    }else{
      this.http.post('/api/search',{"searchText":this.searchText,userID:this.userID}).subscribe(data=>{
        this.resultData=Array.prototype.slice.call(data);
        console.log(this.resultData);
        this.navCtrl.push(SearchresultPage,{
          "resultData":this.resultData
        });
      });
    }
  }
  hotgoResult(item){
    this.http.post('/api/search',{"searchText":item,userID:this.userID}).subscribe(data=>{
      this.resultData=Array.prototype.slice.call(data);
      console.log(this.resultData);
      this.navCtrl.push(SearchresultPage,{
        "resultData":this.resultData
      });
    });
  }
  delete(){
    const alert =this.alertCtrl.create({
      title: '确定删除搜索记录吗？',
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
            this.http.post('/api/delete/history',{"userID":this.userID}).subscribe(data=>{
              this.infoData=Array.prototype.slice.call(data);
              console.log(this.infoData);
              if(this.infoData[0].searchHistory){
                this.temp=this.infoData[0].searchHistory.split(',');
                for(var i=0;i<this.temp.length-1;i++){
                  this.history[i]=this.temp[i];
                }
                this.history=this.delDuplicate(this.history);
              }else{
                this.history=[];
              }
            });
          }
        }
      ]
    });
    alert.present();
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

    goBack(){
      this.navCtrl.pop();
    }
}
