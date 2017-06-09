$(document).ready(function(){
    
    $(".sub").click(function(){
        var url1 = "https://sh-u.herokuapp.com/new/" + $("#fullUrl").val();
        
        console.log(url1);
        
        $.getJSON(url1, function(json){
            console.log(json);
        });
    
    
});
    
});