//1.封装ajax.js
function ajax({url,type,data,dataType}){
  return new Promise(function(open,err){
		//1. 创建xhr对象
		var xhr=new XMLHttpRequest();
		//2.绑定监听事件
		xhr.onreadystatechange=function(){
			if(xhr.readyState==4&&xhr.status==200){
				if(dataType!==undefined
					&&dataType.toLowerCase()==="json")
					var res=JSON.parse(xhr.responseText)
				else
					var res=xhr.responseText;
				open(res);
			}
		}
		if(type.toLowerCase()=="get"&&data!=undefined){
			url+="?"+data;
		}
		//3.打开连接
		xhr.open(type,url,true);
		if(type.toLowerCase()==="post")
			//增加：设置请求消息头
			xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		//4.发送请求
		if(type.toLowerCase()=="post"&&data!==undefined)
			xhr.send(data);
		else
			xhr.send(null);
  })
}
//2.封装document.getElementById()
function $(id){
	return document.getElementById(id);
}
//3.封装document.querySelector($class)
function $qs($class){
    return document.querySelector($class);
}
//4.封装document.querySelectorAll($class)
function $qsa($class){
    return document.querySelectorAll($class);
}
//5.封装验证码
function code(c3,save){   //c3表示传入的canvas画布  save是一个空数组，用来保存产生的验证码
	return  function(){
		var ctx=c3.getContext("2d"); 
		//1.创建一个矩形为验证码创建背景(颜色随机)
		ctx.fillStyle=rc(150,230);
		ctx.fillRect(0,0,96,30);
		//2.4个字符,颜色随机
		var str="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
		for(var i=0;i<4;i++){
						var c=str[rn(0,str.length)];
						ctx.textBaseline="top";
						ctx.font="23px Semhei";
						ctx.fillStyle=rc(0,150);
						ctx.fillText(c,16*i+5,rn(0,5));
						save[i]=c;
		}
		//3.5条直线，颜色随机
		for(var i=0;i<20;i++){
						ctx.beginPath();
						ctx.moveTo(rn(0,96),rn(0,30));
						ctx.lineTo(rn(0,96),rn(0,30));
						ctx.strokeStyle=rc(0,150);
						ctx.stroke();
		}
		//4.20个小圆点，颜色随机
		for(var i=0;i<20;i++){
						ctx.beginPath();
						ctx.arc(rn(0,96),rn(0,30),1,0,2*Math.PI);
						ctx.fillStyle=rc(0,255);
						ctx.fill();
				
		}
		//5.两个函数   产生随机数
				function rn(min,max){
								var num=Math.floor(Math.random()*(max-min)+min);
								return num;
				}
				function rc(min,max){
								var r=rn(min,max);
								var g=rn(min,max);
								var b=rn(min,max);
								return `rgb(${r},${g},${b})`
				}
}
}