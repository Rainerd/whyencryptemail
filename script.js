function update_os(selected) {
	var os = selected.options[selected.selectedIndex].value;
	list_clients(os);
	update_instructions();
}

// List valid clients for the given OS
function list_clients(os) {
	var clients = document.getElementById('client');
	clients.options.length = 0;
	clients.disabled = false;
	if(os === 'windows' || os === 'debian' || os === 'fedora') {
		clients.options[clients.options.length] = new Option('Thunderbird','thunderbird');
		clients.options[clients.options.length] = new Option('Google Chrome / Chromium','chrome');
	} else if(os === 'osx') {
		clients.options[clients.options.length] = new Option('Mail','applemail');
	}
	else {
		clients.options[clients.options.length] = new Option('None available','none');
		clients.disabled = true;

	}
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
			instructions=str_windows_gpg_install;
			break;
		case 'osx':
			instructions=str_osx_gpg_install;
			break;
		case 'debian':
			instructions=str_debian_gpg_install;
			break;
		case 'fedora':
			instructions=str_fedora_gpg_install;
			break;
		default:
			instructions='';
			break;
	}
	}
	switch(client) {
		case "thunderbird":
			instructions += str_thunderbird_instructions;
			break;
		case 'chrome':
			instructions += str_chrome_instructions;
			break;
        case 'applemail':
            instructions += str_applemail_instructions;
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

	document.getElementById('feedback').innerHTML = str_thank_you;
	var xmlhttp=new XMLHttpRequest();
	xmlhttp.open('POST','feedback_'+os+'_'+client+'_'+type,true);

	try {
		xmlhttp.send();
	}
	catch(err) {
	}
}
