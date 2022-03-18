////***mongodb connect */
const dbConnect = require('./mongoDB/mongoDB') 


////***APIs */
const express = require('express')
const app = express()

app.use(express.json())
var cors = require('cors');
app.use(cors());

app.get('/',async (req,res)=>{
    const db = await dbConnect()
    const data =await db.find().toArray()
    res.send(data)
})

app.post('/',async(req,res)=>{
    const db = await dbConnect()
    let data = await db.insertOne(req.body)
    
    if(data.acknowledged){
        res.send(data)
    }
})

const mongodb = require('mongodb')

app.put('/:id',async(req,res)=>{
    const db = await dbConnect();
    let data = await db.updateOne(
        {_id: new mongodb.ObjectId(req.params.id)},
        {$set: req.body}
    )
    if(data.acknowledged){
        res.send(data)
    }
})

app.delete('/:id',async(req,res)=>{
    const db = await dbConnect();
    let data = await db.deleteOne({_id: new mongodb.ObjectId(req.params.id)})
    if(data.acknowledged){
        res.send(data)
    }
})

const dotenv = require('dotenv');
dotenv.config();

app.listen(process.env.PORT || 5000)
