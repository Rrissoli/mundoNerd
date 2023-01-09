$(document).ready(function() {
 
  $(".slider .wrapper_caption").on("mousedown",function(){        
    $(this).attr("draggable","true");
  })
  $(".slider .wrapper_caption").on("mouseup",function(){        
    $(this).attr("draggable","false");
  })
  
})