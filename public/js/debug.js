$(document).ready(function(){    
    var query = 'MIT';

    $.ajax({
        type: 'POST',
        url: '/api/search',
        data: { 
            'query': query, 
        }
    }).done(function(response) {
        loadDebugPage('search_results', {search_results: response});
        console.log(response);
    }).fail(function(jqhxr) {
        alert('Some error occurred');
    });
});   	

var loadDebugPage = function(template,data){
	data = data || {};
	$('#main-container').html(Handlebars.templates[template](data));
}

