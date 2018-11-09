(async function(){
   var islogin=false;
   var nav1=$qs(".nav_d1");
   ajax({
       url:"http://127.0.0.1:3001/user/islogin",
       type:"get",
       dataType:"json"
   }).then(res=>{
       if(res.code==1){
           islogin=true;
           nav1.innerHTML=`<span class="welcome">欢迎${res.uname}用户！</span><span>|</span><span><a href="#">消息</a></span> <span>|</span> <span><a href="#">查看订单</a></span><span>|</span><span>|</span><span><a href="#">联系客服</a></span>
           <span><a href="#" id="signout">注销</a></span>`
       }
   }).then(function(){
    var signout=document.getElementById("signout");
    signout.onclick=function(){
        ajax({
            url:"http://127.0.0.1:3001/user/signout",
            type:"get",
            dataType:"json"
        }).then(res=>{
            islogin=false;
            nav1.innerHTML=` <span>请</span>
            <span><a href="http://127.0.0.1:3001/login.html" target="_blank">登录</a></span>
            <span>或</span>
            <span><a href="http://127.0.0.1:3001/register.html" target="_blank">免费注册</a></span>
            <span>|</span>
            <span>消息</span>
            <span>|</span>
            <span>查看订单</span>
            <span>|</span>
            <span>积分商城</span>
            <span>|</span>
            <span>联系客服</span>`;
            alert("注销成功！")
        })
    }
   })
  
})()