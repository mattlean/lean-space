var workItems = document.getElementsByClassName('work-item');
var catGame = document.getElementById('catGame');
var catMobileapp = document.getElementById('catMobileapp');
var catWebapp = document.getElementById('catWebapp');
var catWebsite = document.getElementById('catWebsite');
var gallery = document.getElementById('gallery');

var filterState = {
	'game': false,
	'webapp': false,
	'website': false,
	'mobileapp': false
};
var defaultClass = 'work-item';
var hideClass = 'work-item work-item-hide';
var ghostClass = 'work-item work-item-hide work-item-ghost';

var msnry = new Masonry(gallery, {
	// options
	itemSelector: '.work-item',
	columnWidth: 320
});

function startFilter() {
	for(var i = 0; i < workItems.length; ++i) {
		var itemCats = workItems[i].dataset.cat.split(' ');
		for(var j = 0; j < itemCats.length; ++ j) {
			if(filterState['game'] === true && itemCats[j] === 'game') {
				workItems[i].className = defaultClass;
				break;
			} else if(filterState['mobileapp'] === true && itemCats[j] === 'mobileapp') {
				workItems[i].className = defaultClass;
				break;
			} else if(filterState['webapp'] === true && itemCats[j] === 'webapp') {
				workItems[i].className = defaultClass;
				break;
			} else if(filterState['website'] === true && itemCats[j] === 'website') {
				workItems[i].className = defaultClass;
				break;
			} else {
				workItems[i].className = hideClass;
			}
		}
	}

	window.setTimeout(endFilter, 500);
}

function endFilter() {
	for(var i = 0; i < workItems.length; ++i) {
		if(workItems[i].className === hideClass) {
			workItems[i].className = ghostClass;
		}
	}

	msnry.layout();
}

function setFilter(dataAttr) {
	if(catGame.checked === true) {
		filterState['game'] = true;
	} else {
		filterState['game'] = false;
	}

	if(catMobileapp.checked === true) {
		filterState['mobileapp'] = true;
	} else {
		filterState['mobileapp'] = false;
	}

	if(catWebapp.checked === true) {
		filterState['webapp'] = true;
	} else {
		filterState['webapp'] = false;
	}

	if(catWebsite.checked === true) {
		filterState['website'] = true;
	} else {
		filterState['website'] = false;
	}
	
	startFilter();
}

catGame.addEventListener('click', setFilter);
catMobileapp.addEventListener('click', setFilter);
catWebapp.addEventListener('click', setFilter);
catWebsite.addEventListener('click', setFilter);
