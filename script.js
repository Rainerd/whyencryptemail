// Fake dictionary lookup. We have so few elements that a real one isn't needed.
function lookup(dict, key) {
	for (i in dict) {
		if(dict[i][0] === key) return dict[i][1];
	}
	return null;
}


function make_question(id, text, option_names, option_ids, onchange) {
	question = '';
	question += '<span>'+text;
	question += '<select onchange="'+onchange+'(this)" id="'+id+'">';
	for (i in options) {
		question += '<option value="'+option_ids[i]+'">'+option_names[i]+'</option>';
	}
	question += '</select></span>';
	return question;
}

// A new OS has been picked
function update_os(selected) {
	var os = selected.options[selected.selectedIndex].value;
	qs = document.getElementById('questions');
	nodes = qs.childNodes;

	// Remove all questions except the first one
	for(i=1;i<nodes.length;i++) {
		qs.removeChild(nodes[i]);
	}
	list_clients(os);
	update_instructions();
}

// List valid clients for the given OS
function list_clients(os) {
	var client_names = [];
	var clinet_ids = [];	

	if(os === 'windows' || os === 'osx' || os === 'debian' || os === 'fedora') {
		client_ids.push('thunderbird');
		client_names.push(lookup(str_client_names,'thunderbird'));
		client_ids.push('chrome');
		client_names.push(lookup(str_client_names,'chrome'));
	}
	// If we use .innerHTML directly on the questions-element weird things seem to happen
	s = document.createElement('span');
	s.innerHTML = make_question('client', str_client_question, client_names, client_ids, 'update_instructions');
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

function post_analytics(os,client) {
	var xmlhttp=new XMLHttpRequest();
	xmlhttp.open('POST','analytics_'+os+'_'+client, true);
	try {
		xmlhttp.send();
	}
	catch(err) {
	}

}
function update_instructions() {
	var operatingsystems = document.getElementById('operatingsystem');
	var os = operatingsystems.options[operatingsystems.selectedIndex].value;
	var clients = document.getElementById('client');
	var client = clients.options[clients.selectedIndex].value;

	post_analytics(os, client);
	var instructions = '';
	if(client !== 'chrome') { // All others need GPG to be installed separately
		switch(os) {
			case 'windows':
				instructions = str_windows_gpg_install;
				break;
			case 'osx':
				instructions = str_osx_gpg_install;
				break;
			case 'debian':
				instructions = str_debian_gpg_install;
				break;
			case 'fedora':
				instructions = str_fedora_gpg_install;
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
