$(document).ready(function(){
    
    $(".sub").click(function(){
        var url = "https://sh-u.herokuapp.com/new/" + $("#fullUrl").val() +"?callback=?";
        console.log(url);
        $.getJSON(url, function(json){
            alert(json);
        });
    });
    
    
});