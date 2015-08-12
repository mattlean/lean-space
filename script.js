var btnMobileMenu = document.getElementById('btn-mobile-menu');
var mobileMenu = document.getElementById('mobile-menu');
var content = document.getElementById('content');

var domParser = new DOMParser();

var gLoad = false; //true when new page is downloading, false otherwise
var gCurrPath; //path from most recently clicked link

/* Opens and closes mobile nav menu */
function toggleMobileMenu() {
	smmClassName = 'show-mobile-menu';

	if(mobileMenu.className === smmClassName) {
		mobileMenu.className = '';
	} else {
		mobileMenu.className = smmClassName;
	}
}

/* Hides content during loading */
function startLoad() {
	gLoad = true;
	content.className = 'load';
	//display loading icon
}

/* Stops loading and reveals new content */
function finishLoad() {
	gLoad = false;
	content.className = '';
	//display loading icon
}

/* Gets path from anchor href */
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

/* Swap content without page refresh on link click */
function swapContent(path) {
	var xhr = new XMLHttpRequest();

	console.log('Started download for "' + path + '".');
	xhr.open('GET', path, true);
	xhr.onload = function(e) {
		if(xhr.status === 200) {
			console.log('Download succeeded.');
			// Takes content div from dl'd HTML doc and replaces current page's content div with it
			var docHtml = domParser.parseFromString(xhr.responseText, 'text/html');
			var eleContent = docHtml.getElementById('content');
			var title = docHtml.getElementsByTagName('title')[0].textContent;

			content.innerHTML = eleContent.innerHTML;
			applyLinkMods(content.getElementsByTagName('a')); // reapply linkMod to newly dl'd content
			document.title = title; // update page title
		} else {
			console.error(xhr.statusText)
			//render error page
		}

		finishLoad();
	}

	xhr.onprogress = function(e) {
		if(xhr.readyState === 1) {
			console.log('Download in progress...');
		}
	}

	xhr.onerror = function(e) {
		console.error(xhr.statusText);
		finishLoad();
		//render error page
	}
	//need to cover timeout case?
	xhr.send(null);
}

content.addEventListener('transitionend', function(e) {
	if(e['propertyName'] === 'opacity' && gLoad === true) {
		swapContent(gCurrPath);
	}
}, true);

/* Swap content without page refresh on back btn press */
window.addEventListener('popstate', function(e) {
	swapContent(location.pathname);
});

function linkMod(link) {
	link.addEventListener('click', function(e) {
		startLoad();
		gCurrPath = getPath(link.href);
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
