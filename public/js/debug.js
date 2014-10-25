$(document).ready(function(){
	loadDebugPage('debug',
		{message: "Jason"}
	);
	console.log("load");
});

var loadDebugPage = function(template,data){
	data = data || {};
	$('#main-container').html(Handlebars.templates[template](data));
}

