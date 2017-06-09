$(document).ready(function(){
    
    $(".sub").click(function(){
        var url1 = "https://sh-u.herokuapp.com/new/" + $("#fullUrl").val();
        
        console.log(url1);
        $(".shrt").html("wait...");
       /* 
        $.getJSON(url1, function(json){
            console.log(json);
            $(".shrt").html(json);
        });
        */
         $.ajax({
                    url: "https://sh-u.herokuapp.com/new/" + $("#fullUrl").val(),
                    dataType: 'jsonp',
                    success: function(data){
                        
                   // alert(data.shortened);
                        var ap = "<code><a target=\"_blank\" href=\"" + data.shortened + "\"a>" + data.shortened + "</a></code>"
                        $(".shrt").html(ap);
                    }
                });
    
    
});
    
});

