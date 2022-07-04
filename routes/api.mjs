import fs from 'fs';
import express from 'express';
import path from 'path';

const routePath = path.basename(new URL(import.meta.url).pathname,'.mjs');
console.log(routePath);

const router = express.Router();

/**
 * @swagger
 * tag:
 *   name: api
 *   description: APIs
 */

/**
 * @swagger
 * /api/seq1:
 *   post:
 *     tags:
 *       - api
 *     description: POST /func/counter を 1000msに1回、計10回呼んだ結果を返す。スレッドセーフではないため、結果が開始時の値の+10になることは保証されない。
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: 処理成功
 *         schema:
 *           type: object
 *           properties:
 *             status: 
 *               type: string
 *               description: OK or NG
 *               example: OK
 *             count: 
 *               type: integer
 *               description: 最終的な count の値
 *               example: 10
 */

router.post('/seq1',async (req,res)=>{
  console.log("POST /"+routePath+"/seq1");

  const ROOTURL = req.protocol+'://'+req.get('host');
  let result;
  for(let cnt=0;cnt<10;cnt++){
    let res = await fetch(ROOTURL+'/func/counter',{method:'POST'});
    let json = await res.json();
    if(json && json.status === "OK"){
      console.log("POST /func/counter OK");
      result = json.count;
    } 
    await wait(1000);
  }
  res.json({status:"OK", count:result});
});

async function wait(times){
  return new Promise((resolve)=>{
    console.log("waiting: "+times+" ....");
    setTimeout(()=>{
      console.log("expired!");
      return resolve();
    },times);
  });
}

export default router;
