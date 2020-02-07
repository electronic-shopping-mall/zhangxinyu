import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import {HttpClientModule} from '@angular/common/http'; 

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ShoppingPage } from '../pages/shopping/shopping';
import { CreativeSpacePage } from '../pages/creative-space/creative-space';
import { InformationdetailPage } from '../pages/informationdetail/informationdetail';
import { SearchPage } from '../pages/search/search';
import { GoodsPage } from '../pages/goods/goods';
import { LowerCasePipe } from '@angular/common';
import { LoginPage } from '../pages/login/login';
import { RegistPage } from '../pages/regist/regist';
import { ForgetpwdPage } from '../pages/forgetpwd/forgetpwd';
import { SetPage } from '../pages/set/set';
import { ShowerPage } from '../pages/shower/shower';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ShoppingPage,
    CreativeSpacePage,
    InformationdetailPage,
    SearchPage,
    GoodsPage,
    LoginPage, //登录页
    RegistPage, //注册页
    ForgetpwdPage, //忘记密码
    SetPage, //设置页
    ShowerPage //洗沐页
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp,{
      backButtonText:'',
      tabsHideOnSubPages:true, //跳转之后隐藏下面的导航栏
      // backButtonIcon:"chevron-back-outline"
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage, 
    TabsPage,
    ShoppingPage, 
    CreativeSpacePage,
    InformationdetailPage,
    SearchPage, 
    GoodsPage, 
    LoginPage, 
    RegistPage, 
    ForgetpwdPage, 
    SetPage, 
    ShowerPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
