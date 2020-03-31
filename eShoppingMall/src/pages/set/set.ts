import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,App } from 'ionic-angular';
import { LoginPage } from '../login/login';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { ResetpwdPage } from '../resetpwd/resetpwd';

/**
 * Generated class for the SetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-set',
  templateUrl: 'set.html',
})
export class SetPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public app:App,private http:HttpClient) {
  }
  ionViewDidLoad() {
  }
  logOut(){
    this.app.getRootNavs()[0].setRoot(LoginPage);
  }
  goReset(){
    this.navCtrl.push(ResetpwdPage);
  }
  goBack(){
    this.navCtrl.pop();
  }
}
