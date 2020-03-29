const express=require('express');
const mysql=require('mysql');
var bodyParser=require('body-parser');
const app=express();
const router=express.Router();
const log=console.log;
// const db=require('./db');
// var sql = require('mssql');

/*
const formidable=require('formidable');
        fs = require('fs'),
        TITLE = 'formidable上传示例',
        AVATAR_UPLOAD_FOLDER = './public/upload/',
        domain = "http://192.168.204.144:8000";
*/
app.use(express.static('./public'));

app.use(bodyParser.json());
app.use(require('body-parser').urlencoded({extended: true}));

//创建数据库连接
const connection = mysql.createConnection({
      host:"localhost",
      user:"root",
      password:"",
      database:"shoppingmall"
});
connection.connect();

//登录
router.post('/api/login',function(req,res){
  //log(req.body.phone);
  const sql='select password,userID from user where phoneNumber=?';
  connection.query(sql,[req.body.phone],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    if(results[0]==undefined){
      res.json({status:1}); //该手机号未被注册过
    }else{
      results.forEach(function(e){
        if(req.body.pwd===e.password){
          res.json({status:2,id:e.userID}); //密码正确
        }else{
          res.json({status:3}); //密码错误
        }
      });
    }
  });
});

//修改密码
router.post('/api/changepwd',function(req,res){
  const sql='update user set password=? where phoneNumber=?';
  connection.query(sql,[req.body.password,req.body.phone],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    res.json({status:1}); //密码修改成功
  });
});

//修改个人信息
router.post('/api/change/info',function(req,res){
  const sql='update user set userName=?,sex=?,birthday=?,location=? where userID=?';
  connection.query(sql,[req.body.name,req.body.sex,req.body.birthday,req.body.area,req.body.userID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    res.json({status:1}); //信息修改成功
  });
});

//重置密码
router.post('/api/resetpwd',function(req,res){
  const sql='update user set password=? where userID=?';
  connection.query(sql,[req.body.password,req.body.userID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    res.json({status:1}); //密码重置成功
  });
});

//注册
router.post('/api/register',function(req,res){
  var num;
  var getRandom=function(){  //生成用户ID，6位随机数
    var arr=new Array();
    for(var j=1;j<=6;j++){
      arr.push(j);
    }

    var len=arr.length;
    var result=[];
    var r;
    for(var i=0;i<len;i++){
      r=Math.floor(Math.random()*arr.length);
      result.push(arr[r]);
    }
    var number='';
    for(var k=0;k<result.length;k++){
      number+=result[k];
    }
    return parseInt(number);

  }
  var randomUserID=getRandom();
  log(randomUserID);
  log(req.body.phone);

  const sql1='select * from user where userID=?';
  connection.query(sql1,[randomUserID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    var rlen=results.length;
    while(rlen!=0){
      randomUserID=getRandom();
      return connection.query(sql1,[randomUserID],function(err,results){
        if(err){
          console.error(err);
          process.exit(1);
        }
        rlen=results.length;
      });
    }
  });

  const sql2='insert into user values(?,?,?,?,?,?,?,?,?,?)';
  var userName='用户 '+randomUserID;
  num=Math.floor(Math.random()*10+1); //生成1-10的随机数
  var head='../assets/imgs/headImage/img'+num+'.jpg';
  connection.query(sql2,[randomUserID,userName,'','','',head,0,'',req.body.phone,req.body.password],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    res.json({status:1}); //注册成功
  });
});

//验证手机号
router.post('/api/regist/phone',function(req,res){
  const sql='select * from user where phoneNumber=?';
  connection.query(sql,[req.body.phone],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    if(results.length!=0){
      res.json({status:0}); //手机号已被注册过
    }else{
      res.json({status:1}); //手机号没有问题，可以注册
    }
  });
});

//查询个人信息
router.post('/api/userinfo',function(req,res){
  const sql='select * from user where userID=?';
  connection.query(sql,[req.body.userID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    res.json(results);
  });
});

//查询收货地址
router.post('/api/address',function(req,res){
  const sql='select * from address where userID=? order by time asc';
  connection.query(sql,[req.body.userID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    res.json(results);
  });
});

//查询用户的默认收货地址
router.post('/api/address/mo',function(req,res){
  const sql='select * from address where userID=? and isDefault=?';
  connection.query(sql,[req.body.userID,'true'],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    console.log(results);
    res.json(results);
  });
});

//添加收货地址
router.post('/api/addAddress',function(req,res){
  console.log("userID",req.body.userID);
  var num;
  var getRandom=function(){  //生成地址ID，6位随机数
    var arr=new Array();
    for(var j=1;j<=6;j++){
      arr.push(j);
    }

    var len=arr.length;
    var result=[];
    var r;
    for(var i=0;i<len;i++){
      r=Math.floor(Math.random()*arr.length);
      result.push(arr[r]);
    }
    var number='';
    for(var k=0;k<result.length;k++){
      number+=result[k];
    }
    return parseInt(number);

  }
  var randomAddressID=getRandom();
  log(randomAddressID);

  const sql1='select * from address where addressID=?';
  connection.query(sql1,[randomAddressID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    var rlen=results.length;
    while(rlen!=0){
      randomAddressID=getRandom();
      return connection.query(sql1,[randomAddressID],function(err,results){
        if(err){
          console.error(err);
          process.exit(1);
        }
        rlen=results.length;
      });
    }
  });

  if(req.body.isDefault==true){
    const sql2='insert into address values(?,?,?,?,?,?,?,null)';
    connection.query(sql2,[randomAddressID,req.body.userID,req.body.name,req.body.phone,req.body.area,req.body.detail,'true'],function(err,results){
      if(err){
        console.error(err);
        process.exit(1);
      }
    });

    const sql3='update address set isDefault=? where userID=? and addressID!=?';
    connection.query(sql3,['false',req.body.userID,randomAddressID],function(err,results){
      if(err){
        console.error(err);
        process.exit(1);
      }
      res.json({status:1}); //插入成功
    });
  }else{
    const sql2='insert into address values(?,?,?,?,?,?,?,null)';
    connection.query(sql2,[randomAddressID,req.body.userID,req.body.name,req.body.phone,req.body.area,req.body.detail,'false'],function(err,results){
      if(err){
        console.error(err);
        process.exit(1);
      }
      res.json({status:1}); //插入成功
    });
  }
});

//修改默认地址
router.post('/api/changeDefault',function(req,res){
  if(req.body.isDefault=='true'){
    const sql1='update address set isDefault=? where addressID=?';
    connection.query(sql1,['true',req.body.addressID],function(err,results){
      if(err){
        console.error(err);
        process.exit(1);
      }
    });

    const sql2='update address set isDefault=? where userID=? and addressID!=?';
    connection.query(sql2,['false',req.body.userID,req.body.addressID],function(err,results){
      if(err){
        console.error(err);
        process.exit(1);
      }
    });
  }else{
    const sql='update address set isDefault=? where addressID=?';
    connection.query(sql,['false',req.body.addressID],function(err,results){
      if(err){
        console.error(err);
        process.exit(1);
      }
    });
  }
});

//查询某一特定地址
router.post('/api/specificAddress',function(req,res){
  const sql1='select * from address where addressID=?';
  connection.query(sql1,[req.body.addressID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    res.json(results);
  });
});

//修改收货地址
router.post('/api/editAddress',function(req,res){
  log(req.body.isDefault);
  log(req.body.addressID);
  if(req.body.isDefault==true){
    const sql1='update address set name=?,phone=?,area=?,detail_address=?,isDefault=? where addressID=?';
    connection.query(sql1,[req.body.name,req.body.phone,req.body.area,req.body.detail,'true',req.body.addressID],function(err,results){
      if(err){
        console.error(err);
        process.exit(1);
      }
    });
    
    const sql2='update address set isDefault=? where userID=? and addressID!=?';
    connection.query(sql2,['false',req.body.userID,req.body.addressID],function(err,results){
      if(err){
        console.error(err);
        process.exit(1);
      }
      log('修改完毕');
      res.json({status:1}); //修改成功
    });
    
    
  }else{
    const sql='update address set name=?,phone=?,area=?,detail_address=?,isDefault=? where addressID=?';
    connection.query(sql,[req.body.name,req.body.phone,req.body.area,req.body.detail,'false',req.body.addressID],function(err,results){
      if(err){
        console.error(err);
        process.exit(1);
      }
      res.json({status:1}); //修改成功
    });
  }

});

//删除某一地址
router.post('/api/deleteAddress',function(req,res){
  const sql1='delete from address where addressID=?';
  connection.query(sql1,[req.body.addressID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    const sql2='select * from address where userID=? order by time asc';
    connection.query(sql2,[req.body.userID],function(err,results){
      if(err){
        console.error(err);
        process.exit(1);
      }
      res.json(results);
    });
  });
});

//请求资讯 创意空间
router.post('/api/news/creative',function(req,res){
  const sql1='select * from news where type=? order by time desc';
  connection.query(sql1,['创意空间'],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    res.json(results);
  });
});

//请求某一特定资讯
router.post('/api/news/specific',function(req,res){
  const sql1='select * from news where newsID=?';
  connection.query(sql1,[req.body.newsID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    res.json(results);
  });
});

//搜索
router.post('/api/search',function(req,res){
  const sql='select * from user where userID=?';
  const sql1='update user set searchHistory=? where userID=?';
  connection.query(sql,[req.body.userID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    var old=results[0].searchHistory;
    var newStr=old+req.body.searchText+',';
    connection.query(sql1,[newStr,req.body.userID],function(err,results){
      if(err){
        console.error(err);
        process.exit(1);
      }
    });
  });

  const sql2='select * from product where title like ? or parentType like ? or childType like ? or price like ?';
  var str='%'+req.body.searchText+'%';
  connection.query(sql2,[str,str,str,str],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    console.log('searchResult',results);
    res.json(results);
  });
});

//删除搜索历史记录
router.post('/api/delete/history',function(req,res){
  const sql1='update user set searchHistory=? where userID=?';
  connection.query(sql1,['',req.body.userID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    const sql2='select * from user where userID=?';
    connection.query(sql2,[req.body.userID],function(err,results){
      if(err){
        console.error(err);
        process.exit(1);
      }
      res.json(results);
    });
  });
});

//请求首页商品数据
router.post('/api/home',function(req,res){
  const sql='select * from product';
  connection.query(sql,function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    // console.log(results);
    res.json(results);
  });
});

//请求父类商品数据
router.post('/api/goods/Typeparent',function(req,res){
  const sql='select * from product where parentType=?';
  connection.query(sql,[req.body.type],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    // console.log(results);
    res.json(results);
  });
});
//请求子类商品数据
router.post('/api/goods/Typechild',function(req,res){
  const sql='select * from product where childType=?';
  connection.query(sql,[req.body.type],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    // console.log(results);
    res.json(results);
  });
});


//请求点击的商品数据
router.post('/api/goods',function(req,res){
  const sql='select * from product where productID=? ';
  connection.query(sql,[req.body.productID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    // console.log(results);
    res.json(results);
  });
});

//请求首页导航栏商品类型数据
router.post('/api/goods/commodity',function(req,res){
  const sql='select * from product where parentType=? ';
  connection.query(sql,['生活日用'],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    // console.log(results);
    res.json(results);
  });
});

//请求商品规格数据
router.post('/api/goods/type',function(req,res){
  const sql='select * from specification where productID=? ';
  connection.query(sql,[req.body.productID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    // console.log(results);
    res.json(results);
  });
});

//购买时，请求要购买的商品信息
router.post('/api/buy',function(req,res){
  const sql1='select * from product where productID=? ';
  const sql2='select * from shoppingcart,product where shoppingcart.productID=product.productID and cartID=?';
  var sql3="select * from shoppingcart,product where shoppingcart.productID=product.productID and cartID in(";
  if(req.body.parameter=='single'){
    connection.query(sql1,[req.body.productID],function(err,results){
      if(err){
        console.error(err);
        process.exit(1);
      }
      // console.log(results);
      res.json(results);
    });
  }else{
    const len=req.body.cartIDArray.length;
    if (len==1){
      connection.query(sql2,[req.body.cartIDArray[0]],function(err,results){
        if(err){
          console.error(err);
          process.exit(1);
        }
        res.json(results);
      });
    }else{
      for(var i=0;i<len-1;i++){
        sql3=sql3+"'"+req.body.cartIDArray[i]+"'"+',';
      }
      sql3=sql3+"'"+req.body.cartIDArray[len-1]+"'"+")";
      // console.log(sql3);
      connection.query(sql3,function(err,results){
        if(err){
          console.error(err);
          process.exit(1);
        }
        res.json(results);
      });
    }
  }
});

//添加购物车
router.post('/api/addToCart',function(req,res){
  const sql1='select * from shoppingcart where userID=? and productID=? and type=?;';
  const sql2='update shoppingcart set amount=amount+1 where userID=? and productID=? and type=?;'
  const sql3='insert into shoppingcart values(uuid(),?,?,?,?,now());';
  connection.query(sql1,[req.body.userID,req.body.productID,req.body.type],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    if(results.length==1){
      connection.query(sql2,[req.body.userID,req.body.productID,req.body.type],function(err,results){
        if(err){
          console.error(err);
          process.exit(1);
        }
        res.json({status:1}); //1表示添加购物车成功
      });
    }else{
      connection.query(sql3,[req.body.userID,req.body.productID,req.body.type,req.body.num],function(err,results){
        if(err){
          console.error(err);
          process.exit(1);
        }
        res.json({status:1}); //1表示添加购物车成功
  });
    }
  });
});

//请求购物车数据
router.post('/api/shoppingCart',function(req,res){
  const sql='select * from shoppingcart,product where userID=? and shoppingcart.productID=product.productID order by addTime desc;';
  connection.query(sql,[req.body.userID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    // console.log(results);
    res.json(results); 
  });
});

//删除购物车数据
router.post('/api/deleteCart',function(req,res){
  const sql='delete from shoppingcart where cartID=?';
  for(var i=0;i<req.body.array.length;i++){
    connection.query(sql,[req.body.array[i]],function(err,results){
      if(err){
        console.error(err);
        process.exit(1);
      }
    });
  }
  res.json({status:1}); //1表示删除购物车数据成功
});

//修改添加至购物车的商品的数量
router.post('/api/addNum',function(req,res){
  const sql='update shoppingcart set amount=? where cartID=?';
  connection.query(sql,[req.body.num,req.body.cartID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    res.json({status:1}); //1表示修改成功
  });
});
router.post('/api/dropNum',function(req,res){
  const sql='update shoppingcart set amount=? where cartID=?';
  connection.query(sql,[req.body.num,req.body.cartID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    res.json({status:1}); //1表示修改成功
  });
});

//请求用户所有的银行卡信息
router.post('/api/bankcard',function(req,res){
  const sql='select * from bankcard where userID=?';
  connection.query(sql,[req.body.userID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    res.json(results); 
  });
});

//请求用户某一银行卡信息
router.post('/api/specific/bankcard',function(req,res){
  const sql='select * from bankcard where userID=? and bankcardID=?';
  connection.query(sql,[req.body.userID,req.body.bankcardID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    res.json(results); 
  });
});

//添加银行卡
router.post('/api/add/bankcard',function(req,res){
  var getRandom=function(){  //生成用户ID，6位随机数
    var arr=new Array();
    for(var j=1;j<=6;j++){
      arr.push(j);
    }

    var len=arr.length;
    var result=[];
    var r;
    for(var i=0;i<len;i++){
      r=Math.floor(Math.random()*arr.length);
      result.push(arr[r]);
    }
    var number='';
    for(var k=0;k<result.length;k++){
      number+=result[k];
    }
    return parseInt(number);

  }
  var randomCardID=getRandom();

  const sql1='select * from bankcard where bankcardID=?';
  connection.query(sql1,[randomCardID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    var rlen=results.length;
    while(rlen!=0){
      randomCardID=getRandom();
      return connection.query(sql1,[randomCardID],function(err,results){
        if(err){
          console.error(err);
          process.exit(1);
        }
        rlen=results.length;
      });
    }
  });

  var newCardnumber=req.body.cardnumber.replace(/\s/g,'').replace(/(.{4})/g,"$1 "); //每隔4位插入一个空格
  const sql2="insert into bankcard values(?,?,?,?,?)";
  connection.query(sql2,[randomCardID,req.body.userID,req.body.bankname,req.body.cardholder,newCardnumber],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    res.json({"status":1}); //添加银行卡成功
  });
});

//删除银行卡
router.post('/api/delete/bankcard',function(req,res){
  const sql1='delete from bankcard where bankcardID=?';
  const sql2='select * from bankcard where userID=?';
  connection.query(sql1,[req.body.bankcardID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    connection.query(sql2,[req.body.userID],function(err,results){
      if(err){
        console.error(err);
        process.exit(1);
      }
      res.json(results);
    });
  });
});

//充值
router.post('/api/topup',function(req,res){
  const sql='update user set userBalance=? where userID=?';
  connection.query(sql,[req.body.money,req.body.userID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    res.json({"status":1}); //1表示修改成功
  });
});

//生成订单
router.post('/api/creatOrder',function(req,res){
  // console.log(req.body.currentDate);
  console.log(req.body.productID);
  console.log(req.body.type);
  console.log(req.body.amount);
  const sql2='update specification set soldNum=?,stockNum=? where productID=? and type=?';
  const sql4='select soldNum,stockNum from specification where productID=? and type=?'
  if(req.body.isPay==true){
    const sql3='update user set userBalance=? where userID=?';
    connection.query(sql3,[req.body.restMoney,req.body.userID],function(err,results){
      if(err){
        console.error(err);
        process.exit(1);
      }
    });
  }
  if(req.body.parameter=='single'){
    var timestamp=new Date().getTime();
    const sql='insert into orderform values(?,?,?,?,?,?,?,?)';
    connection.query(sql,[timestamp+'',req.body.userID,req.body.productID,req.body.amount,req.body.type,req.body.status,req.body.currentDate,req.body.address],function(err,results){
      if(err){
        console.error(err);
        process.exit(1);
      }
      // res.json({"status":1}); //1表示插入成功
      connection.query(sql4,[req.body.productID,req.body.type],function(err,results){
        if(err){
          console.error(err);
          process.exit(1);
        }
        console.log(results[0].soldNum,results[0].stockNum);
        var newsoldNum=results[0].soldNum+req.body.amount;
        var newstockNum=results[0].stockNum-req.body.amount;
        connection.query(sql2,[newsoldNum,newstockNum,req.body.productID,req.body.type],function(err,results){
          if(err){
            console.error(err);
            process.exit(1);
          }
          res.json({"status":1}); //1表示插入成功
        });
      });
    });
  }
  else{
    const sql='insert into orderform values(?,?,?,?,?,?,?,?)';
    connection.query(sql,[req.body.orderNumber,req.body.userID,req.body.productID,req.body.amount,req.body.type,req.body.status,req.body.currentDate,req.body.address],function(err,results){
      if(err){
        console.error(err);
        process.exit(1);
      }
      connection.query(sql4,[req.body.productID,req.body.type],function(err,results){
        if(err){
          console.error(err);
          process.exit(1);
        }
        console.log(results[0].soldNum,results[0].stockNum);
        var newsoldNum=results[0].soldNum+req.body.amount;
        var newstockNum=results[0].stockNum-req.body.amount;
        connection.query(sql2,[newsoldNum,newstockNum,req.body.productID,req.body.type],function(err,results){
          if(err){
            console.error(err);
            process.exit(1);
          }
          res.json({"status":1}); //1表示插入成功
        });
      });
    });
  }
});

//删除订单
router.post('/api/cancelOrder',function(req,res){
  // console.log(req.body.currentDate);
  // console.log(req.body.productID);
  // console.log(req.body.type);
  // console.log(req.body.amount);
  const sql1='delete from orderform where orderNumber=?';
  const sql2='select soldNum,stockNum from specification where productID=? and type=?'
  const sql3='update specification set soldNum=?,stockNum=? where productID=? and type=?';
  connection.query(sql1,[req.body.orderNumber],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    connection.query(sql2,[req.body.productID,req.body.type],function(err,results){
      if(err){
        console.error(err);
        process.exit(1);
      }
      // console.log(results[0].soldNum,results[0].stockNum);
      var newsoldNum=results[0].soldNum-req.body.amount;
      var newstockNum=results[0].stockNum+req.body.amount;
      connection.query(sql3,[newsoldNum,newstockNum,req.body.productID,req.body.type],function(err,results){
        if(err){
          console.error(err);
          process.exit(1);
        }
        res.json({"status":1}); //1表示删除订单成功
      });
    });
  });
});

//支付
router.post('/api/pay',function(req,res){
  const sql1="update orderform set orderStatus=?,createTime=? where orderNumber=?";
  const sql2="update user set userBalance=? where userID=?";
  connection.query(sql1,['已付款',req.body.time,req.body.orderNumber],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    connection.query(sql2,[req.body.restMoney,req.body.userID],function(err,results){
      if(err){
        console.error(err);
        process.exit(1);
      }
      res.json({"status":1}); //1表示支付成功
    });
  });
});

//确认收货
router.post('/api/gain',function(req,res){
  const sql="update orderform set orderStatus=? where orderNumber=?";
  connection.query(sql,['已完成',req.body.orderNumber],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    res.json({"status":1}); //1表示修改订单状态成功
  });
});

//请求所有订单数据
router.post('/api/order',function(req,res){
  // const sql="select *,group_concat(productID) 'productIDStr' from orderform where userID=? group by orderNumber;";
  const sql="select orderform.*,product.images,product.title,product.price from orderform,product where userID=? and product.productID=orderform.productID order by createTime desc";
  connection.query(sql,[req.body.userID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    res.json(results); 
  });
});

//请求不同订单状态下的订单数据
router.post('/api/order/specific',function(req,res){
  // const sql="select *,group_concat(productID) 'productIDStr' from orderform where userID=? group by orderNumber;";
  const sql="select orderform.*,product.images,product.title,product.price from orderform,product where userID=? and orderStatus=? and product.productID=orderform.productID order by createTime desc";
  connection.query(sql,[req.body.userID,req.body.orderStatus],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    res.json(results); 
  });
});

//请求某一订单对应的所有商品数据
router.post('/api/orderNumber',function(req,res){
  const sql1="select product.productID,product.title,product.price,product.images,orderform.type,orderform.amount from orderform,product where userID=? and orderNumber=? and product.productID=orderform.productID";
  const sql2="select * from comment where userID=? and productID=? and orderNumber=?";
  connection.query(sql1,[req.body.userID,req.body.orderNumber],function(err,results1){
    if(err){
      console.error(err);
      process.exit(1);
    }
    res.json(results1);
    // results1.forEach(function(e){
    //   connection.query(sql2,[req.body.userID,e.productID,req.body.orderNumber],function(err,results){
    //     if(err){
    //       console.error(err);
    //       process.exit(1);
    //     }
    //     e['commentData']=results;
    //   });
    // }) 
  });

});

//请求某一订单详情信息
router.post('/api/order/detail',function(req,res){
  const sql="select orderform.*,product.title,product.price,product.images from orderform,product where orderNumber=? and product.productID=orderform.productID";
  connection.query(sql,[req.body.orderNumber],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    res.json(results); 
  });
});

//添加评论
router.post('/api/add/comment',function(req,res){
  const sql="insert into comment values(uuid(),?,?,?,?,?,?)";
  connection.query(sql,[req.body.userID,req.body.productID,req.body.orderNumber,req.body.content,req.body.time,req.body.level],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    res.json({"status":1}); 
  });
});

//请求用户所有评论
router.post('/api/comment',function(req,res){
  const sql="select * from comment,product where userID=? and comment.productID=product.productID order by time desc";
  connection.query(sql,[req.body.userID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    res.json(results); 
  });
});

//请求某商品对应的所有评论
router.post('/api/goods/comment',function(req,res){
  const sql="select * from comment,user where comment.productID=? and comment.userID=user.userID order by time desc";
  connection.query(sql,[req.body.productID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    res.json(results); 
  });
});

//请求某用户是否评论过某商品
router.post('/api/comment/specific',function(req,res){
  console.log(req.body.userID,req.body.productID,req.body.orderNumber);
  const sql="select * from comment where userID=? and productID=? and orderNumber=?";
  connection.query(sql,[req.body.userID,req.body.productID,req.body.orderNumber],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    // console.log(results);
    res.json(results); 
  });
});

app.use(router);

app.listen(8080);


