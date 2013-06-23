gloading = 0;
gstorage = true; // TODO: Detect and handle missing storage
// Search for email adddresses in a text
function scanForAddresses(text) {
	// TODO: This RegEx is probably way too simple
	lookupAddresses(text.match(/[a-z0-9_+.-]*@[a-z0-9.]*/g));
}	
// Initialize UI and send queries for the list of addresses given
function lookupAddresses(addresses) {
	document.getElementById('search_results').style.display = 'block';
	window.location='#search_results';
	document.getElementById('loading_indicator').style.display = 'inline';
	gloading += addresses.length;
	queryKey(addresses, 0);
}

// Query keys until there are no more left
// Once one key has been checked, a query for the next key is started
// This is to make sure the server is not bombarded with queries (they get upset)
// TODO: Probably OK to make a few queries at the same time
function queryKey(addresses, index) {
	var xmlhttp=new XMLHttpRequest();
	// This requires a proxy rewrite by the webserver to work
	// This is due to cross-domain AJAX being forbidden
	var query = '/keyserver/sks/lookup?op=index&exact=on&search='+addresses[index];
	//
	// Use actual keyserver URL in links instead of our fake one
	var actual_url = 'http://pool.sks-keyservers.net:11371/pks/lookup?op=index&exact=on&search='+addresses[index];

	xmlhttp.onreadystatechange=function() {
		if(xmlhttp.readyState==4 && xmlhttp.status==200) {
			// Sucessfully retrieved key, append the email address to the results list
			// TODO: Check that the result actually corresponds to what we wanted, apparently not even exact=on is enough :-(
			// TODO: Consider showing some more info about the key too
			document.getElementById('results').innerHTML += '<li><a href="'+actual_url+'">'+addresses[index]+'</a>';
		}
		if(xmlhttp.readyState==4) {
			// Query done, but maybe not successfully. Update UI to reflect progress
			gloading -= 1;
			if(gloading <= 0) { // Done!
				document.getElementById('loading_indicator').style.display = 'none';
				if(gstorage) {
					sessionStorage.lookupResults = document.getElementById('results').innerHTML;
				}
			}
			else {
				queryKey(addresses,index+1); // Fetch next key
			}
		}
	}
	xmlhttp.open("GET", query, true);
	// Update UI
	document.getElementById('count').innerHTML = gloading;
	document.getElementById('loading_indicator').style.display = 'inline';
	xmlhttp.send();
}
function handleFileSelect(evt) {
	if(!document.getElementById('results')) return; // The back button seems to trigger this function before the page is loaded?
	document.getElementById('results').innerHTML = '';
	var files = evt.target.files; // FileList object
	for (var i = 0, f; f = files[i]; i++) {
		var reader = new FileReader();
		reader.onload = (function(theFile) {
			return function(e) {
				scanForAddresses(e.target.result)
			};
		})(f);
		reader.readAsText(f);
	}
}
function loadCached() {
	// Restore saved results so we don't need to query again when e.g. the back button is pressed
	if(document.referrer.indexOf('accounts.google.com') < 0 && sessionStorage.lookupResults) {
		document.getElementById('results').innerHTML = sessionStorage.lookupResults;
		document.getElementById('search_results').style.display = 'block';
		document.getElementById('loading_indicator').style.display = 'none';
	}
}
function searchWritein() {
	document.getElementById('results').innerHTML = '';
	scanForAddresses(document.getElementById('writein').value);
}
