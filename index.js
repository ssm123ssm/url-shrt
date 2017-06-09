var express = require('express');
var mongo = require('mongodb').MongoClient;
var ret = {url:null, shortened:null};
var db_url = 'mongodb://ssm123ssm:chandrani123@ds117592.mlab.com:17592/data';
var sh;
var app = express();

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
                ret.shortened = ress[0].shrt;      
                 res.send(ret);
            }
            else{
                col.find({last:1}).toArray(function(err, ress){
             
                sh = ress[0]["give"];
                console.log("to be given: " + (sh+1));
                    sh++;
                     ret.shortened = sh;
                    
                    col.update({last:1},{last:1, give:sh},function(err, res){});
                col.insert({url:val, shrt:sh});
                ret.url = val;
               res.send(ret);
                    
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
