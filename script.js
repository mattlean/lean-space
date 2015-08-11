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

function getPath(href) {
	var splitHref = href.split('/');
	var path = '';

	// i starts at 3 because that is after the hostname in splitHref
	for(var i = 3; i < splitHref.length; ++i) {
		console.log(splitHref[i]);
		path += splitHref[i];

		if((i + 1) < splitHref.length) {
			path += '/';
		}
	}

	return path;
}

function linkMod(link) {
	link.addEventListener('click', function(e) {
		swapContent(link.href);
		history.pushState(null, null, link.href);
		e.preventDefault();
	}, false);
}

function swapContent(href) {
	var req = new XMLHttpRequest();
	var path = getPath(href);
	console.log(path);

	req.open('GET',
			path,
			false
		);
	req.send();

	if(req.status === 200) {
		console.log('success');
		//console.log(req.responseText);
		document.getElementById('content').innerHTML = req.responseText;
		return true;
	}
	console.log('nope');
	return false;
}

/* Main */
btnMobileMenu.addEventListener('click', toggleMobileMenu);

linkMod(document.getElementById('test'));
linkMod(document.getElementById('test2'));
linkMod(document.getElementById('test3'));
