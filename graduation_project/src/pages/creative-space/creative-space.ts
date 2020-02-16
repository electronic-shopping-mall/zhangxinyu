import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InformationdetailPage } from '../informationdetail/informationdetail';
import {HttpClient,HttpHeaders} from '@angular/common/http';

/**
 * Generated class for the CreativeSpacePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-creative-space',
  templateUrl: 'creative-space.html',
})
export class CreativeSpacePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private http:HttpClient) {
  }

  newsData; //从后台返回的资讯数据
  ionViewDidLoad() {
    this.http.post('/api/news/creative',{}).subscribe(data=>{
      this.newsData=Array.prototype.slice.call(data);
    });
  }

  goDetail(newsID){
    localStorage.setItem('newsID',newsID)
    this.navCtrl.push(InformationdetailPage);
  }
}
