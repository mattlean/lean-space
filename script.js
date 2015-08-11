var btnMobileMenu = document.getElementById('btn-mobile-menu');
var mobileMenu = document.getElementById('mobile-menu');
var domParser = new DOMParser();

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
	var path = '/';

	// i starts at 3 because that is after the hostname in splitHref
	for(var i = 3; i < splitHref.length; ++i) {
		path += splitHref[i];

		if((i + 1) < splitHref.length) {
			path += '/';
		}
	}

	console.log('get path called');
	return path;
}

/* Swap content without page refresh */
function swapContent(path) {
	var req = new XMLHttpRequest();

	console.log('Downloading "' + path + '".');
	req.open('GET',
			path,
			false
		);
	req.send();

	if(req.status === 200) {
		console.log('Download succeeded.');
		console.log(req.responseText);
		var xmlDoc = domParser.parseFromString(req.responseText, 'text/html');
		console.log(xmlDoc);
		var content = xmlDoc.getElementById('content');
		console.log(content);
		document.getElementById('content').innerHTML = content.innerHTML;
		linkMod(document.getElementById('test3'));
		
		return true;
	}
	// render error screens here
	console.log('Download failed.');
	return false;
}

/* Cover back button case */
window.addEventListener('popstate', function(e) {
	swapContent(location.pathname);
});

function linkMod(link) {
	link.addEventListener('click', function(e) {
		var path = getPath(link.href);
		swapContent(path);
		history.pushState(null, null, link.href);
		e.preventDefault();
	}, false);
}

/* Main */
btnMobileMenu.addEventListener('click', toggleMobileMenu);

linkMod(document.getElementById('test'));
linkMod(document.getElementById('test2'));
linkMod(document.getElementById('test3'));
linkMod(document.getElementById('test4'));
linkMod(document.getElementById('test5'));
