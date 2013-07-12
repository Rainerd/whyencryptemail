gloading = 0;
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
	document.getElementById('download_link').style.display = 'none';
	gloading = addresses.length;
	threads = 5;
	for(i = 0; i < threads; i++) {
		queryKey(addresses, i, threads);
	}
}

// Query keys until there are no more left
// Once one key has been checked, a query for the next key is started
// This is to make sure the server is not bombarded with queries (they get upset)
// TODO: Probably OK to make a few queries at the same time
// TODO: Would it be possible to use websockets instead of AJAX to avoid needing a proxy?
function queryKey(addresses, index, threads) {
	if (index > addresses.length) return;

	var xmlhttp=new XMLHttpRequest();
	// This requires a proxy rewrite by the webserver to work
	// This is due to cross-domain AJAX being forbidden
	var query = '/keyserver/sks/lookup?op=index&options=mr&exact=on&search='+addresses[index];

	xmlhttp.onreadystatechange=function() {
		if(xmlhttp.readyState==4 && xmlhttp.status==200) {
			var response = xmlhttp.responseText;
			keys = response.split('\npub:');
			// TODO: Check that all the servers actually return machine readable data
			// At least some return HTML for the actual key :-(
			// Check if there is the optional info line and skip it
			// Not tested without info line
			add = 0;
			if(keys[0].split(':')[0] == 'info') add = 1;
			for(ikey=add; ikey<keys.length;ikey++) {
				var keyid = keys[ikey].split(':')[0];
				var uids = keys[ikey].split('\nuid:')
				for(iuid=1; iuid<uids.length;iuid++) {
					var uid = uids[iuid].split(':')[0];
					// TODO: Check expiration. But it seems like it is not actually included in result (server bug?)
					if(uid.indexOf('<'+addresses[index]+'>') > -1) {
						var keyurl = '/keyserver/sks/lookup?op=get&options=mr&exact=on&search=0x'+keyid;
						// Found a valid key
						document.getElementById('results').innerHTML += '<li><input type="checkbox" class="keyselect" checked="checked" onchange="key_selected()" id="'+keyid+'"/><a href="'+keyurl+'">'+decodeURIComponent(uid).replace('<','&lt;')+'</a>';

						// We need to extract the key block since some servers seem to return HTML despite options=mr
						getPGPKey(keyurl, keyid, function(data, keyid) { var key = escape(data.match(/-----BEGIN PGP PUBLIC KEY BLOCK-----(.|[\n\r])*-----END PGP PUBLIC KEY BLOCK-----/));  document.getElementById(keyid).setAttribute('data-pgpkey', key); key_selected(null) });
						document.getElementById('download_link').style.display = 'inline';
					}
				}
			}
		}
		if(xmlhttp.readyState==4) {
			// Query done, but maybe not successfully. Update UI to reflect progress
			gloading -= 1;
			if(gloading <= 0) { // Done!
				document.getElementById('loading_indicator').style.display = 'none';
			}
			else {
				queryKey(addresses,index+threads, threads); // Fetch next key
			}
		}
	}
	xmlhttp.open("GET", query, true);
	// Update UI
	document.getElementById('count').innerHTML = gloading;
	document.getElementById('loading_indicator').style.display = 'inline';
	xmlhttp.send();
}
function getPGPKey(url, keyid, whenready) {
	var xmlhttp=new XMLHttpRequest();
	xmlhttp.onreadystatechange=function() {
		if(xmlhttp.readyState==4 && xmlhttp.status==200) {
			whenready(xmlhttp.responseText, keyid);
		}
	}
	xmlhttp.open("GET", url, true);
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
function init() {
	if(!window.FileReader) {
		document.getElemebyId('file').disabled = true;
	}
}
function searchWritein() {
	document.getElementById('results').innerHTML = '';
	scanForAddresses(document.getElementById('writein').value);
}
function key_selected(selected) {
	dl = document.getElementById('download_link');
	dl.href = 'data:application/pgp-keys;charset=utf-8,';
	elems = document.getElementsByTagName('input');
	for(i=0; i <  elems.length; i++) {
		elem = elems[i];
		if(elem.getAttribute('class') === 'keyselect') {
			if(elem.checked) {
				dl.href += elem.getAttribute('data-pgpkey');
			}
		}
	}
}
