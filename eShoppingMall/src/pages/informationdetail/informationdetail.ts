import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpClient,HttpHeaders} from '@angular/common/http';

/**
 * Generated class for the InformationdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-informationdetail',
  templateUrl: 'informationdetail.html',
})
export class InformationdetailPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private http:HttpClient) {
  }

  newsID; //标记点开的是哪条资讯
  newsData;  //从后台返回的资讯数据
  pictures;
  contents;
  title;
  ionViewDidLoad() {
    this.newsID=localStorage.getItem('newsID');
    console.log(this.newsID);
    this.http.post('/api/news/specific',{"newsID":this.newsID}).subscribe(data=>{
      this.newsData=Array.prototype.slice.call(data);
      this.pictures=this.newsData[0].pictures.split('|').slice(1);
      this.contents=this.newsData[0].content.split('|');
      this.title=this.newsData[0].title;
    });
  }
  goback(){
    this.navCtrl.pop();
  }
}
