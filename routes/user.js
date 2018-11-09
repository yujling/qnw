const express=require('express');
const router=express.Router();
const pool=require('../pool');
router.get('/signin',(req,res)=>{
    var uname=req.query.uname;
    var upwd=req.query.upwd;
    console.log(uname,upwd);
    var sql="SELECT * FROM `qnw_user` WHERE uname=? AND upwd=?;";
    pool.query(sql,[uname,upwd],(err,result)=>{
        if(err) throw err;
        console.log(2,result);
        if(result.length>0){
            uid=result[0].uid
            req.session.uid=uid;
            console.log( req.session.uid);
            res.send({code:1,msg:[uname,uid]});
        }
        else
        res.send({code:-1,msg:"登录失败！"});
    })
})  //http://127.0.0.1:3001/user/signin?uname=21365415416542&upwd=army123456
router.get('/register',(req,res)=>{
   var {uname,upwd,email,user_name,gender}=req.query;
   var sql="SELECT * FROM `qnw_user` WHERE uname=?";
   pool.query(sql,[uname],(err,result)=>{
       if(err)  throw err;
       if(result.length>0){
           res.send({code:-1,msg:"用户名已存在！"});
       }else{
           var sql="INSERT INTO `qnw_user`(`uid`, `uname`, `upwd`,`email`,`user_name`,`gender`) VALUES (null,?,?,?,?,?)";
            pool.query(sql,[uname,upwd,email,user_name,gender],(err,result)=>{
                if(err)  throw err;
               // console.log(result);
               if(result. affectedRows==1){
                   res.send({code:1,msg:"注册成功"});
               }else{
                   res.send({code:-2,msg:"注册失败！"});
               }
               // http://127.0.0.1:3001/user/register?uname=dingding&upwd=123456
            });
       }
  });
})
router.get('/islogin',(req,res)=>{
      if(req.session.uid!==undefined){
          var uid=req.session.uid;
          console.log(uid);
          var sql="SELECT uname FROM `qnw_user` WHERE uid=?";
          pool.query(sql,[uid],(err,result)=>{
              if(err)  throw err;
              console.log(result);
              if(result.length>0){
                  res.send({code:1,uname:result[0].uname})
              }else{
                  res.send({code:-1})
              }
          })
      }else{
          res.send({code:-1,msg:"用户未登录！"})
      }
})
router.get('/signout',(req,res)=>{
    req.session.uid=undefined;
    res.send({code:1,msg:"注销成功"});
})
//生成激活码
router.get('/getcode',(req,res)=>{
        var str="0123456789";  //验证码可能包含的字符
        var mcode='';   //用来存放产生的随机数
        for(var i=0;i<4;i++){
              var index=Math.floor(Math.random()*10);  //产生的随机数作为str的下标，获取随机数中的字符
              mcode+=str.charAt(index);  //将随机产生的数字当做字符串的位置下标，在字符串str中取出该字符串，并加入到res中
        }
    //     res.writeHead(200,{"Content-Type":"application/text;charset=utf-8"});
    //    res.write(JSON.stringify("ok"));
    //     res.end();
    res.send({code:1,mcode})
})
module.exports=router;