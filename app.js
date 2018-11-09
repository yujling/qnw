//使用express模块创建服务器
//引进模块
const express=require('express');
const bodyParser=require('body-parser');
const session=require('express-session');  //引入session模块，解决
const cors=require('cors');  //引入cors模块，解决跨域问题
const user=require('./routes/user');
const imagelist=require('./routes/imagelist');
const index=require('./routes/index');
var app=express();
app.use(cors({  //配置cors模块
    origin:"http://127.0.0.1:3001",  //http://localhost:3001
    credentials:true
}))
var server=app.listen(3001);

//使用body-parser中间件
app.use(bodyParser.urlencoded({extended:false}));
//将静态资源挂在到public文件下
app.use(express.static(__dirname+"/public"));
app.use(session({
    secret:'随机字符串',
    resave:false,
    saveUninitialized:true
}))
app.use('/user',user);
app.use('/index',index);
app.use('/imagelist',imagelist);