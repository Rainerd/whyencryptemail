function lookup(dict, key) {
	for (i in dict) {
		if(dict[i][0] === key) return dict[i][1];
	}
	return null;
}

function make_question(id, text, options, values, onchange) {
	question = '';
	question += '<span>'+text;
	question += '<select onchange="'+onchange+'(this)" id="'+id+'">';
	for (i in options) {
		question += '<option value="'+values[i]+'">'+options[i]+'</option>';
	}
	question += '</select></span>';
	return question;
}

function update_os(selected) {
	var os = selected.options[selected.selectedIndex].value;
	qs = document.getElementById('questions');
	nodes = qs.childNodes;
	for(i=1;i<nodes.length;i++) {
		qs.removeChild(nodes[i]);
	}
	list_clients(os);
	update_instructions();
}

// List valid clients for the given OS
function list_clients(os) {
	var clients = [];
	var values = [];	

	if(os === 'windows' || os === 'osx' || os === 'debian' || os === 'fedora') {
		values.push('thunderbird');
		clients.push(lookup(str_client_names,'thunderbird'));
		values.push('chrome');
		clients.push(lookup(str_client_names,'chrome'));
	}
	s = document.createElement('span');
	s.innerHTML = make_question('client', str_client_question, clients, values, 'update_instructions');
	document.getElementById('questions').appendChild(s);
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
function init() {
	questions = ''
	questions += make_question('operatingsystem',str_os_question,str_os_names,['windows','osx','debian','fedora'],'update_os');
	document.getElementById('questions').innerHTML = questions;
	update_os(document.getElementById("operatingsystem"));
}
