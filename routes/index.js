var express = require('express');
var router = express.Router();
var randomString = require("randomstring");
var urlModel = require("../models/url.model");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {ShortedUrl:null,error:null});
});

//url with parameter
router.get("/:authParameter",function(req,res){
   var authParameter = req.params.authParameter;

   //find parameter in db and fetch record
   urlModel.findOne({authKey:authParameter})
           .then(result =>{
             if(!result) return  res.render('index', {ShortedUrl:null,error:"result not found in our database :("});
             var originalUrl = result.url ; 
             res.redirect(originalUrl)
           })
           .catch(error =>{
             res.render('index', {ShortedUrl:null,error:"something went wrong try again..!!"});
           })

  
})

router.post("/",function(req,res){
    var url = req.body.url;
    var authKey = randomString.generate(7);
    
    var urlObj ={
        url:url,
        authKey:authKey}

    var url_model = new urlModel(urlObj);
    
    url_model.save()
             .then((result)=>{
                var appUrl = process.env.APP_URL
                res.render('index', {ShortedUrl:appUrl+result.authKey,error:null});
             })
             .catch(error=>{
                console.log(error);
             })

    
});

module.exports = router;
