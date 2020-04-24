import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { InformationdetailPage } from '../informationdetail/informationdetail';

/**
 * Generated class for the NewslistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-newslist',
  templateUrl: 'newslist.html',
})
export class NewslistPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private http:HttpClient,) {
    this.type= navParams.get('type');
  }
  type;
  newsData; //从后台返回的资讯数据
  ionViewDidLoad() {
    console.log(this.type);
    this.http.post('/api/news/newslist',{"type":this.type}).subscribe(data=>{
      this.newsData=Array.prototype.slice.call(data);
      console.log(this.newsData);
      console.log(this.newsData[0].time);
    });
  }

  goDetail(newsID){
    localStorage.setItem('newsID',newsID)
    this.navCtrl.push(InformationdetailPage);
  }
  goBack(){
    this.navCtrl.pop();
  }
}
