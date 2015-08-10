var btnMobileMenu = document.getElementById('btn-mobile-menu');
var mobileMenu = document.getElementById('mobile-menu');

function toggleMobileMenu() {
	smmClassName = 'show-mobile-menu';

	if(mobileMenu.className === smmClassName) {
		mobileMenu.className = '';
	} else {
		mobileMenu.className = smmClassName;
	}
}

function linkMod(link) {
	link.addEventListener('click', function(e) {
		console.log(location.hostname);
		//history.pushState(null, null, link.href);
		e.preventDefault();
	}, false);
}

/*function swapContent(href) {
	var req = new XMLHttpRequest();
	req.open('GET',
			location.hostname + '';
		);
}*/

/* Main */
btnMobileMenu.addEventListener('click', toggleMobileMenu);

linkMod(document.getElementById('test'));
