$(document).ready(function(e){
	
	var _Html=$.ajax({
		url:"data/data.html",
		async:"false",
		success: function(){
			$(".pro-class-list").html(_Html.responseText);
			var heights=snShop.pageSize();
			$(".mask-lay").height(heights[0]);
			$(".menus-list").height(heights[0]);
			snShop.silderLeft({
				menus:"menus-list",
				pages:"pages-wraps",
				alinks:"fliter-btns",
				masks:"mask-lay",
				menuspare:"menus-list-ri",
				position:"right"
			});
			
			
		}
		
	});
	

});