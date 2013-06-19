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
function make_step(instruction, video) {
	instruction = '<li>'+instruction;
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

	var instructions = '';
	if(client !== 'chrome') { // All others need GPG to be instlled separately
	switch(os) {
		case 'windows':
			instructions=make_step('<a href="http://gpg4win.org">Install GPG</a>',null);
			break;
		case 'osx':
			instructions=make_step('<a href="https://gpgtools.org/">Install GPG</a>',null);
			break;
		case 'debian':
			instructions=make_step('Run <span class="console">sudo apt-get install gnupg</span>',null);
			break;
		case 'fedora':
			instructions=make_step('Run <span class="console">sudo yum install gpg</span>','fedora_gpg_install');
			break;
		default:
			instructions='';
			break;
	}
	}
	switch(client) {
		case "thunderbird":
			instructions = instructions + make_step('<a href="https://addons.mozilla.org/en-US/thunderbird/addon/enigmail/">Install Enigmail</a>','fedora_enigmail_install');
			instructions = instructions + make_step('Choose OpenPGP -> Setup Wizard and follow the instructions. Signing emails is usually unnecessary so you may want to chose not to do that by default. You should chose to encrypt mail by default.','fedora_enigmail_setup');
			instructions = instructions + make_step('Choose OpenPGP -> Key Management -> Keyserver -> Search for Keys. Search for the email addresses of your friends to see if they have published encryption keys.','fedora_enigmail_import');
			instructions = instructions + make_step('(optional) Chose OpenPGP -> Key Management. Choose "Display All Keys by Default". Right click on your key and choose "Upload Pulbic Keys to Keyserver. Tell your friends to import the key you just published to the keyserver','fedora_enigmail_upload');
			break;
		case 'chrome':
			instructions = instructions + make_step('Install <a href="https://chrome.google.com/webstore/detail/mailvelope/kajibbejlbohfaggdiogboambcijhkke">Mailvelope</a>.',null);
			instructions = instructions + make_step('Read and follow the <a href="http://www.mailvelope.com/help#keys">excellent documentation</a>',null);
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
	xmlhttp.send();
}
