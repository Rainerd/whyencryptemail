function update_os(selected) {
	var os = selected.options[selected.selectedIndex].value;
	list_clients(os);
	update_instructions();
}
function list_clients(os) {
	var clients = document.getElementById('client');
	clients.options.length = 0;
	clients.disabled = false;
	if(os === 'windows' || os === 'osx' || os === 'debian' || os === 'fedora') {
		clients.options[clients.options.length] = new Option('Thunderbird','thunderbird');
		clients.options[clients.options.length] = new Option('Google Chrome / Chromium','chrome');
	}
	else {
		clients.options[clients.options.length] = new Option('None available','none');
		clients.disabled = true;

	}
}
function make_step(title, instruction, video) {
	instruction = '<li><span class="instructiontitle">'+title+':</span> ' + instruction;
	if(video != null) {
		instruction = instruction +' (<a href="javascript:show_video(\''+video+'\')">Show me</a>)';
	}
	instruction = instruction + '</li>'
	return instruction;
}
function show_video(video) {
        if(video != null) {
                document.getElementById('video').style.display = 'block';
                document.getElementById('webmsrc').src = 'webm/'+video+'.webm';
                document.getElementById('mp4src').src = 'mp4/'+video+'.mp4';
                document.getElementById('videoplayer').load();
                document.getElementById('videoplayer').play();
        }
        else {
                document.getElementById('video').style.display = 'none';
        }
}

function update_instructions() {
	var operatingsystems = document.getElementById('operatingsystem');
	var os = operatingsystems.options[operatingsystems.selectedIndex].value;
	var clients = document.getElementById('client');
	var client = clients.options[clients.selectedIndex].value;

	// For analytics, consider disabling in the future
	var xmlhttp=new XMLHttpRequest();
	xmlhttp.open('POST','analytics_'+os+'_'+client, true);
	try {
		xmlhttp.send();
	}
	catch(err) {
	}

	var instructions = '';
	if(client !== 'chrome') { // All others need GPG to be installed separately
	switch(os) {
		case 'windows':
			instructions=make_step('Install GPG','<a href="http://gpg4win.org">Click here</a>',null);
			break;
		case 'osx':
			instructions=make_step('Install GPG','<a href="https://gpgtools.org/">Install GPG</a>',null);
			break;
		case 'debian':
			instructions=make_step('Install GPG','Run <span class="console">sudo apt-get install gnupg</span>',null);
			break;
		case 'fedora':
			instructions=make_step('Install GPG','Run <span class="console">sudo yum install gpg</span>','fedora_gpg_install');
			break;
		default:
			instructions='';
			break;
	}
	}
	switch(client) {
		case "thunderbird":
			instructions = instructions + make_step('Install Engimail','Click on the menu button and choose "Add-ons". Type "enigmail" in the search field. Click the "Install" button next to Enigmail. Click the "Restart now" link.','fedora_enigmail_install');
			instructions = instructions + make_step('Run Setup Wizard', 'Choose OpenPGP -> Setup Wizard and follow the instructions. Signing emails is usually unnecessary so you may want to chose not to do that by default. You should chose to encrypt mail by default.','fedora_enigmail_setup');
			instructions = instructions + make_step('Import keys','Choose OpenPGP -> Key Management -> Keyserver -> Search for Keys. Search for the email addresses of your contacts to see if they have published encryption keys. You can also use the <a href="keysearch.html">addressbook upload</a> page to more quickly see who of your contacts have an encryption key available.','fedora_enigmail_import');
			instructions = instructions + make_step('Export keys','Choose OpenPGP -> Key Management. Choose "Display All Keys by Default". Right click on your key and choose "Upload Pulbic Keys to Keyserver. Tell your contacts to import the key you just published to the keyserver','fedora_enigmail_upload');
			break;
		case 'chrome':
			instructions = instructions + make_step('Install Mailvelope','Go to the <a href="https://chrome.google.com/webstore/detail/mailvelope/kajibbejlbohfaggdiogboambcijhkke">Mailvelope</a> page in the Chrome store. Click the "Add to Chrome" button.','mailvelope_install');
			instructions = instructions + make_step('Import keys','Go to the <a href="https://sks-keyservers.net/i/#extract">SKS Keyservers</a> and type in the email address of one of your contacts in the box marked "Search String". Click the on the link in the keyID column. Select all the text on the page, press the right mouse button and select "copy". Click the Mailvelope button next to the address bar and select "Options" and then "Import Keys". Click the text box with the right mouse button and select "Paste". Click "Submit". You can also use the <a href="keysearch.html">addressbook upload</a> page to more quickly see who of your contacts have an encryption key available.','mailvelope_import');
			instructions = instructions + make_step('Generate and export key','Click the Mailvelope button next the the address bar and select "Options" and then "Generate Key". Type in your name, e-mail address and a password. Click submit. Click "Display Keys". Select the key you just generated and click "Export" and "Display Public Key". Select all the text in the box, click with your right mouse button and select "Copy". Go to <a href="https://sks-keyservers.net/i/#submit">SKS Keyservers</a>, right click with your mouse on the text box and select "Paste". Click the "Submit this key to the keyserver!" button.','mailvelope_generate');
			break;
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

	document.getElementById('feedback').innerHTML = 'Thank you for the feedback!';
	var xmlhttp=new XMLHttpRequest();
	xmlhttp.open('POST','feedback_'+os+'_'+client+'_'+type,true);
	try {
		xmlhttp.send();
	}
	catch(err) {
	}
}
