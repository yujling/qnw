const express=require("express");
const router=express.Router();
const pool=require("../pool");

//index/
router.get("/list",(req,res)=>{
  var sql="SELECT * FROM `qnw_index_product`  WHERE seq_recommended!=0 ORDER BY seq_recommended";
  pool.query(sql,[],(err,result)=>{
    if(err)
      console.log(err);
    res.send(result);
  })
})

module.exports=router;