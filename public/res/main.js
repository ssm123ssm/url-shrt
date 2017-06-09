$(document).ready(function(){
    
    $(".sub").click(function(){
        var url1 = "https://sh-u.herokuapp.com/new/" + $("#fullUrl").val() +"?jsoncallback=?";
        
        console.log(url1);
        
        $.getJSON(url1, function(json){
            console.log(json);
        });
    
    
});
    
});