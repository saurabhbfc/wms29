//mongodb+srv://123:<password>@cluster-wms.0uh3j.mongodb.net/test
//var express = require("express");
//var path = require("path");
//var bodyParser = require('body-parser');
//var morgan = require("morgan");
//var db = require("./config.js");
//var cors = require('cors');
//var mongoose = require('mongoose');
//const joinQuery = require("mongo-join-query");

//const CircularJSON = require('circular-json');
//const Axios = require("axios");
//const db = require("./config.js");
//const { json } = require("express");
//const foliokarvy = require("./route.js");



import express from 'express';
//import data from './data.js';
import dotenv from 'dotenv';
 //import config from './config.js';
 import mongoose from 'mongoose';
 import path from 'path';
 //import userRoute from './routes/userRoute.js';
 //import productRoute from './routes/productRoute.js';
 //import uploadRouter from './routes/uploadRouter.js';
import bodyParser from 'body-parser';
//import orderRouter from './routes/orderRouter.js';

import morgan from 'morgan';
//import db from './config.js';
//import config from './config.js';
import cors from 'cors';
import Axios from 'axios';
var Schema = mongoose.Schema;

var app = express();
const __dirname = path.resolve();
//var port = process.env.port || 3001;
var srcpath = path.join(__dirname, '/public');
app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

//var getschema = require("../backend/route.js");//ravi line

//const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));


dotenv.config();
//const mongodbUrl= config.MONGODB_URL;

const mongodbUrl= process.env.MONGODB_URL || 'mongodb+srv://Saurabh:Saurabh@123@cluster0.xavdk.mongodb.net/wms?retryWrites=true&w=majority' ;

var db=mongoose.connect(mongodbUrl, {
	useNewUrlParser:true,
	useUnifiedTopology: true,
	useCreateIndex:true
}).catch(error => console.log(error.reason));

// import MongoClient from 'mongodb';
// //import Axios from 'axios';
// var url = process.env.MONGODB_URL || 'mongodb+srv://Saurabh:Saurabh@123@cluster0.xavdk.mongodb.net/wms?retryWrites=true&w=majority';

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   db.collection("customers").findOne({}, function(err, result) {
//     if (err) throw err;
//     console.log(result.name);
//     db.close();
//   });
// });



app.use(express.static(path.join(__dirname, '/frontend/build')));
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
);

const port= process.env.PORT ||  5000;

var newdata="";var newdata1=""; 
var newdata2="";var datacon="";
const navcams = new Schema({
    SchemeCode: { type: String },
    ISINDivPayoutISINGrowth: { type: String },
    ISINDivReinvestment: { type: String },
    SchemeName: { type: String ,required: true},
    NetAssetValue: { type: String },
    Date: { type: String },
}, { versionKey: false });

var i='';
const foliocams = new Schema({
    amc_code: { type: String },
    foliochk: { type: String },
    inv_name: { type: String },
    sch_name: { type: String },
    jnt_name1: { type: String },
    jnt_name2: { type: String },
    holding_nature: { type: String },
    pan_no: { type: String },
    joint1_pan: { type: String },
    bank_name: { type: String },
    ac_no: { type: String },
    nom_name: { type: String },
    nom2_name: { type: String },
    nom3_name: { type: String },
    ifsc_code: { type: String },
    product: {type: String},
}, { versionKey: false });

const foliokarvy = new Schema({
    Folio: { type: String },
    City: { type: String },
    Email: { type: String },
    BankAccno: { type: String },
    InvestorName: { type: String },
    PANNumber: { type: String },
}, { versionKey: false });

const foliofranklin = new Schema({
    BRANCH_N12: { type: String },
    BANK_CODE: { type: String },
    IFSC_CODE: { type: String },
    NEFT_CODE: { type: String },
    NOMINEE1: { type: String },
    FOLIO_NO: { type: String },
    INV_NAME: { type: String },
    JOINT_NAM1: { type: String },
    ADDRESS1: { type: String },
    ADDRESS2: { type: String },
    ADDRESS3: { type: String },
    D_BIRTH: { type: String },
    F_NAME: { type: String },
    PHONE_RES: { type: String },
    PANNO1: { type: String },
}, { versionKey: false });

var transcams = new Schema({
    trxnno: {type: String },
    folio_no: { type: String },
    scheme: { type: String },
    inv_name: { type: String },
    traddate: { type: Date },
    postdate: { type: String },
    units: { type: String },
    amount: { type: String },
    trxn_nature: { type: String },
    scheme_type: { type: String },
    pan: { type: String },
    trxn_type_flag: { type: String },
    amc_code: { type: String },
    prodcode: { type: String },
}, { versionKey: false });

const transkarvy = new Schema({
    FMCODE: { type: String },
    TD_ACNO: { type: String },
    FUNDDESC: { type: String },
    TD_TRNO: { type: String },
    SMCODE: { type: String },
    INVNAME: { type: String },
    TD_TRDT: { type: Date },
    TD_POP: { type: String },
    TD_AMT: { type: String },
    TD_APPNO: { type: String },
    UNQNO: { type: String },
    TD_NAV: { type: String },
    IHNO: { type: String },
    BRANCHCODE: { type: String },
    TRDESC: { type: String },
    PAN1: { type: String },
}, { versionKey: false });

const transfranklin = new Schema({
    COMP_CODE: { type: String },
    SCHEME_CO0: { type: String },
    SCHEME_NA1: { type: String },
    FOLIO_NO: { type: String },
    TRXN_TYPE: { type: String },
    TRXN_NO: { type: String },
    INVESTOR_2: { type: String },
    TRXN_DATE: { type: Date },
    NAV: { type: String },
    POP: { type: String },
    UNITS: { type: String },
    AMOUNT: { type: String },
    JOINT_NAM1: { type: String },
    ADDRESS1: { type: String },
    IT_PAN_NO1: { type: String },
    IT_PAN_NO2: { type: String },
}, { versionKey: false });

var cams_navSchema = new Schema({
    trxnno: {type: String },
    folio_no: { type: String },
    scheme: { type: String },
    inv_name: { type: String },
    traddate: { type: String },
    units: { type: String },
    amount: { type: String },
    trxn_nature: { type: String },
    scheme_type: { type: String },
    pan: { type: String },
    trxn_type_flag: { type: String },
}, { versionKey: false });

const cams_transSchema = new Schema({
    folio_no: { type: String },
    scheme: { type: String },
    inv_name: { type: String },
    ac_no: { type: String },
    bank_name: { type: String },
}, { versionKey: false });




app.get("/api/gettranscams", function (req, res) {
    var model = mongoose.model('trans_cams', transcams, 'trans_cams');
    model.find({}, function (err, data) {
        if (err) {
            res.send(err);
        }
        else {
            console.log("data="+data);
            res.send(data);
        }
    });
})


app.get("/api/getcamstransdata", function (req, res) {
    var model = mongoose.model('cams_trans', cams_transSchema, 'cams_trans');
    model.find({}, function (err, data) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(data);
        }
    });
})

app.get("/api/getsipstpuserwise", function (req, res) {
    var mon = parseInt(req.query.dt);
 //   console.log("mon=",mon)
    var yer = parseInt(req.query.yr);
  //  console.log("yer=",yer)
    var name = req.query.name;
  //  console.log("name=",name)
    const pipeline=[
        {$project: {_id:0,folio_no:1,scheme:1,amount:1,postdate:1,trxn_nature:1,inv_name:1,traddate:"$traddate", month:{$month:('$traddate')} , year:{$year:('$traddate')} }},
         {$match : { $and: [  { month: mon }, { year: yer },{inv_name:name} , {trxn_nature:/Systematic/}, {trxn_nature:{ $not: /^Systematic - From.*/ }} ] }}
]
                // const pipeline1 = [
                //     {"$match" : {PAN1:pan}}, ///trans_karvy
                //     {"$group" : {_id : {TRDESC:"$TRDESC"}}}, 
                //     {"$project" : {_id:0, trxn_nature:"$_id.TRDESC"}}
                // ]
                // const pipeline2 = [
                //     {"$match" : {IT_PAN_NO1:pan}}, ///trans_franklin
                //     {"$group" : {_id : {TRXN_TYPE:"$TRXN_TYPE"}}}, 
                //     {"$project" : {_id:0, trxn_nature:"$_id.TRXN_TYPE"}}
                // ]
                var transc = mongoose.model('trans_cams', transcams, 'trans_cams');
                // var transk = mongoose.model('trans_karvy', transkarvy, 'trans_karvy');
                // var transf = mongoose.model('trans_franklin', transfranklin, 'trans_franklin');
                transc.aggregate(pipeline, (err, newdata) => {
                    // transk.aggregate(pipeline1, (err, newdata1) => {
                    //     transf.aggregate(pipeline2, (err, newdata2) => {
                    //         if(newdata2.length != 0 || newdata1.length != 0 || newdata.length != 0){  
                        if(newdata.length != 0 ){    
                                    resdata= {
                                        status:200,
                                        message:'Successfull',
                                        data:  newdata 
                                      }
                                    }else{
                                        resdata= {
                                        status:400,
                                        message:'Data not found',            
                                      }
                                    }
                                      //var datacon = (newdata2).concat(newdata1.concat(newdata))
                                      //datacon = datacon.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
                                     //.filter(function(item, index, arr){ return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
                                     //.reverse().map(JSON.parse) ;
                                    //  resdata.data = datacon
                                    //console.log("reshhh=",resdata)
                                     res.json(resdata)
                                     return resdata
                                    });
                             //   });
                           //  });
                       //  }      
       // }
//});
})

app.get("/api/getsipstpall", function (req, res) {
    var mon = parseInt(req.query.dt);
    var yer = parseInt(req.query.yr);
    //console.log("res2=",typeof dat)
    //console.log("resssss2=",dat)
    const pipeline=[
            {$project: {_id:0,folio_no:1,scheme:1,amount:1,postdate:1,trxn_nature:1,traddate:"$traddate", month:{$month:('$traddate')} , year:{$year:('$traddate')} }},
             {$match : { $and: [  { month: mon }, { year: yer } , {trxn_nature:/Systematic/}, {trxn_nature:{ $not: /^Systematic - From.*/ }} ] }}
    ]
              var transc = mongoose.model('trans_cams', transcams, 'trans_cams');
              transc.aggregate(pipeline, (err, newdata) => {
                if(newdata.length != 0){
                    resdata= {
                        status:200,
                        message:'Successfull',
                        data:  newdata
                      }
                    }else{
                        resdata= {
                        status:400,
                        message:'Data not found',            
                      }
                    }
                    //console.log(newdata.length)
                    res.json(resdata)
                    //console.log(JSON.stringify(resdata))
                    //return resdata
            });
    })

app.get("/api/gettransactionall", function (req, res) {
    var mon = parseInt(req.query.dt);
    var yer = parseInt(req.query.yr);
              const pipeline = [  ///trans_cams
                {$project: {_id:0,scheme:1,amount:1,trxn_nature:1,traddate:"$traddate", month:{$month:('$traddate')} , year:{$year:('$traddate')} }},
                {$match : { $and: [  { month: mon }, { year: yer } ] }}
                ]
                // const pipeline1 = [ ///trans_karvy
                //     {$project: {_id:0,FUNDDESC:1,TD_AMT:1,TRDESC:1,TD_TRDT:"$TD_TRDT", month:{$month:('$TD_TRDT')} , year:{$year:('$TD_TRDT')} }},
                //     {$match : { $and: [  { month: mon }, { year: yer } ] }}
                // ]
                // const pipeline2 = [ ///trans_franklin
                //     {$project: {_id:0,SCHEME_NA1:1,AMOUNT:1,TRDESC:1,TRXN_DATE:"$TRXN_DATE", month:{$month:('$TRXN_DATE')} , year:{$year:('$TRXN_DATE')} }},
                //     {$match : { $and: [  { month: mon }, { year: yer } ] }}
                // ]
                var transc = mongoose.model('trans_cams', transcams, 'trans_cams');
                // var transk = mongoose.model('trans_karvy', transkarvy, 'trans_karvy');
                // var transf = mongoose.model('trans_franklin', transfranklin, 'trans_franklin');
                transc.aggregate(pipeline, (err, newdata) => {
                    //  transk.aggregate(pipeline1, (err, newdata1) => {
                    //      transf.aggregate(pipeline2, (err, newdata2) => {
                    //          if( newdata2.length != 0 || newdata1.length != 0 || newdata.length != 0){
                        if( newdata.length != 0){
                                    resdata= {
                                        status:200,
                                        message:'Successfull',
                                        data:  newdata 
                                      }
                                    }else{
                                        resdata= {
                                        status:400,
                                        message:'Data not found',            
                                      }
                                    }
                                    // var datacon = (newdata2).concat(newdata1.concat(newdata))
                                    //   datacon = datacon.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
                                    //  .filter(function(item, index, arr){ return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
                                    //  .reverse().map(JSON.parse) ;
                                    //   resdata.data = datacon
                                     res.json(resdata)
                                     //return resdata
                                    //});
                               // });
                             });
                       
})

app.get("/api/gettransactionuserwise", function (req, res) {
    var mon = parseInt(req.query.dt);
    var yer = parseInt(req.query.yr);
    var name = req.query.name;
              const pipeline = [  ///trans_cams
                {$project: {_id:0,scheme:1,amount:1,trxn_nature:1,inv_name:1,traddate:"$traddate", month:{$month:('$traddate')} , year:{$year:('$traddate')} }},
                {$match : { $and: [  { month: mon }, { year: yer } ,{inv_name:name} ] }}
                ]
                // const pipeline1 = [ ///trans_karvy
                //     {$project: {_id:0,FUNDDESC:1,TD_AMT:1,TRDESC:1,TD_TRDT:"$TD_TRDT", month:{$month:('$TD_TRDT')} , year:{$year:('$TD_TRDT')} }},
                //     {$match : { $and: [  { month: mon }, { year: yer } ] }}
                // ]
                // const pipeline2 = [ ///trans_franklin
                //     {$project: {_id:0,SCHEME_NA1:1,AMOUNT:1,TRDESC:1,TRXN_DATE:"$TRXN_DATE", month:{$month:('$TRXN_DATE')} , year:{$year:('$TRXN_DATE')} }},
                //     {$match : { $and: [  { month: mon }, { year: yer } ] }}
                // ]
                var transc = mongoose.model('trans_cams', transcams, 'trans_cams');
                transc.aggregate(pipeline, (err, newdata) => {
                       if( newdata.length != 0){
                                    resdata= {
                                        status:200,
                                        message:'Successfull',
                                        data:  newdata 
                                      }
                                    }else{
                                        resdata= {
                                        status:400,
                                        message:'Data not found',            
                                      }
                                    }
                                   res.json(resdata)
                                     //return resdata
                                    //});
                               // });
                             });
                       
})

app.get("/api/gettaxsaving", function (req, res) {
    const pipeline = [  ///trans_cams
      {"$match" : { $and: [ { trxn_nature:/Systematic/}, { scheme_type: "ELSS" } ] }}, 
      {"$group" : {_id : {trxn_nature:"$trxn_nature",pan:"$pan",scheme:"$scheme",inv_name:"$inv_name", }}}, 
      {"$project" : {_id:0,trxn_nature:"$_id.trxn_nature", pan:"$_id.pan",scheme:"$_id.scheme",inv_name:"$_id.inv_name"}}
  ]
      const pipeline1 = [ ///trans_karvy
         {"$match" : { $and: [ { TRDESC:/Systematic/}, { FUNDDESC:/ELSS/ } ] }}, 
          {"$group" : {_id : {TRDESC:"$TRDESC",PAN1:"$PAN1",FUNDDESC:"$FUNDDESC",INVNAME:"$INVNAME", }}}, 
          {"$project" : {_id:0,trxn_nature:"$_id.TRDESC", pan:"$_id.PAN1",scheme:"$_id.FUNDDESC",inv_name:"$_id.INVNAME"}}
     ]
      const pipeline2 = [ ///trans_franklin
         {"$match" : {TRXN_TYPE:/SIP/}}, 
          {"$group" : {_id : {TRXN_TYPE:"$TRXN_TYPE",IT_PAN_NO1:"$IT_PAN_NO1",SCHEME_NA1:"$SCHEME_NA1",INVESTOR_2:"$INVESTOR_2", }}}, 
          {"$project" : {_id:0,trxn_nature:"$_id.TRXN_TYPE", pan:"$_id.IT_PAN_NO1",scheme:"$_id.SCHEME_NA1",inv_name:"$_id.INVESTOR_2"}}
     ]
      var transc = mongoose.model('trans_cams', transcams, 'trans_cams');
      var transk = mongoose.model('trans_karvy', transkarvy, 'trans_karvy');
      var transf = mongoose.model('trans_franklin', transfranklin, 'trans_franklin');
      transc.aggregate(pipeline, (err, newdata) => {
           transk.aggregate(pipeline1, (err, newdata1) => {
               transf.aggregate(pipeline2, (err, newdata2) => {
                   if( newdata2.length != 0 || newdata1.length != 0 || newdata.length != 0){
                          resdata= {
                              status:200,
                              message:'Successfull',
                              data:  newdata2 
                            }
                          }else{
                              resdata= {
                              status:400,
                              message:'Data not found',            
                            }
                          }
                          var datacon = (newdata2).concat(newdata1.concat(newdata))
                            datacon = datacon.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
                           .filter(function(item, index, arr){ return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
                           .reverse().map(JSON.parse) ;
                            resdata.data = datacon
                           res.json(resdata)
                           return resdata
                          });
                      });
                   });
             
})

app.get("/api/getamclist", function (req, res) {
    Axios.get('https://prodigyfinallive.herokuapp.com/getUserDetails',
    //{data:{ email:req.body.email}}
    {data:{ email:"sunilguptabfc@gmail.com"}}
      ).then(function(result) {
        if(result.data.data  === undefined || req.body.email == ''){
            resdata= {
                status:400,
                message:'Data not found',            
           }
           res.json(resdata) 
           return resdata;
        }else{          
       if(result.data.data === undefined && result.data.data == '' && result.data.message == "Bank details not found "){
            resdata= {
                status:400,
                message:'Data not found',            
           }
           res.json(resdata) 
           return resdata;
        }else{
        var pan =  result.data.data.User[0].pan_card;
        var folio = mongoose.model('folio_cams', foliocams, 'folio_cams');
        var trans = mongoose.model('trans_cams', transcams, 'trans_cams');
        const pipeline = [
            {"$match" : {pan_no:pan}}, 
             {"$group" : {_id : {foliochk:"$foliochk", amc_code:"$amc_code", product:"$product"}}}, 
             {"$project" : {_id:0, folio:"$_id.foliochk", amc_code:"$_id.amc_code", product_code:"$_id.product"}}
        ]
        const pipeline1 = [
            {"$match" : {pan:pan}}, 
             {"$group" : {_id : {folio_no:"$folio_no", amc_code:"$amc_code", prodcode:"$prodcode"}}}, 
             {"$project" : {_id:0, folio:"$_id.folio_no", amc_code:"$_id.amc_code", product_code:"$_id.prodcode"}}
        ]
        folio.aggregate(pipeline, (err, newdata) => {
          trans.aggregate(pipeline1, (err, newdata1) => {
            if(newdata1.length != 0 || newdata.length != 0){     
                             resdata= {
                                status:200,
                                message:'Successfull',
                                data:  newdata1 
                              }
                            }else{
                                resdata= {
                                status:400,
                                message:'Data not found',            
                           }
                            }
                            var datacon = newdata.concat(newdata1)
                            datacon = datacon.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
                            .filter(function(item, index, arr){ return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
                            .reverse().map(JSON.parse) ;
                             resdata.data = datacon
                            //console.log("res="+JSON.stringify(resdata))
                            res.json(resdata)  
                            return resdata                    
                        });
                    });
              }
            }      
    });    
    })


app.get("/api/getfoliolist", function (req, res) {
    Axios.get('https://prodigyfinallive.herokuapp.com/getUserDetails',
    {data:{ email:req.body.email}}
      ).then(function(result) {
        if(result.data.data  === undefined || req.body.email == ''){
            resdata= {
                status:400,
                message:'Data not found',            
           }
           res.json(resdata) 
           return resdata;
        }else{          
       if(result.data.data === undefined && result.data.data == '' && result.data.message == "Bank details not found "){
            resdata= {
                status:400,
                message:'Data not found',            
           }
           res.json(resdata) 
           return resdata;
        }else{
        var pan =  result.data.data.User[0].pan_card;
        var folioc = mongoose.model('folio_cams', foliocams, 'folio_cams');
        var foliok = mongoose.model('folio_karvy', foliokarvy, 'folio_karvy');
        var foliof = mongoose.model('folio_franklin', foliofranklin, 'folio_franklin');
        var transc = mongoose.model('trans_cams', transcams, 'trans_cams');
        var transf = mongoose.model('trans_franklin', transfranklin, 'trans_franklin');
        folioc.find({"pan_no":pan}).distinct("foliochk", function (err, newdata) { 
            foliok.find({"PANNumber":pan}).distinct("Folio", function (err, newdata1) { 
                foliof.find({"PANNO1":pan}).distinct("FOLIO_NO", function (err, newdata2) {
                    transc.find({"pan":pan}).distinct("folio_no", function (err, newdata3) { 
                        transf.find({"IT_PAN_NO1":pan}).distinct("FOLIO_NO", function (err, newdata4) {
                    if(newdata4 != 0 || newdata3 != 0 || newdata2 != 0 || newdata1 != 0 || newdata != 0){    
                             resdata= {
                                status:200,
                                message:'Successfull',
                                data:  newdata4
                              }
                            }else{
                                resdata= {
                                status:400,
                                message:'Data not found',            
                           }
                            }
                            var datacon = newdata4.concat(newdata3.concat(newdata2.concat(newdata1.concat(newdata))))
                            var removeduplicates = Array.from(new Set(datacon));
                            resdata.data = removeduplicates
                            res.json(resdata)  
                            return resdata                    
                        });
                    });
                    });
                });
            });
        }
            }      
    });
    })

    app.get("/api/getapplicant", function (req, res) {
     var folioc = mongoose.model('trans_cams', transcams, 'trans_cams');
        // var foliok = mongoose.model('folio_karvy', foliokarvy, 'folio_karvy');
        // var foliof = mongoose.model('folio_franklin', foliofranklin, 'folio_franklin');
        // var transc = mongoose.model('trans_cams', transcams, 'trans_cams');
        // var transf = mongoose.model('trans_franklin', transfranklin, 'trans_franklin');
        folioc.find().distinct("inv_name", function (err, newdata) { 
            // foliok.find({"PANNumber":pan}).distinct("Folio", function (err, newdata1) { 
            //     foliof.find({"PANNO1":pan}).distinct("FOLIO_NO", function (err, newdata2) {
            //         transc.find({"pan":pan}).distinct("folio_no", function (err, newdata3) { 
            //             transf.find({"IT_PAN_NO1":pan}).distinct("FOLIO_NO", function (err, newdata4) {
                   // if(newdata4 != 0 || newdata3 != 0 || newdata2 != 0 || newdata1 != 0 || newdata != 0){ 
                  
                            //var datacon = newdata4.concat(newdata3.concat(newdata2.concat(newdata1.concat(newdata))))
                           // var removeduplicates = Array.from(new Set(datacon));
                            //resdata.data = removeduplicates
                            res.json(newdata)    
                        });
                   // });
                  //  });
              //  });
          //  });
    //     }
    //         }      
    // });
    })
    app.get("/api/getportfolio", function (req, res) {
        var folioc = mongoose.model('trans_cams', transcams, 'trans_cams');               
             folioc.find({"inv_name":req.query.name},{_id:0,scheme:1,units:1,amount:1,folio_no:1,scheme_type:1}, function (err, data) {
              if (err) {
                  res.send(err);
              }
              else {
                  res.send(data);
                  return data;
              }
          });
  })
    app.get("/api/getfolio", function (req, res) {
          var folioc = mongoose.model('trans_cams', transcams, 'trans_cams');               
               folioc.find({"inv_name":req.query.name}).distinct("folio_no", function (err, data) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.send(data);
                    return data;
                }
            });
    })
    app.get("/api/getscheme", function (req, res) {
        var folioc = mongoose.model('trans_cams', transcams, 'trans_cams');               
             folioc.find({"folio_no":req.query.folio}).distinct("scheme", function (err, data) {
              if (err) {
                  res.send(err);
              }
              else {
                  res.send(data);
                  return data;
              }
          });
  })

  app.get("/api/getfoliodetail", function (req, res) {
    var transc = mongoose.model('trans_cams', transcams, 'trans_cams'); 
    var folioc = mongoose.model('folio_cams', foliocams, 'folio_cams');   
    //console.log("folio",req.query.folio)   
    //console.log("scheme",req.query.scheme)            
        transc.find({"folio_no":req.query.folio,"scheme":req.query.scheme},{_id:0,units:1,amount:1}, function (err, transdata) {
            folioc.find({"foliochk":req.query.folio,"sch_name":req.query.scheme},{_id:0,ac_no:1,bank_name:1,jnt_name1:1,jnt_name2:1,nom_name:1}, function (err, foliodata) {
          if (err) {
              res.send(err);
          }
          else {
              //res.send(data);
             // return data;
                               var datacon = transdata.concat(foliodata)
                               // var  newArray = transdata.insertAt(2,foliodata) 
                                //var myNewArray = [].concat.apply([], datacon);
                              //  let cm =JSON.stringify(datacon.toString().replace(/},{/g,','))\

                               
                                //  console.log();
                                  //console.log(datacon[0]._doc.nom_name);

                                 // cdd=datacon[0]._doc.concat(datacon[1]._doc)
                               //   console.log(cdd);

                                   let cm=[{"units":datacon[0]._doc.units,"amount":datacon[0]._doc.amount,"bank_name":datacon[1]._doc.bank_name,"ac_no":datacon[1]._doc.ac_no,"jnt_name1":datacon[1]._doc.jnt_name1,"jnt_name2":datacon[1]._doc.jnt_name2,"nom_name":datacon[1]._doc.nom_name}]

                                   console.log(cm)
                               
                                
                               // var datacon1 = transdata.push(foliodata)
                                //var newArray = [];
                                //newArray.pushValues(transdata);
                               // newArray.pushValues(foliodata);
                                //var newArray = transdata.slice();
                                //newArray.push.apply(newArray,foliodata);

                                // var newArray = [ ];
                                // Array.prototype.push.apply(newArray, transdata); // newArray = [1, 2]
                                // Array.prototype.push.apply(newArray, foliodata); // newArray = [1, 2, 3, 4, 5]
                                //console.log(JSON.stringify(datacon)); 
                                // Array.prototype.push.apply(newArray, newArray);
                                // console.log("res1=",JSON.stringify(datacon))
                                res.json(cm)  
                                return cm         
          }
      });
    });
})

       
    app.get("/api/getschemelist", function (req, res) {
        Axios.get('https://prodigyfinallive.herokuapp.com/getUserDetails',
        {data:{ email:req.body.email}}
          ).then(function(result) {
            if(result.data.data  === undefined || req.body.email == ''){
                resdata= {
                    status:400,
                    message:'Data not found',            
               }
               res.json(resdata) 
               return resdata;
            }else{          
           if(result.data.data === undefined || result.data.data == '' || result.data.message == "Bank details not found "){
                resdata= {
                    status:400,
                    message:'Data not found',            
               }
               res.json(resdata) 
               return resdata;
            }else{
            var pan =  result.data.data.User[0].pan_card;
            var folio = mongoose.model('folio_cams', foliocams, 'folio_cams');
            const pipeline = [
                {"$match" : {pan_no:pan}}, 
                 {"$group" : {_id : {sch_name:"$sch_name", amc_code:"$amc_code", product:"$product"}}}, 
                 {"$project" : {_id:0, scheme:"$_id.sch_name", amc_code:"$_id.amc_code", sch_id:"$_id.product"}}
            ]
            const pipeline1 = [
                {"$match" : {pan:pan}}, 
                 {"$group" : {_id : {scheme:"$scheme", amc_code:"$amc_code", prodcode:"$prodcode"}}}, 
                 {"$project" : {_id:0, scheme:"$_id.scheme", amc_code:"$_id.amc_code", sch_id:"$_id.prodcode"}}
            ]
            folio.aggregate(pipeline, (err, newdata) => {
                if(newdata != 0){    
                         resdata= {
                            status:200,
                            message:'Successfull',
                            data:  newdata 
                          }
                        }else{
                         resdata= {
                            status:400,
                            message:'Data not found',            
                       }
                        }
                    });
                    var trans = mongoose.model('trans_cams', transcams, 'trans_cams');
                    trans.aggregate(pipeline1, (err, newdata) => {
                        if(newdata != 0){    
                                 resdata1= {
                                    status:200,
                                    message:'Successfull',
                                    data:  newdata 
                                  }
                                }else{
                                    resdata1= {
                                    status:400,
                                    message:'Data not found',            
                               }
                                }
                                var datacon = resdata.data.concat(resdata1.data)
                                datacon = datacon.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
                                .filter(function(item, index, arr){ return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
                                .reverse().map(JSON.parse) ;
                                 resdata.data = datacon
                                console.log("res="+JSON.stringify(resdata))
                                res.json(resdata)  
                                return resdata                  
                            });
                  }
                }      
        });
        })

app.get("/api/getfoliocams", function (req, res) {
    var model = mongoose.model('folio_cams', foliocams, 'folio_cams');
    model.find({}, function (err, data) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(data);
        }
    });
})



app.post("/api/savecamsnav", function (req, res) {
    var model = mongoose.model('cams_nav', navcams, 'cams_nav');
    try{
    for (i = 0; i < req.body.length; i++) {
        var mod = new model(req.body[i]);
        mod.save(function (err, data) {
            if (err) {
                console.log(err);
            }
            else {
                console.log(data);
            }
        });
    }
}catch(err){
console.log(e)
}
})

app.post("/api/savecamstrans", function (req, res) {
    var model = mongoose.model('cams_trans', cams_transSchema, 'cams_trans');
    for (i = 0; i < req.body.length; i++) {
        var mod = new model(req.body[i]);
        mod.save(function (err, data) {
            if (err) {
                res.send(err);
            }
            else {
                //res.send({data:"Record has been Inserted..!!"});
                console.log(data);
            }
        });
    }
})

app.post("/api/savefoliocams", function (req, res) {
    var model = mongoose.model('folio_cams', foliocams, 'folio_cams');
    for (i = 0; i < req.body.length; i++) {
        var mod = new model(req.body[i]);
        mod.save(function (err, data) {
            if (err) {
                res.send(err);
            }
            else {
                //res.send({data:"Record has been Inserted..!!"});
                console.log(data);
            }
        });
    }
})

app.post("/api/savefoliocamsoooo", function (req, res) {
var model = mongoose.model('folio_cams', foliocams, 'folio_cams');
    for (i = 0; i < req.body.length; i++) {   
	    var mod = new model(req.body[i]);
       mod.updateMany(
                    { pan_no: req.body[i].pan_no , product: req.body[i].product }, 
                      {$set: 
                        { amc_code : req.body[i].amc_code ,
                          foliochk : req.body[i].foliochk ,
                          inv_name: req.body[i].inv_name ,
                          sch_name : req.body[i].sch_name ,
                          jnt_name1 : req.body[i].jnt_name1 ,
                          jnt_name2 : req.body[i].jnt_name2 ,
                          holding_nature : req.body[i].holding_nature ,
                          joint1_pan : req.body[i].joint1_pan ,
                          bank_name : req.body[i].bank_name ,
                          ac_no : req.body[i].ac_no ,
                          nom_name : req.body[i].nom_name ,
                          nom2_name : req.body[i].nom2_name ,
                          nom3_name : req.body[i].addres ,
                          ifsc_code : req.body[i].ifsc_code ,
                          product : req.body[i].product ,
                          pan_no : req.body[i].pan_no ,
                    }}, 
                    {
                        "upsert":true
                     }, 
                    function(err, object) {
                        if (err){
                            console.warn(err.message);  // returns error if no matching object found
                        }else{
                           // console.dir("successfully");
                        }
                    })
}

 })

 app.post("/api/savetranscams-tetete", function (req, res) {
	 var model = mongoose.model('trans_cams', transcams, 'trans_cams');
    for (i = 0; i < req.body.length; i++) {   
       model.updateMany(
                    { trxnno: req.body[i].trxnno }, 
                      {$set: 
                        { folio_no : req.body[i].folio_no ,
                          scheme : req.body[i].scheme ,
                          inv_name: req.body[i].inv_name ,
                          traddate : req.body[i].traddate ,
                          units : req.body[i].units ,
                          amount : req.body[i].amount ,
                          trxn_nature : req.body[i].trxn_nature ,
                          scheme_type : req.body[i].scheme_type ,
                          pan : req.body[i].pan ,
                          trxn_type_flag : req.body[i].trxn_type_flag ,
                          amc_code : req.body[i].amc_code ,
                          prodcode : req.body[i].prodcode ,
                          trxnno : req.body[i].trxnno ,
                    }}, 
                    {
                        "upsert":true
                     }, 
                    function(err, object) {
                        if (err){
                            console.warn(err.message);  // returns error if no matching object found
                        }else{
                           // console.dir("successfully");
                        }
                    })
}

 })


app.post("/api/savetranscams", function (req, res) {
    var model = mongoose.model('trans_cams', transcams, 'trans_cams');
    for (i = 0; i < req.body.length; i++) {
        var mod = new model(req.body[i]);
        mod.save(function (err, data) {
            if (err) {
                res.send(err);
            }
            else {
                //res.send({data:"Record has been Inserted..!!"});
                //console.log("foliokarvy="+foliofranklin)
                console.log(data);
            }
        });
    }
})

app.post("/api/savefoliokarvy", function (req, res) {
    var model = mongoose.model('folio_karvy', foliokarvy, 'folio_karvy');
    for (i = 0; i < req.body.length; i++) {
        var mod = new model(req.body[i]);
        mod.save(function (err, data) {
            if (err) {
                res.send(err);
            }
            else {
                //res.send({data:"Record has been Inserted..!!"});
                console.log("foliokarvy="+foliokarvy)
                console.log(data);
            }
        });
    }
})

app.post("/api/savefoliofranklin", function (req, res) {
    var model = mongoose.model('folio_franklin', foliofranklin, 'folio_franklin');
    for (i = 0; i < req.body.length; i++) {
        var mod = new model(req.body[i]);
        mod.save(function (err, data) {
            if (err) {
                res.send(err);
            }
            else {
                //res.send({data:"Record has been Inserted..!!"});
                console.log("foliokarvy="+foliofranklin)
                console.log(data);
            }
        });
    }
})

app.post("/api/savetranskarvy", function (req, res) {
    var model = mongoose.model('trans_karvy', transkarvy, 'trans_karvy');
    for (i = 0; i < req.body.length; i++) {
        var mod = new model(req.body[i]);
        mod.save(function (err, data) {
            if (err) {
                res.send(err);
            }
            else {
                //res.send({data:"Record has been Inserted..!!"});
                //console.log("foliokarvy="+foliofranklin)
                console.log(data);
            }
        });
    }
})

app.post("/api/savetransfranklin", function (req, res) {
    var model = mongoose.model('trans_franklin', transfranklin, 'trans_franklin');
    for (i = 0; i < req.body.length; i++) {
        var mod = new model(req.body[i]);
        mod.save(function (err, data) {
            if (err) {
                res.send(err);
            }
            else {
                //res.send({data:"Record has been Inserted..!!"});
                //console.log("foliokarvy="+foliofranklin)
                console.log(data);
            }
        });
    }
})



// call by default index.html page
app.get("*", function (req, res) {
    res.sendFile(srcpath + '/index.html');
})

//server stat on given port
app.listen(port, function () {
    console.log("server start on port" + port);
})
