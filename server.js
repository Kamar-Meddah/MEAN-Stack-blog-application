const express = require('express');
const app = express();
const fs=require('fs');


var MongoClient = require('mongodb').MongoClient;

const session = require('express-session');
const bodyParser = require('body-parser');
const multer = require('multer'); // v1.0.5
const upload = multer({dest: 'img/articles/' }); // for parsing multipart/form-data

const mongoose = require('mongoose');
var Store = session.Store;
var MongooseStore = require('mongoose-express-session')(Store);

mongoose.connect('mongodb://localhost:27017/blog', { useMongoClient: true});

/*
app.get('/',(req,res)=>{

    const articles=mongoose.model('articles',
    {
        titre:'String',contenu:"String",category_id:"ObjectId",date:{ type: Date, default: Date.now }
     });

    articles.find({"_id":"59c52839debf3a34e40ccf67"}).then(res=>{
        console.log(res)
    })
})

*/
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    rolling: false,
    saveUninitialized: true,
    store: new MongooseStore({
     connection: mongoose
    })
}));

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));



app.use(express.static(__dirname+'/')); 
app.post('/',upload.array('images'),(req,res)=>{
 const string=req.body.request.split('.')
 const ctrl=require(`./app/controller/${string[0]}Ctrl`);
 const fun=string[1]
 ctrl[fun](req,res)
})

//-------------------------------------------------------------------------
//server port default=80*/

app.listen(80);