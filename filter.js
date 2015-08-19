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
	columnWidth: 320
});

function startFilter() {
	console.log('startFilter');
	for(var i = 0; i < workItems.length; ++i) {
		var itemCats = workItems[i].dataset.cat.split(' ');
		for(var j = 0; j < itemCats.length; ++ j) {
			if(filterState['game'] === true && itemCats[j] === 'game') {
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
