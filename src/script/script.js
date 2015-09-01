var navbar = document.getElementById('navbar');
var footer = document.getElementById('footer');
var content = document.getElementById('content');
var navlinks = navbar.getElementsByTagName('a');
var loader = document.getElementById('loader');
var btnMobileMenu = navbar.querySelector('button');

var domParser = new DOMParser();

var gLoad = false; // true when new page is downloading, false otherwise
var gCurrPath; // path from most recently clicked link

/* Opens and closes mobile nav menu */
function toggleMobileMenu() {
	var smmClassName = 'mobile-menu-show';

	if(navbar.className === smmClassName) {
		navbar.className = '';
	} else {
		navbar.className = smmClassName;
	}
}

/* Highlights navlink depending on user's current path */
function highlightNavLink() {
	var navlinkSelectClass = 'navlink-select';
	var currPath = window.location.pathname.split('/')[1];

	// reset navlink highlights
	for(var i = 0; i < navlinks.length; ++i) {
		navlinks[i].className = '';
	}

	if(currPath === 'about') {
		navlinks[0].className = navlinkSelectClass;
	} else if(currPath === 'work') {
		navlinks[1].className = navlinkSelectClass;
	} else if(currPath === 'resume') {
		navlinks[2].className = navlinkSelectClass;
	} else if(currPath === 'blog') {
		navlinks[3].className = navlinkSelectClass;
	} else if(currPath === 'contact') {
		navlinks[4].className = navlinkSelectClass;
	}
}

/* Hides content during loading */
function startLoad() {
	gLoad = true;
	content.className = 'load';
	loader.className = '';
}

/* Stops loading and reveals new content */
function finishLoad() {
	gLoad = false;
	loader.className = 'load-hide';
	content.className = '';
}

/* Checks to see if link is internal and contains no hash */
function isInternalLink(link) {
	if(link.hasAttribute('data-lantern') === false) {
		var splitLink = link.href.split('/');

		if(splitLink[splitLink.length-1].indexOf('#') === -1) {
			if(splitLink[0] === 'http:') {
				if((splitLink[2] === location.host) || (splitLink[2] === location.hostname)) {
					return true;
				}
			}
		}
	}
	return false;
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

	//console.log('Started download for "' + path + '".');
	xhr.open('GET', path, true);
	xhr.onload = function(e) {
		if(xhr.status === 200) {
			//console.log('Download succeeded.');
			// Takes content div from dl'd HTML doc and replaces current page's content div with it
			var docHtml = domParser.parseFromString(xhr.responseText, 'text/html');
			var eleContent = docHtml.getElementById('content');
			var title = docHtml.getElementsByTagName('title')[0].textContent;

			content.innerHTML = eleContent.innerHTML;
			applyLinkMods(content.getElementsByTagName('a')); // reapply linkMod to newly dl'd content
			document.title = title; // update page title

			// load page javascript and highlight current page in navbar
			var pagescript;
			var currPath = path.split('/');

			if(currPath[1] === 'work') {
				if(currPath.length == 2) {
					pageScript = document.getElementById('page-script');
					document.body.removeChild(pageScript);
					pageScript = document.body.appendChild(document.createElement('script'));
					pageScript.src = '/script/filter.js';
					pageScript.setAttribute('id', 'page-script');
				} else if(currPath.length > 2) {
					pageScript = document.getElementById('page-script');
					document.body.removeChild(pageScript);
					pageScript = document.body.appendChild(document.createElement('script'));
					pageScript.src = '/script/lightbox.js';
					pageScript.setAttribute('id', 'page-script');
				}
			} else if(currPath[1] === 'blog' && currPath.length > 2) {
				pageScript = document.getElementById('page-script');
				document.body.removeChild(pageScript);
				pageScript = document.body.appendChild(document.createElement('script'));
				pageScript.src = '/script/lightbox.js';
				pageScript.setAttribute('id', 'page-script');
			}
		} else {
			console.error(xhr.statusText);
			//render error page
		}

		window.scrollTo(0,0);
		finishLoad();
		highlightNavLink();
	};

	xhr.onprogress = function(e) {
		if(xhr.readyState === 1) {
			//console.log('Download in progress...');
		}
	};

	xhr.onerror = function(e) {
		console.error(xhr.statusText);
		finishLoad();
		//render error page
	};
	//need to cover timeout case?
	xhr.send(null);
}

/* Applies custom content swap functionality to link */
function linkMod(link) {
	link.addEventListener('click', function(e) {
		if(e.button === 0) {
			navbar.className = ''; // reveal navbar if it's hiding
			footer.className = ''; // reveal footer if it's hiding
			startLoad();
			gCurrPath = getPath(link.href);
			history.pushState(null, null, link.href);
			e.preventDefault();
		}
	}, false);
}

/* Applies linkMod() to internal links only */
function applyLinkMods(allLinks) {
	for(var i = 0; i < allLinks.length; ++i) {
		if(isInternalLink(allLinks[i])) {
			linkMod(allLinks[i]);
		}
	}
}

// swapContent() after content fade out animation completes
content.addEventListener('transitionend', function(e) {
	if(e.propertyName === 'opacity' && gLoad === true) {
		swapContent(gCurrPath);
	}
}, true);

/* Swap content without page refresh on back btn press */
window.addEventListener('popstate', function(e) {
	swapContent(location.pathname);
});

/* Main */
btnMobileMenu.addEventListener('click', toggleMobileMenu);
applyLinkMods(document.getElementsByTagName('a'));
highlightNavLink();
