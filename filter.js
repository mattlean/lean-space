var workItems = document.getElementsByClassName('work-item');
var catGame = document.getElementById('catGame');
var catWebapp = document.getElementById('catWebapp');
var catWebsite = document.getElementById('catWebsite');
var gallery = document.getElementById('gallery');

var filterState = {
	'game': false,
	'webapp': false,
	'website': false
};
var defaultClass = 'work-item';
var hideClass = 'work-item hide';
var ghostClass = 'work-item hide ghost';

var msnry = new Masonry(gallery, {
	// options
	itemSelector: '.work-item',
	columnWidth: 312
});

function startFilter() {
	console.log('startFilter');
	for(var i = 0; i < workItems.length; ++i) {
		if(filterState['game'] === true && workItems[i].dataset.cat === 'game') {
			workItems[i].className = defaultClass;
		} else if(filterState['webapp'] === true && workItems[i].dataset.cat === 'webapp') {
			workItems[i].className = defaultClass;
		} else if(filterState['website'] === true && workItems[i].dataset.cat === 'website') {
			workItems[i].className = defaultClass;
		} else {
			workItems[i].className = hideClass;
		}
	}

	window.setTimeout(endFilter, 500);
}

function endFilter() {
	console.log('endFilter');
	for(var i = 0; i < workItems.length; ++i) {
		if(workItems[i].className === hideClass) {
			workItems[i].className = ghostClass;
		}
	}

	msnry.layout();
}

function setFilter(dataAttr) {
	console.log('called');
	if(catGame.checked === true) {
		filterState['game'] = true;
	} else {
		filterState['game'] = false;
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
catWebapp.addEventListener('click', setFilter);
catWebsite.addEventListener('click', setFilter);
