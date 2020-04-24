import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpClient,HttpHeaders} from '@angular/common/http';

/**
 * Generated class for the MycommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mycomment',
  templateUrl: 'mycomment.html',
})
export class MycommentPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private http:HttpClient) {
  }
  show=1;
  userID;
  commentData; 
  star=[];
  level='非常好';
  currentDate;
  content;
  ionViewDidLoad() {
    this.userID=localStorage.getItem("userID");
    this.http.post('/api/comment',{"userID":this.userID}).subscribe(data=>{
      this.commentData=Array.prototype.slice.call(data);
      if(this.commentData.length==0){
        this.show=1;
      }else{
        this.show=2;
        for(var i=0;i<this.commentData.length;i++){
          if(this.commentData[i].level=='非常好'){
            this.commentData[i]['starArray']=[{flag:true},{flag:true},{flag:true},{flag:true},{flag:true}];
          }
          if(this.commentData[i].level=='好'){
            this.commentData[i]['starArray']=[{flag:true},{flag:true},{flag:true},{flag:true},{flag:false}];
          }
          if(this.commentData[i].level=='一般'){
            this.commentData[i]['starArray']=[{flag:true},{flag:true},{flag:true},{flag:false},{flag:false}];
          }
          if(this.commentData[i].level=='差'){
            this.commentData[i]['starArray']=[{flag:true},{flag:true},{flag:false},{flag:false},{flag:false}];
          }
          if(this.commentData[i].level=='非常差'){
            this.commentData[i]['starArray']=[{flag:true},{flag:false},{flag:false},{flag:false},{flag:false}];
          }
        }
      }
    });

  }
  changeStar(i){
    this.level=this.star[i].level;
    for(var j=i+1;j<this.star.length;j++){
      this.star[j].flag=false;
    }
    for(var k=0;k<=i;k++){
      this.star[k].flag=true;
    }
  }

  goBack(){
    this.navCtrl.pop();
  }
}
