import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpClient,HttpHeaders} from '@angular/common/http';

import { CityServeProvider } from '../../providers/city-serve/city-serve';

/**
 * Generated class for the AddAddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-address',
  templateUrl: 'add-address.html',
  providers:[CityServeProvider]
})
export class AddAddressPage {

  constructor(private cityServe: CityServeProvider,public navCtrl: NavController, public navParams: NavParams,private http:HttpClient) {
    
  }
  name;  //双向数据绑定 姓名
  phone; //双向数据绑定 电话
  area;  //双向数据绑定 地址
  detail;  //双向数据绑定 详细地址
  isDefault; //双向数据绑定 是否为默认地址
  userID;  //标记是哪个用户登录

  ionViewDidLoad() {
    this.userID=localStorage.getItem('userID');
  }
  save(){
    this.http.post('/api/addAddress',{"userID":this.userID,"name":this.name,"phone":this.phone,"area":this.area,"detail":this.detail,"isDefault":this.isDefault}).subscribe(data=>{
      if(data['status']==1){
        console.log('插入新地址成功');
        this.navCtrl.pop();
      }
    });
  }

  listData= [
    {
      options: [
        { text: '北京', value: '北京' },
        { text: '天津', value: '天津' },
        { text: '河北', value: '河北' },
        { text: '山西', value: '山西' },
        { text: '辽宁', value: '辽宁' }


      ]
    },{
      options: [
        { text: '北京', value: '北京', parentVal: '北京' },
        { text: '天津', value: '天津', parentVal: '天津' },
        { text: '石家庄', value: '石家庄', parentVal: '河北' },
        { text: '唐山', value: '唐山', parentVal: '河北' },
        { text: '秦皇岛', value: '秦皇岛', parentVal: '河北' },
        { text: '邯郸', value: '邯郸', parentVal: '河北' },
        { text: '邢台', value: '邢台', parentVal: '河北' },
        { text: '保定', value: '保定', parentVal: '河北' },
        { text: '张家口', value: '张家口', parentVal: '河北' },
        { text: '承德', value: '承德', parentVal: '河北' },
        { text: '沧州', value: '沧州', parentVal: '河北' },
        { text: '廊坊', value: '廊坊', parentVal: '河北' },
        { text: '衡水', value: '衡水', parentVal: '河北' },
      ]
    },{
      options: [
        { text: '东城区', value: '东城区', parentVal: '北京' },
        { text: '西城区', value: '西城区', parentVal: '北京' },
        { text: '崇文区', value: '崇文区', parentVal: '北京' },
        { text: '宣武区', value: '宣武区', parentVal: '北京' },
        { text: '朝阳区', value: '朝阳区', parentVal: '北京' },
        { text: '丰台区', value: '丰台区', parentVal: '北京' },
        { text: '石景山区', value: '石景山区', parentVal: '北京' },
        { text: '海淀区', value: '海淀区', parentVal: '北京' },
        { text: '门头沟区', value: '门头沟区', parentVal: '北京' },
        { text: '通州区', value: '通州区', parentVal: '北京' },
        { text: '昌平区', value: '昌平区', parentVal: '北京' },
        { text: '房山区', value: '房山区', parentVal: '北京' },
        { text: '顺义区', value: '顺义区', parentVal: '北京' },
        { text: '大兴区', value: '大兴区', parentVal: '北京' },
        { text: '昌平区', value: '昌平区', parentVal: '北京' },
        { text: '平谷区', value: '平谷区', parentVal: '北京' },
        { text: '怀柔区', value: '怀柔区', parentVal: '北京' },
        { text: '密云县', value: '密云县', parentVal: '北京' },
        { text: '延庆县', value: '延庆县', parentVal: '北京' },
        { text: '和平区', value: '和平区', parentVal: '天津' },
        { text: '河东区', value: '河东区', parentVal: '天津' },
        { text: '河西区', value: '河西区', parentVal: '天津' },
        { text: '南开区', value: '南开区', parentVal: '天津' },
        { text: '河北区', value: '河北区', parentVal: '天津' },
        { text: '红桥区', value: '红桥区', parentVal: '天津' },
        { text: '塘沽区', value: '塘沽区', parentVal: '天津' },
        { text: '汉沽区', value: '汉沽区', parentVal: '天津' },
        { text: '大港区', value: '大港区', parentVal: '天津' },
        { text: '西青区', value: '西青区', parentVal: '天津' },
        { text: '津南区', value: '津南区', parentVal: '天津' },
        { text: '北辰区', value: '北辰区', parentVal: '天津' },
        { text: '武清区', value: '武清区', parentVal: '天津' },
        { text: '长安区', value: '长安区', parentVal: '石家庄' },
        { text: '桥东区', value: '桥东区', parentVal: '石家庄' },
        { text: '桥西区', value: '桥西区', parentVal: '石家庄' },
        { text: '郊 区', value: '郊 区', parentVal: '石家庄' },
        { text: '井陉矿区', value: '井陉矿区', parentVal: '石家庄' },
        { text: '井陉县', value: '井陉县', parentVal: '石家庄' },
        { text: '正定县', value: '正定县', parentVal: '石家庄' },
        { text: '栾城县', value: '栾城县', parentVal: '石家庄' },
        { text: '行唐县', value: '行唐县', parentVal: '石家庄' },
        { text: '灵寿县', value: '灵寿县', parentVal: '石家庄' },
        { text: '高邑县', value: '高邑县', parentVal: '石家庄' },
        { text: '深泽县', value: '深泽县', parentVal: '石家庄' },
        { text: '路南区', value: '路南区', parentVal: '唐山' },
        { text: '路北区', value: '路北区', parentVal: '唐山' },
        { text: '古冶区', value: '古冶区', parentVal: '唐山' },
        { text: '开平区', value: '开平区', parentVal: '唐山' },
        { text: '新 区', value: '新 区', parentVal: '唐山' },
        { text: '丰润县', value: '丰润县', parentVal: '唐山' },
        { text: '滦 县', value: '滦 县', parentVal: '唐山' },
        { text: '滦南县', value: '滦南县', parentVal: '唐山' },
        { text: '乐亭县', value: '乐亭县', parentVal: '唐山' },
        { text: '迁西县', value: '迁西县', parentVal: '唐山' },
        { text: '玉田县', value: '玉田县', parentVal: '唐山' },
        { text: '唐海县', value: '唐海县', parentVal: '唐山' },
        { text: '遵化市', value: '遵化市', parentVal: '唐山' },
        { text: '丰南市', value: '丰南市', parentVal: '唐山' },
        { text: '迁安市', value: '迁安市', parentVal: '唐山' },
        { text: '海港区', value: '海港区', parentVal: '秦皇岛' },
        { text: '山海关区', value: '山海关区', parentVal: '秦皇岛' },
        { text: '北戴河区', value: '北戴河区', parentVal: '秦皇岛' },
        { text: '昌黎县', value: '昌黎县', parentVal: '秦皇岛' },
        { text: '抚宁县', value: '抚宁县', parentVal: '秦皇岛' },
        { text: '邯山区', value: '邯山区', parentVal: '邯郸' },
        { text: '丛台区', value: '丛台区', parentVal: '邯郸' },

      ]
    }
  ];

  // getRequestContact() {
  //   this.cityServe.getRequestContact().subscribe(data => {
  //     this.listData=Array.prototype.slice.call(data);
  //     console.log(this.listData);
  //       // this.listData = data.json();
  //   }, error => {
  //       console.log(error);
  //   })
  // }

// month;
// strdate;
// hour;
// minutes;
// time=this.getDate();
// getDate(){   //获取当前时间函数
//   var date = new Date();
//   var seperator1 = "-";
//   var seperator2 = ":";
//   this.month = date.getMonth() + 1;
//   this.strdate = date.getDate();
//   this.hour= date.getHours();
//   this.minutes=date.getMinutes();
//   if (this.month >= 1 && this.month <= 9) {
//       this.month = "0" + this.month;
//   }
//   if (this.strdate >= 0 && this.strdate <= 9) {
//       this.strdate = "0" + this.strdate;
//   }
//   if (this.hour >= 0 && this.hour <= 9) {
//     this.hour = "0" + this.hour;
//   }
//   if (this.minutes >= 0 && this.minutes <= 9) {
//     this.minutes = "0" + this.minutes;
//   }
//   var currentdate = date.getFullYear() + seperator1 + this.month + seperator1 + this.strdate
//           + " " + this.hour+ seperator2 + this.minutes;
//           // + seperator2 + date.getSeconds();
//   return currentdate;
// }

}
