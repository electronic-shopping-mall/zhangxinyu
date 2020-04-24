import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NewslistPage } from '../newslist/newslist';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController) {

  }
  imgs=["../assets/imgs/资讯页面/资讯1.jpg","../assets/imgs/资讯页面/资讯2.jpg","../assets/imgs/资讯页面/资讯3.jpg"];
  goNewsList(i){
    if(i==0){
      this.navCtrl.push(NewslistPage,{
        'type':'创意空间'
      });
    }
    if(i==1){
      this.navCtrl.push(NewslistPage,{
        'type':'装修攻略'
      });
    }
    if(i==2){
      this.navCtrl.push(NewslistPage,{
        'type':'生活攻略'
      });
    }
  }
}
