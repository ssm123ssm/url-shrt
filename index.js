var express = require('express');
var mongo = require('mongodb').MongoClient;
var ret = {url:null, shortened:null};
var db_url = process.env.MONGOLAB_URI;
var sh;
var app = express();
var rett = [];

app.use(express.static("public"));
app.get('/new/*', function(req, res){
    //console.log(req.params[0]);
    var val = form(req.params[0]);
    
    
    mongo.connect(db_url, function(err, db){
        console.log("Connected to mLab");
        
        var col = db.collection("urls");
        
        col.find({url:val}).toArray(function(err, ress){
            if(ress.length > 0){
                console.log("Already shrtened: " + ress[0].shrt);
                ret.url = val;
                ret.shortened = "https://sh-u.herokuapp.com/" + ress[0].shrt;      
                 //res.send(ret);
                res.setHeader('Content-Type', 'application/json');
                rett.push((ret));
                res.jsonp(ret);
                rett = [];
            }
            else{
                col.find({last:1}).toArray(function(err, ress){
             
                sh = ress[0]["give"];
                console.log("to be given: " + (sh+1));
                    sh++;
                     ret.shortened = "https://sh-u.herokuapp.com/" + sh;
                    
                    col.update({last:1},{last:1, give:sh},function(err, res){});
                col.insert({url:val, shrt:sh});
                ret.url = val;
               res.setHeader('Content-Type', 'application/json');
                rett.push((ret));
                res.jsonp(ret);
                rett= [];
                    
        });
        
                
                
            }
            
        });
        
    });
    
    
});


app.get("/:s", function(req, res){
    var val = req.params.s;
    console.log("req to shrtned: " + val) ;
    
    mongo.connect(db_url, function(err, db){
    var col = db.collection("urls");
      
        col.find({shrt:Number(val)}).toArray(function(err, ress){
            if(ress.length > 0){
                var red = ress[0].url;
                console.log(red);
                res.redirect(red);
                
            }
            else{
                console.log("No entry");
                res.end("No entry. set entry first");
                
            }
        });
        
    });
    
    
});




app.listen(process.env.PORT || 80);


function form(val){
    if(val.toLowerCase().indexOf('http') == 0){
        return val;
    }
    if(val.toLowerCase().indexOf('www') == 0){
        return "http://" + val;
    }
    return "http://" + val;
}

