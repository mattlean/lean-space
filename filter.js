var workItems = document.getElementsByClassName('work-item');
var catGame = document.getElementById('catGame');
var catWebapp = document.getElementById('catWebapp');
var catWebsite = document.getElementById('catWebsite');

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


catGame.addEventListener('click', setFilter);
catWebapp.addEventListener('click', setFilter);
catWebsite.addEventListener('click', setFilter);
