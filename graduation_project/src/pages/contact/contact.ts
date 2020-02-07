import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SetPage } from '../set/set';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(public navCtrl: NavController) {

  }

  goSet(){
    this.navCtrl.push(SetPage);
  }
}
