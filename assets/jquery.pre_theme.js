$(document).ready(function() {
  if( $('body.home').length ){
    var cms_js = jQuery('#cms_js');
    var check = false;
    $script([cms_js.data('cd')],'load_cd'); 
    /*$(window).scroll(function (event) {
      $script([cms_js.data('cd')],'load_cd'); 
      check = true;
    })
    $("body").on("mouseover",function(){
      if(check == false){
        $script([cms_js.data('cd')],'load_cd'); 
      }
    }) */ 
  }else{
    	var cms_js = jQuery('#cms_js');
    	$script([cms_js.data('cd')],'load_cd'); 
  }
	
    $script.ready('load_cd', function() { 
    	$script([cms_js.data('slick'),cms_js.data('sc'),cms_js.data('countdown'),cms_js.data('ez')],'load_basic');  
    })

    $script.ready('load_basic', function() { 
    	$script([cms_js.data('header')]);      	
    });
  	// main   
    $script.ready('load_basic', function() { 
      $script([cms_js.data('shopify'), cms_js.data('slideshow')], 'load_main');  
      
    });   
   
    $script.ready('load_main', function() {   
      if($(".js_packery").length > 0){
        $script([cms_js.data('packery')]);   
      }
		/*
      	$script([cms_js.data('isotope')]);  */   
    });   
})