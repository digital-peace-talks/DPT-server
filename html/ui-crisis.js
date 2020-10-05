
function crisisForm(messageId) {

	var message = '';

	for (var i = 0; i < currentDialog.messages.length; i++) {
		if (currentDialog.messages[i].messageId == messageId) {
			message = currentDialog.messages[i].content;
			break;
		}
	}


	jQuery('#misc2').text('');
	jQuery('#misc2').append(`
		<div id="crisis">
			<h1>Finishing this dialog</h1>
			<p>
				After ending this dialog it will be open to everyone in the topic: "${currentDialog.topic}"
			</p>
			<form id="crisis">
				<input type="submit" class="buttonCrisisSend" name="send" value="Yes, I want to finish this dialog">
				<input type="button" class="closeButton" value="&#10005;" name="close window" id="crisisCloseWindow">
			</form>
		</div>
	`);

	jQuery(".crisis").focus();

	jQuery("#crisis").submit(function (event) {
		event.stopImmediatePropagation();
		event.preventDefault();
		const rating = getMeanRating();
		var reason = jQuery('input[name="reason"]').val();
      if(!reason) {
          reason = "No reason provided";
      };
			dpt.postCrisis(
				reason,
				rating,
				currentDialog.dialog,
				messageId,
				whoami.dptUUID);
			jQuery('#misc2').empty();
			jQuery('form#dialogFrame').html(`
			<br>
			<input type="button" class="buttondialogclose" value="&#10005;" name="close window" id="dialogClose">
			`);
	});

	jQuery(document).on('click', "#crisisCloseWindow", function (event) {
		dialogFormOpen = 0;
		jQuery('#misc2').empty();
		event.preventDefault();
	});

	jQuery(document).on('keyup', '#dialogInput', function (event) {
		if (event.ctrlKey && (event.keyCode == 10 || event.keyCode == 13)) {
			event.stopImmediatePropagation();
			event.preventDefault();
			jQuery('form#crisis').submit();
		}
	});

	/**
	 * Calculates the mean rating from all of the sliders
	 * @returns {number}
	 */
	function getMeanRating() {
		const ratingSum = parseInt(jQuery('.slider')[0].value) / 100
		 + parseInt(jQuery('.slider')[1].value) / 100 
		 + parseInt(jQuery('.slider')[2].value) / 100;
		 const mean = ratingSum / 3;
		 return mean;
	}
}
