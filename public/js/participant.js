$(document).ready(function() {
			console.log("participant-hi");
			var room = window.location.pathname.split('/')[2];
			if ($.cookie('userName') == null) {
				$('#joinRoom').modal({backdrop: 'static', keyboard: false, show: true});
				$('#joinButton').click(function(e){
					var userName = $('#joinName').val();
					$.ajax({
					    type: 'POST',
					    url: '/api/rooms/' + room + '/users',
					    data: {
					        'name': userName
					    },
					    success: function(msg) {
							$('#userName').text(userName);
							$('input[placeholder=Username]').val(userName);
							$('#joinRoom').modal('hide');
					    }
					});
				});
			} else {
				var userName = $.cookie('userName');
				$('#userName').text(userName);
				$('input[placeholder=Username]').val(userName);
			}
});