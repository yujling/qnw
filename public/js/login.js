(async function(){
    window.onload=function(){
        var process=0;// 标志
        //1.登录账号和短信验证切换
        var ulogin=$("login_normal");   //登录账号单选按钮
        var nav1=document.querySelector(".login_right");   //登录账号页面
        var plogin=$("login_moble");    //短信登录单选按钮
        var nav2=document.querySelector(".login_right_1");  //短信登录页面
        plogin.onchange=function(){      
            if(plogin.checked){
               nav2.style.display="block"; //短信登录页面显示
               nav1.style.display="none";  //登录账号页面显示
            }
           return;
        }
        //2.手机号
         var uname=$qsa(".login_input")[0];
         var p1=$("p_uname");
          //uname=uname.value;
          uname.onblur=function(){
          if(uname.value){
              process++;
              uname=uname.value;
              p1.className="vail_success";
              p1.innerHTML="验证通过！";
          }else{
              p1.className="vail_default";
              p1.innerHTML="用户名不能为空";
              uname.focus();
              return;
          }
        }
         //3.密码
         var upwd=$qsa(".login_input")[1];
         var p2=$("p_upwd");
         upwd.onblur=function(){
         if(upwd.value){
             process++;
             upwd=upwd.value;
             p2.className="vail_success";
             p2.innerHTML="验证通过！";
         }else{
             p2.className="vail_default";
             p2.innerHTML="密码不能为空";
             upwd.focus();
             return;
         }
        }
        //4.验证码
        var c3=document.querySelector(".canvas");
        var btn1=c3.nextElementSibling;
        var ucode=c3.previousElementSibling;
        var save=[];
        code(c3,save)();
        btn1.onclick=code(c3,save);
        ucode.onblur=function(){  
         if(ucode.value.toLowerCase()==save.join("").toLowerCase()){  //判断输入的验证码与生成的验证码是否相同
            return  process++;  //如果密码验证通过，则让process的值加1
         }else{
            alert("验证码输入错误");
            ucode.value="";
            return false;
        }
       
    } 
    var btn=document.querySelector(".login_btn");
   btn.onclick=function(){
    if(process==3){
        //console.log(process);
        ajax({
            url:`http://127.0.0.1:3001/user/signin?uname=${uname}&upwd=${upwd}`,
            type:"get",
            dataType:"json"
        }).then(res=>{
           if(res.code==1){
               alert("登录成功！返回主页");
               setTimeout(()=>{
                   window.location.href="http://127.0.0.1:3001/index.html";
               },2000);
           }
        });
    }
}  
    }
})()