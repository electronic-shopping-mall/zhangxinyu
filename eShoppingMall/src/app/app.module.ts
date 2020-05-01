import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import {HttpClientModule} from '@angular/common/http'; 
import {MultiPickerModule} from 'ion-multi-picker';
import {Camera,CameraOptions} from "@ionic-native/camera";
import {ImagePicker,ImagePickerOptions} from "@ionic-native/image-picker";

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ShoppingPage } from '../pages/shopping/shopping';
import { InformationdetailPage } from '../pages/informationdetail/informationdetail';
import { SearchPage } from '../pages/search/search';
import { GoodsPage } from '../pages/goods/goods';
import { LowerCasePipe } from '@angular/common';
import { LoginPage } from '../pages/login/login';
import { RegistPage } from '../pages/regist/regist';
import { ForgetpwdPage } from '../pages/forgetpwd/forgetpwd';
import { SetPage } from '../pages/set/set';
import { ShowerPage } from '../pages/shower/shower';
import { FurniturePage } from '../pages/furniture/furniture';
import { LeisurePage } from '../pages/leisure/leisure';
import { InfoPage } from '../pages/info/info';
import { AddressPage } from '../pages/address/address';
import { AddAddressPage } from '../pages/add-address/add-address';
import { EditAddressPage } from '../pages/edit-address/edit-address';
import { NewPage } from '../pages/new/new';
import { HotPage } from '../pages/hot/hot';
import { BedPage } from '../pages/bed/bed';
import { CookPage } from '../pages/cook/cook';
import { HouseworkPage } from '../pages/housework/housework';
import { CommodityPage } from '../pages/commodity/commodity';
import { SalePage } from '../pages/sale/sale';
import { OrderPage } from '../pages/order/order';
import { WalletPage } from '../pages/wallet/wallet';
import { Regist2Page } from '../pages/regist2/regist2';
import { Forgetpwd2Page } from '../pages/forgetpwd2/forgetpwd2';
import { BuyPage } from '../pages/buy/buy';

import { BankcardManagePage } from '../pages/bankcard-manage/bankcard-manage';
import { AddbankcardPage } from '../pages/addbankcard/addbankcard';
import { TopupPage } from '../pages/topup/topup';
import { OrderdetailPage } from '../pages/orderdetail/orderdetail';
import { SearchresultPage } from '../pages/searchresult/searchresult';
import { ResetpwdPage } from '../pages/resetpwd/resetpwd';
import { Resetpwd2Page } from '../pages/resetpwd2/resetpwd2';
import { CommentPage } from '../pages/comment/comment';
import { MycommentPage } from '../pages/mycomment/mycomment';
import { NewslistPage } from '../pages/newslist/newslist';
import { WithdrawPage } from '../pages/withdraw/withdraw';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ShoppingPage,
    NewslistPage,
    InformationdetailPage,
    SearchPage,
    GoodsPage,
    LoginPage, //登录页
    RegistPage, //注册页
    Regist2Page, //注册页-下一步
    ForgetpwdPage, //忘记密码
    Forgetpwd2Page,//忘记密码-下一步
    SetPage, //设置页
    NewPage, //新品页
    HotPage, //热卖页
    ShowerPage, //洗沐页
    FurniturePage,  //家具页
    LeisurePage,  //家居服页,
    BedPage, //床品页
    CookPage, //下厨页
    HouseworkPage, //家务页
    CommodityPage, //生活日用页
    SalePage, //甩卖页
    InfoPage,  //个人信息页
    AddressPage,  //收获地址页
    AddAddressPage,  //添加收获地址页
    EditAddressPage,  //添加修改地址页
    OrderPage, //订单
    WalletPage, //钱包
    BuyPage, //付款页
    BankcardManagePage,  //银行卡管理页
    AddbankcardPage, //添加银行卡页面
    TopupPage, //充值页面
    WithdrawPage, //提现页面
    OrderdetailPage,  //订单详情页
    SearchresultPage, //搜索结果页
    ResetpwdPage, //重置密码页
    Resetpwd2Page, //重置密码-下一步
    CommentPage,  //发表评论页
    MycommentPage //查看我的所有评论页
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MultiPickerModule,
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
    NewslistPage,
    InformationdetailPage,
    SearchPage, 
    GoodsPage, 
    LoginPage, 
    RegistPage, 
    ForgetpwdPage, 
    SetPage, 
    NewPage,
    HotPage,
    ShowerPage,
    FurniturePage,
    LeisurePage,
    BedPage,
    CookPage,
    HouseworkPage,
    CommodityPage,
    SalePage,
    InfoPage,
    AddressPage,
    AddAddressPage,
    EditAddressPage,
    OrderPage,
    WalletPage,
    Regist2Page,
    Forgetpwd2Page,
    BuyPage,
    BankcardManagePage,
    AddbankcardPage,
    TopupPage,
    WithdrawPage,
    OrderdetailPage,
    SearchresultPage,
    ResetpwdPage,
    Resetpwd2Page,
    CommentPage,
    MycommentPage 
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    ImagePicker,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
