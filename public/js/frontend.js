var modal = document.getElementById('info-modal');
var modalBtn = document.getElementById('modal_example');

var acctBtn = document.getElementById('acctBtn');
var acctMenu = document.getElementById('acctMenu');

console.log('loaded frontend.js')

function switchToRecommended() {
	popular.style.display = 'none';
	recommended.style.display = 'block';
}

function switchToPopular() {
	popular.style.display = 'block';
	recommended.style.display = 'none';
}

/* Account Menu */

function toggleMenu() {
	if (acctMenu.style.display === 'none') {
		acctMenu.style.display = 'block';
	} else {
		acctMenu.style.display = 'none';
	}
}

/* Information Modal */

modalBtn.onclick = function() {
	modal.style.display = 'block';
}

window.onclick = function(event) {
	if (event.target == modal) {
	  modal.style.display = 'none';
	}
}