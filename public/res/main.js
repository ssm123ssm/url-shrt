$(document).ready(function(){
    
    $(".sub").click(function(){
        
    doo();
    
});
    $(document).keyup(function(e) {
    if (e.which == 13) {
      //doo();
    } 
  });
});

function doo(){
    var url1 = "https://sh-u.herokuapp.com/new/" + $("#fullUrl").val();
        
        console.log(url1);
        if (isValid($("#fullUrl").val())){
            getIt();
        }
        
        else{
            alertInvalid();
        }
        
    

         
        function isValid(url){
            //alert(url); 
            if(url.indexOf("http") < 0 && url.indexOf("www") <0){
                return false;
            }
            
            
            return true;
        }
        function alertInvalid(){
            $(".fin, .wait").addClass("d-none");
            $(".invalid").removeClass("d-none");
        }
        function getIt(){
            $(".wait").removeClass("d-none");
            $(".fin, .invalid").addClass("d-none");
            $.ajax({
                    url: url1,
                    dataType: 'jsonp',
                    success: function(data){
                        
                   // alert(data.shortened);
                        $(".wait").addClass("d-none");
                        $(".fin").removeClass("d-none");
                        var ap = "<a target=\"_blank\" class=\"alert-link\" href=\"" + data.shortened + "\"a>" + data.shortened + "</a>"
                        $(".shrt-url").html(ap);
                    }
                });
        }
}
$(".fr").submit(function(e) {
    e.preventDefault();
});