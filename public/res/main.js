$(document).ready(function(){
    
    $(".sub").click(function(){
        var url = "https://sh-u.herokuapp.com/new/" + $("#fullUrl").val() +"?callback=?";
        
        $.getJSON(url, function(json){
            console.log(json[0]);
        });
        console.log(url);
    });
    
    
});