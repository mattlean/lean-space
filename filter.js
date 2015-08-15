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

function filter() {
	for(var i = 0; i < workItems.length; ++i) {
		if(filterState['game'] === true && workItems[i].dataset.cat === 'game') {
			workItems[i].className = 'work-item';
		} else if(filterState['webapp'] === true && workItems[i].dataset.cat === 'webapp') {
			workItems[i].className = 'work-item';
		} else if(filterState['website'] === true && workItems[i].dataset.cat === 'website') {
			workItems[i].className = 'work-item';
		} else {
			workItems[i].className = 'work-item test';
		}
	}
}

function setFilter(dataAttr) {
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
	
	filter();
}


var msnry = new Masonry(gallery, {
	// options
	itemSelector: '.work-item',
	columnWidth: 312
});

// element argument can be a selector string
//   for an individual element
var msnry = new Masonry('#gallery', {
	// options
});


catGame.addEventListener('click', setFilter);
catWebapp.addEventListener('click', setFilter);
catWebsite.addEventListener('click', setFilter);
