if(lantern === undefined) {
	var lantern = new Lantern();
	console.log('created lantern');
} else {
	console.log('lantern exists already');
	lantern.modifyLinks();
}

