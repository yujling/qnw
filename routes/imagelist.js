const express=require('express');
const pool=require('../pool');
const router=express.Router();
router.get('/imglist',(req,res)=>{
    var data=req.query;
    var sql="SELECT `cid`, `img`, `title`, `href` FROM `qnw_carousel` ";
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            res.send({code:1,msg:result});
        }else
            res.send({code:-1,msg:result})
    })
})

module.exports=router;