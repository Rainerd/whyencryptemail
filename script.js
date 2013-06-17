function update_os(selected) {
	var os = selected.options[selected.selectedIndex].value;
	list_clients(os);
	update_instructions();
}
function list_clients(os) {
	var clients = document.getElementById('client');
	clients.options.length = 0;
	clients.disabled = false;
	if(os == 'windows' || os == 'osx' || os == 'debian' || os == 'fedora') {
		clients.options[clients.options.length] = new Option('Thunderbird','thunderbird');
		clients.options[clients.options.length] = new Option('Google Chrome / Chromium','chrome');
	}
	else {
		clients.options[clients.options.length] = new Option('None available','none');
		clients.disabled = true;

	}
}

function update_instructions() {
	var operatingsystems = document.getElementById('operatingsystem');
	var os = operatingsystems.options[operatingsystems.selectedIndex].value;
	var clients = document.getElementById('client');
	var client = clients.options[clients.selectedIndex].value;

	instructions = '';
	if(client != 'chrome') { // All others need GPG to be instlled separately
	switch(os) {
		case 'windows':
			instructions='<li><a href="http://gpg4win.org">Install GPG</a></li>';
			break;
		case 'osx':
			instructions='<li><a href="https://gpgtools.org/">Install GPG</a></li>';
			break;
		case 'debian':
			instructions='<li>Run "sudo apt-get install gpg"</li>';
			break;
		case 'fedora':
			instructions='<li>Run "sudo yum install gpg"</li>';
			break;
		default:
			instructions='';
	}
	}
	switch(client) {
		case "thunderbird":
			instructions = instructions + '<li><a href="https://addons.mozilla.org/en-US/thunderbird/addon/enigmail/">Install Enigmail</a></li>';
			instructions = instructions + '<li>Choose OpenPGP -> Setup Wizard and follow the instructions. Signing emails is usually unnecessary so you may want to chose not to do that by default. You should chose to encrypt mail by default.</li>';
			instructions = instructions + '<li>Choose OpenPGP -> Key Management -> Keyserver -> Search for Keys. Search for the email addresses of your friends to see if they have published encryption keys.</li>'
			instructions = instructions + '<li>(optional) Chose OpenPGP -> Key Management. Choose "Display All Keys by Default". Right click on your key and choose "Upload Pulbic Keys to Keyserver. Tell your friends to import the key you just published to the keyserver</li>';
		case 'chrome':
			instructions = instructions + '<li>Install <a href="https://chrome.google.com/webstore/detail/mailvelope/kajibbejlbohfaggdiogboambcijhkke">Mailvelope</a>.'
			instructions = instructions + '<li>Read and follow the <a href="http://www.mailvelope.com/help#keys">excellent documentation</a></li>'
	}
	document.getElementById('instructions').innerHTML = instructions;
}
// The feedback can be grepped from the server's log
// This way we avoid needing any server side scripts
// but it does require logging being enabled
function givefeedback(type) {
	var operatingsystems = document.getElementById('operatingsystem');
	var os = operatingsystems.options[operatingsystems.selectedIndex].value;
	var clients = document.getElementById('client');
	var client = clients.options[clients.selectedIndex].value;

	document.getElementById('feedback').innerHTML = 'Thank you for the feedback!'
	xmlhttp=new XMLHttpRequest();
	xmlhttp.open('POST','feedback_'+os+'_'+client+'_'+type,true);
	xmlhttp.send();
}
