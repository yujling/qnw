(async function(){
    window.onload=function(){
        //1.轮播图3D 效果
       var ol = document.getElementsByTagName("ol");  //获得一个类数组
       var ul = document.getElementsByTagName("ul"); 
       var oLi=ol[0].getElementsByTagName("li");
      var uLi=ul[0].getElementsByTagName("li");
    //    var bWidth=document.getElementById("banner").offsetWidth;
    //    //alert(bWidth);
    //    getnum(4);
       for(var i=0;i<oLi.length;i++){
           (function(i){
           oLi[i].onclick=function(){
               //alert(i);
                for(var  j=0;j<uLi.length;j++){
                    (function(i){
                    uLi[j].style.transform="translateZ(-144px) rotateX("+i*-90+"deg)";  //通过旋转的角度来改变图片 点击第一个按钮，就不旋转；点击第二个按钮，旋转90度；点击第三个按钮，旋转180度；点击第四个按钮，旋转270度
                    })(i)  // 两个闭包
               } 
               for(var k=0;k<uLi.length;k++){  //循环ol>li 每点击一次ol>li
                oLi[k].className="";   //就将所有的ol>li类清理掉
               }
              this.className="on";    //将当前的li加上类on(改变按钮的背景颜色)
             }
           })(i)
       }
       //划分ul下面li的个数，即长方体的个数
    //    function getnum(num){ 
    //        var uHTML="" ,pHTML;
    //        //获得每个ul>li中li的宽度
    //     var liWidth=bWidth/num;
    //     for(var i=0;i<num;i++){
    //         uHTML +="<li><div></div><div></div><div></div><div></div></li>"
    //     }  // 有几个num就有几个li,就有几个长方体
    //     ul[0].innerHTML=uHTML;
   // }; 
    }
   //2.楼层1js效果；
   var a=$qsa(".left_thjs_p>a");
  // console.log(a);
   //console.log(a[0]);
   var  Div=$qsa(".s_d2>div.left_thjs>div");
   //console.log(1,Div[0]);
  // console.log(Div);
   for(var i=0;i<a.length;i++){
        a[i].onclick= a[i].onmouseenter= function(e){
           var j= e.target.href.slice(-1);
           if(j==2){
            Div[j-1].style.display="block";
            Div[j-1].previousElementSibling.style.display="none";
            Div[j-1].nextElementSibling.style.display="none";
           }else if(j==1){
            Div[j-1].style.display="block";
            Div[1].style.display="none";
            Div[2].style.display="none";
           }else if(j==3){
            Div[j-1].style.display="block";
            Div[0].style.display="none";
            Div[1].style.display="none"; 
           }
       
        }
   }
    //3.向后台发送ajax请求，动态加载楼层1
    var res=await ajax({
        url:"http://127.0.0.1:3001/index/list",
        type:"get",
        dataType:"json"
    })  //{pid: 1, title: "丽江—大理,丽江 6天5晚半自助游", details: "随心定制纯玩自由行+可升级香格里拉泸沽湖+尊享特色客栈", pic: "img/index/6.jpg", price: 1050, …}
    //console.log(res);
    var p=res[0];  //取第一个 
    var parent=$qs("#today1>ul.today1_1");   //第一个商品信息的父元素div
    //解析第一个商品
    var {pid,details,pic,price,title}=p;
    var html=` <li class="left_img_font">
                   <img src="${pic}" alt="" class="img1"/>
                    <div class="font_1">
                        <p class="font_2">${title}</p>
                        <p class="font_3">${details}</p>
                        <p class="font_4">￥${price.toFixed(2)}</p>
                   </div>
                </li>`;
   //第2个
   for(var p of res.slice(1,3)){
    var {pid,details,pic,price,title}=p;
    html+=` <li >
    <img src="${pic}" alt="" class="img2"/>
     <div class="font_1">
         <p class="font_5">${title}</p>
         <p class="font_6">${details}</p>
         <p class="font_4">￥${price.toFixed(2)}</p>
    </div>
 </li>`;
   }
   //将html片段插入父元素中
    parent.innerHTML=html;
      //第4，5,6 个
     parent=$qsa("#today1>ul.today1_1")[1]
     var p=res[3];  //取第一个 
     //解析第一个商品
     var {pid,details,pic,price,title}=p;
     html='';
     html=` <li class="left_img_font">
                   <img src="${pic}" alt="" class="img1"/>
                    <div class="font_1">
                        <p class="font_2">${title}</p>
                        <p class="font_3">${details}</p>
                        <p class="font_4">￥${price.toFixed(2)}</p>
                   </div>
                </li>`;
    //第2,3 个
    for(var p of res.slice(3,5)){
     var {pid,details,pic,price,title}=p;
     html+=` <li >
     <img src="${pic}" alt="" class="img2"/>
      <div class="font_1">
          <p class="font_5">${title}</p>
          <p class="font_6">${details}</p>
          <p class="font_4">￥${price.toFixed(2)}</p>
     </div>
  </li>`;
    }
     parent.innerHTML=html;
     //图片轮播2
     let lis=$qsa("ul.cut li");   //获取所有的li
     //console.log(lis);
     for(var i=0;i<lis.length;i++){
        lis[i].style.left=`${Math.ceil(Math.random()*900)}px`;
        lis[i].style.top=`${Math.ceil(Math.random()*580)}px`;//为每个li随机生成一个位置
        //console.log( lis[i].style.left);
        //console.log( lis[i].style.top);
     }
     //浏览器窗口的高度+页面滚动的高度>元素距文档(document)顶部的高度时，碎片图片拼接回去
     window.onscroll=function(){  
             //console.log(111); 
             var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
            // console.log(scrollTop);  
            //  var  wTop=window.scrollTop;    //获取相当于window的鼠标滚动的高度
            //  var  wH=window.height;         //获取相当于window的高度
            //  var viewBottom=wTop+wH;          //用户视野范围内
            //  console.log(wTop,wH,viewBottom);
            //  var lis=$qsa("ul.cut>li");
            //  var ulCutTop=$qs("ul.cut").offset().top;
             if(scrollTop>800){
                 for(var i=0;i<lis.length;i++){
                    lis[i].style.height="96px";
                    lis[i].style.opacity=1; 
                 }
                 //第一张图片
                var  arr1=$qsa("ul.banner>li.o1");	
               // console.log(arr1);
                 arr1[0].style.left=0;
                 arr1[0].style.top=0;  //1
                 arr1[1].style.left="157px";
                 arr1[1].style.top=0;//2
                 arr1[2].style.left=`314px`;
                 arr1[2].style.top=0;  //3
                 arr1[3].style.left=`471px`;
                 arr1[3].style.top=0;  //4
                 arr1[4].style.left=`628px`; 
                 arr1[4].style.top=0;     //5
                 arr1[5].style.left=`785px`;
                 arr1[5].style.top=0;//6

                 arr1[6].style.left=`0`;   
                 arr1[6].style.top=`96px`;//7
                 arr1[7].style.left=`157px`;                  
                 arr1[7].style.top=`96px`;   //8             
                 arr1[8].style.left=`314px`;                  
                 arr1[8].style.top=`96px`; //9           
                 arr1[9].style.left=`471px`;                    
                 arr1[9].style.top=`96px`;  //10
                 arr1[10].style.left=`628px`;
                 arr1[10].style.top=`96px`;//11
                 arr1[11].style.left=`785px`;
                 arr1[11].style.top=`96px`;  //12

                 arr1[12].style.left=0;
                 arr1[12].style.top=`192px`;  //13
                 arr1[13].style.left=`157px`; 
                 arr1[13].style.top=`192px`;     //14
                 arr1[14].style.left=`314px`;
                 arr1[14].style.top=`192px`;//15
                 arr1[15].style.left=`471px`;   
                 arr1[15].style.top=`192px`;//16
                 arr1[16].style.left=`628px`;  
                 arr1[16].style.top=`192px`;   //17
                 arr1[17].style.left=`785px`; 
                 arr1[17].style.top=`192px`; //18
 
                 var  arr2=$qsa("ul.cut>li.o2");	
                 arr2[0].style.left=0;
                 arr2[0].style.top="292px";  //1
                 arr2[1].style.left=`157px`;
                 arr2[1].style.top="292px";//2
                 arr2[2].style.left=`314px`;
                 arr2[2].style.top="292px";  //3
                 arr2[3].style.left=`471px`;
                 arr2[3].style.top="292px";  //4
                 arr2[4].style.left=`628px`; 
                 arr2[4].style.top="292px";     //5
                 arr2[5].style.left=`785px`;
                 arr2[5].style.top="292px";//6

                 arr2[6].style.left=0;   
                 arr2[6].style.top=`388px`;//7
                 arr2[7].style.left=`157px`;                  
                 arr2[7].style.top=`388px`;   //8             
                 arr2[8].style.left=`314px`;                  
                 arr2[8].style.top=`388px`; //9           
                 arr2[9].style.left=`471px`;                    
                 arr2[9].style.top=`388px`;  //10
                 arr2[10].style.left=`628px`;
                 arr2[10].style.top=`388px`;//11
                 arr2[11].style.left=`785px`;
                 arr2[11].style.top=`388px`;  //12
                 arr2[12].style.left=0;
                 arr2[12].style.top=`484px`;  //13
                 arr2[13].style.left=`157px`; 
                 arr2[13].style.top=`484px`;     //14
                 arr2[14].style.left=`314px`;
                 arr2[14].style.top=`484px`;//15
                 arr2[15].style.left=`471px`;   
                 arr2[15].style.top=`484px`;//16
                 arr2[16].style.left=`628px`;  
                 arr2[16].style.top=`484px`;   //17
                 arr2[17].style.left=`785px`; 
                 arr2[17].style.top=`484px`; //18
                //  setTimeout(()=>{
                //     $qsa(".cut_img>div")[0].style.width="288px";   
                //     $qsa(".cut_img>div")[1].style.width="288px";
                // },2500);
             }
            }
})()