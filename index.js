const express=require('express');
const bodyparser=require('body-parser');
const cors=require('cors');
const mysql=require('mysql2');

const app = express();

app.use(cors());
app.use(bodyparser.json());

//database connection
const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'junaid92',
    database:'simpledb',
    port:3306 
})
//check database connection
db.connect(err=>{
    if(err){console.log('err')}
    console.log('database connected...');
})
//get data
/*app.get('/user',(req,res)=>{
    
    let qr = 'select * from productlist';
    db.query(qr,(err,result)=>{
        if(err){
            console.log(err,'errs');
        }
        if(result.length>0){
            res.send({
                message:'all  data',
                data:result
            })
        }
    })
})*/
//get single data
app.get('/user/:id',(req,res)=>{
    
    let gID = req.params.id;
    let qr = `select * from productlist where productid =${gID}`;
    db.query(qr,(err,result)=>{
        if(err){
            console.log(err,'errs');
        }
        if(result.length>0){
            res.send({
                message:'get single data',
                data:result
            })
        } else{
            res.send({
                message:'data not found'
            })
        }
    })
})
// Get paginated data
app.get('/user', (req, res) => {
    const page = parseInt(req.query.page)  
    const pageSize = parseInt(req.query.pageSize) 

    const offset = (page - 1) * pageSize;
    let qr = `SELECT * FROM productlist LIMIT ${pageSize} OFFSET ${offset}`;

    db.query(qr, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                message: 'Error fetching data'
            });
            return;
        }
        if (result.length > 0) {
            res.send({
                message: 'Paginated data',
                data: result
            });
        } else {
            res.send({
                message: 'No data found'
            });
        }
    });
});



app.post('/user',(req,res)=>{
    console.log(req.body,'createdata');

    let productid =req.body.productid;
    let productname=req.body.productname;
    let categoryid=req.body.categoryid;
    let categoryname=req.body.categoryname;

    let qr=`insert into productlist(productid ,productname,categoryid,categoryname)
             values('${productid}','${productname}','${categoryid}','${categoryname}')`
             db.query(qr,(err,result)=>{
                if(err){
                    console.log(err,'errs');
                }
                res.send({
                    message:'data inserted'
                })
            })
})
//update data
app.put('/user/:id',(req,res)=>{
    console.log(req.body,'updatedata');

    let gID=req.params.id;
    let productid =req.body.productid;
    let productname=req.body.productname;
    let categoryid=req.body.categoryid;
    let categoryname=req.body.categoryname;

    let qr=`update productlist set productname='${productname}', categoryid='${categoryid}', categoryname='${categoryname}'
    where productid =${productid}`;

    db.query(qr,(err,result)=>{
        if(err){
            console.log(err,'errs');
        }
        res.send({
            message:'data updated'
        })
    })
})
//delete data
app.delete('/user/:id',(req,res)=>{
    let qID=req.params.id;
    let qr=`delete from productlist where productid='${qID}' `;

    db.query(qr,(err,result)=>{
        if(err){
            console.log(err,'errs');
        }
        res.send({
            message:'data deleted'
        })
    })


})














app.listen(3300,()=>{
    console.log('server-running...');
})