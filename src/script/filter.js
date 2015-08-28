/* Gallery */
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
var revealClass = 'work-item work-item-reveal';
var ghostClass = 'work-item work-item-ghost';

var msnry = new Masonry(gallery, {
	itemSelector: '.work-item',
	columnWidth: 320
});

function startFilter() {
	for(var i = 0; i < workItems.length; ++i) {
		var itemCats = workItems[i].dataset.cat.split(' ');
		for(var j = 0; j <= itemCats.length; ++ j) {
			if(j !== itemCats.length) {
				if(
					(filterState.game === true && itemCats[j] === 'game') ||
					(filterState.mobileapp === true && itemCats[j] === 'mobileapp') ||
					(filterState.webapp === true && itemCats[j] === 'webapp') ||
					(filterState.website === true && itemCats[j] === 'website')
				) {
					if(workItems[i].className === ghostClass) {
						workItems[i].className = revealClass;
					}
					break;
				}
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
		} else if(workItems[i].className === revealClass) {
			workItems[i].className = defaultClass;
		}
	}

	msnry.layout();
}

function setFilter(dataAttr) {
	if(catGame.checked === true) {
		filterState.game = true;
	} else {
		filterState.game = false;
	}

	if(catMobileapp.checked === true) {
		filterState.mobileapp = true;
	} else {
		filterState.mobileapp = false;
	}

	if(catWebapp.checked === true) {
		filterState.webapp = true;
	} else {
		filterState.webapp = false;
	}

	if(catWebsite.checked === true) {
		filterState.website = true;
	} else {
		filterState.website = false;
	}
	
	startFilter();
	highlightFilterOps();
}

catGame.addEventListener('click', setFilter);
catMobileapp.addEventListener('click', setFilter);
catWebapp.addEventListener('click', setFilter);
catWebsite.addEventListener('click', setFilter);

/* Filter Menu */
var filterOps = document.getElementById('filter').getElementsByTagName('li');
var selectClass = 'filter-select';

function highlightFilterOps() {
	for(var i = 0; i < filterOps.length; ++i) {
		var checkbox = filterOps[i].querySelector('input');
		if(checkbox.checked) {
			filterOps[i].className = selectClass;
		} else {
			filterOps[i].className = '';
		}
	}
}

function setupFilterOps() {
	// allows li to control child checkbox
	for(var i = 0; i < filterOps.length; ++i) {
		filterOps[i].addEventListener('click', function(e) {
			if(e.target.type !== 'checkbox') {
				e.target.querySelector('input').click();
			}
		});
	}

	highlightFilterOps();
}

setupFilterOps();
