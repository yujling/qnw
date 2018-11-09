(async function(){
    var process=0;   //作为一个验证通过的标志，每有一项通过，process的值就加1
    window.onload=function(){
    var Div=document.getElementsByClassName("input_position");
    //1.验证用户名(手机号)
    var uname=Div[1].children[1];
    var spanUname=Div[1].children[2];
     uname.onblur=function(){
        var reg=/^(\+86|0086)?\s*1[3-8]\d{9}$/;
        var res=getTest(reg,uname.value);   //调用验证函数getTest()
        if(res=="pass"){
            spanUname.innerHTML="输入正确,验证通过！"
            spanUname.className="vail_success";
            return  process++;  //如果用户名验证通过，则让process的值加1
        }else{
            spanUname.innerHTML="必须为有效的手机号码！"
            spanUname.className="vail_default";
            uname.value="";
            uname.focus();
        }
        return;
    }
//2.验证密码
    var upwd=Div[2].children[1];
    var spanUpwd=Div[2].children[2];
    upwd.onblur=function(){
        var reg=/^\w{6,18}$/;
        var res=getTest(reg,upwd.value);
        if(res=="pass"){
            spanUpwd.innerHTML="输入正确,验证通过！"
            spanUpwd.className="vail_success";
            return  process++;  //如果密码验证通过，则让process的值加1
        }else{
            spanUpwd.innerHTML="密码必须为6~18位的字母或数字！"
            spanUpwd.className="vail_default";
            upwd.value="";
            upwd.focus();
        }
        return;
    }
    //3.验证用户昵称
    var user_name=Div[3].children[1];
    var spanUser_name=Div[3].children[2];
    user_name.onblur=function(){
        var reg=/^\w{6,18}$/;
        var res=getTest(reg,user_name.value);
        if(res=="pass"){
            spanUser_name.innerHTML="输入正确,验证通过！"
            spanUser_name.className="vail_success";
            return  process++;  //如果密码验证通过，则让process的值加1
        }else{
            spanUser_name.innerHTML="昵称必须为6~18位的字母或数字！"
            spanUser_name.className="vail_default";
            user_name.value="";
            user_name.focus();
        }
        return;
    }
 
    function getTest(reg,str){  //封装验证输入的内容是否满足要求
        if(reg.test(str)){
            //alert("验证通过！");
            return "pass";
        }
        return ;
    }
    //5.验证码
    var ucode=Div[5].children[1];
    //var spanUcode=Div[5].children[2];
  //上面的事件整体移到a.onclick下面 
    //产生随机验证码
    var a=document.querySelector("a.replace_a_pies");  
    var c3=$("input_check_code");
    var save=[];  
    code(c3,save)();
    a.onclick=code(c3,save);  
    ucode.onblur=function(){  
        if(ucode.value.toLowerCase()==save.join("").toLowerCase()){  //判断输入的验证码与生成的验证码是否相同
            //alert("验证码输入正确");
            return  process++;  //如果密码验证通过，则让process的值加1
        }else{
            ucode.value="";
            alert("验证码输入错误");
        }
        return;
    }  
//判断是否同意《去哪儿协议》
var check=document.getElementById("regiser_pro");
 if(check.checked==true)
   process++;
var abtn=document.querySelector(".angree_reg");
abtn.onclick=function(){
     //4.验证性别
     var  gender=document.querySelector("input[type='radio']");
     if(gender.checked==1){
         gender=1;
     }else {
       gender=2;
     }
     process++;
     console.log(uname,process);
    if(process==6){
        console.log("同意注册");
        console.log(uname,process);
         ajax({
                     url:"http://127.0.0.1:3001/user/register",
                     type:"get",
                     data:`uname=${uname.value}&upwd=${upwd.value}&user_name=${user_name.value}&gender=${gender}`,
                     dataType:"json"
                 }).then(res=>{
                     if(res.code==1){
                     alert(res.msg);
                     //倒计时十秒跳转页面？
                     window.location.href="./login.html"
                    }else if(res.code==-1){
                        alert(res.msg);
                        window.location.href="./register.html";
                    }else if(res.code==-2){
                        alert(res.msg);
                    }
                 })
    }else{
        alert("请填写完整注册信息");
    }
}
}
})()
    //生成验证码  空数组  画布  
   
    // var str="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";  //验证码可能包含的字符
    // var res='';   //用来存放产生的随机数
    // for(var i=0;i<n;i++){
    //       var index=Math.floor(Math.random()*62);  //产生的随机数作为str的下标，获取随机数中的字符
    //       res+=str.charAt(index);  //将随机产生的数字当做字符串的位置下标，在字符串str中取出该字符串，并加入到res中
    // }
    // return res;  //返回验证码

    //  //4.获取激活码
//  var ujcode=Div[4].children[1];
//  var button=Div[4].children[2];  
//  var code=[];
//  //利用地址传递的原理，解决异步请求的问题(验证输入验证码输入是否正确时，ujcode.value 一值都是unde， 并没有因为输入的值改变而改变)
//  button.onclick=function(){
//      var res=ajax({
//          url:"http://127.0.0.1:3001/user/getcode",
//          type:"get",
//          dataType:"json"
//      }).then(res=>{
//             if(res.code==1){
//                 alert("激活码为:"+res.mcode);
//             }
//            else
//            alert("激活码获取失败！");
//      }).then(function(){
//         code[0]=ujcode.value; 
//          var timer=setTimeout(function(){
//             if(code[0]==res.mcode){
//                 alert("激活码输入正确！");
//                 process++;
//                 console.log(process);
//                 clearInterval(timer);   
//             }else
//                alert("激活码输入失败！");
//   },6000)
//      }).then(function(){
//          var check=document.getElementById("regiser_pro");
//          if(check.checked==true){
//              process++;
//          }
//      })}
 //}