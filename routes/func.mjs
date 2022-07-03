import fs from 'fs';
import express from 'express';
import path from 'path';

const url = new URL(import.meta.url).pathname;
console.log(url);
const routePath = path.basename(url,'.mjs');
console.log(routePath);

const router = express.Router();
let _count = 0;

/**
 * @swagger
 * tag:
 *   name: func
 *   description: internal functions
 */

 /**
 * @swagger
 * /func/counter:
 *   get:
 *     tags:
 *       - func
 *     description: counter の値を返す。
 *     produces:
 *       - application/json
 *     parameters:
 *     responses:
 *       200:
 *         description: 処理成功
 *         examples:
 *           result:
 *              status: "OK"
 *              count: 処理後のcounterの値
 *   post:
 *     tags:
 *       - func
 *     description: counter をインクリメントする。
 *     produces:
 *       - application/json
 *     parameters:
 *     responses:
 *       200:
 *         description: 処理成功
 *         examples:
 *           result:
 *              status: "OK"
 *              count: 処理後のcounterの値
 *   delete:
 *     tags:
 *       - func
 *     description: counterに0をセットする。
 *     produces:
 *       - application/json
 *     parameters:
 *     responses:
 *       200:
 *         description: 処理成功
 *         examples:
 *           result:
 *              status: "OK"
 *              count: 処理後のcounterの値
 */
router.get('/counter',(req,res)=>{
  console.log("GET /"+routePath+"/count");
  res.json({status:"OK",count:_count});
});

router.post('/counter',(req,res)=>{
  console.log("POST /"+routePath+"/count");
  _count ++;
  res.json({status:"OK",count:_count});
});

router.delete('/counter',(req,res)=>{
  console.log("DELETE /"+routePath+"/count");
  _count = 0;
  res.json({status:"OK",count:_count});
});

export default router;
