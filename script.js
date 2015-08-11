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
		var xmlDoc = domParser.parseFromString(req.responseText, 'text/html');
		var content = xmlDoc.getElementById('content');
		
		document.getElementById('content').innerHTML = content.innerHTML;
		applyLinkMods(document.getElementsByTagName('a'));
		
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

/* Checks to see if link is external */
function isInternalLink(link) {
	var splitLink = link.href.split('/');

	if(splitLink[0] === 'http:') {
		if((splitLink[2] === location.host) || (splitLink[2] === location.hostname)) {
			return true;
		}
	}
	return false;
}

/* Applies linkMod() to links within host */
function applyLinkMods(allLinks) {
	for(var i = 0; i < allLinks.length; ++i) {
		if(isInternalLink(allLinks[i])) {
			linkMod(allLinks[i]);
		}
	}
}

/* Main */
btnMobileMenu.addEventListener('click', toggleMobileMenu);
applyLinkMods(document.getElementsByTagName('a'));
