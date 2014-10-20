$(document).ready(function() {
	$.ajax({
		url:"localhost:3000/api/freet/”,
		method:GET,
		success:function(data){
		if(!assert(data.field==expectedvalue)){
			console.log(“Failure!”);
		}		
		console.log("Testpassed!”);
		},
		failure:function(err){
		console.log(“Testfailedwitherror:“+err);
		}
	});
	
});
