// Fake dictionary lookup. We have so few elements that a real one isn't needed.
function lookup(dict, key) {
	for (i in dict) {
		if(dict[i][0] === key) return dict[i][1];
	}
	return null;
}

function get_answer(question_id) {
	var tmp = document.getElementById(question_id);
	if(tmp == null) alert(question_id);
	return tmp.options[tmp.selectedIndex].value;
}

function remove_questions(starting_from) {
	var questions = document.getElementById('questions');
	var nodes = questions.childNodes;
	var nodecount = nodes.length;
	while(questions.childNodes.length > starting_from + 1) {
		questions.removeChild(questions.lastChild);
	}
}


function add_question(id, text, option_names, option_ids, onchange) {
	s = document.createElement('span');
	s.setAttribute('class','question');

	question = text;
	question += '<select onchange="'+onchange+'(this)" id="'+id+'">';
	for (i in option_names) {
		question += '<option value="'+option_ids[i]+'">'+option_names[i]+'</option>';
	}
	question += '</select><br/>';
	s.innerHTML = question;
	document.getElementById('questions').appendChild(s);
}

// A new OS has been picked
function update_os(selected) {
	var os = get_answer('operatingsystem');
	remove_questions(2);
	list_clients(os);
}

// List valid clients for the given OS
function list_clients(os) {
	var client_names = [];
	var client_ids = [];	

	if(os === 'windows' || os === 'debian' || os === 'fedora') {
		client_ids.push('thunderbird');
		client_names.push(lookup(str_client_names,'thunderbird'));
	}
	if(os === 'windows' || os === 'debian' || os === 'fedora' || os === 'osx') {
		client_ids.push('webmail');
		client_names.push(lookup(str_client_names,'gmail'));

		client_ids.push('webmail');
		client_names.push(lookup(str_client_names,'outlookcom'));

		client_ids.push('webmail');
		client_names.push(lookup(str_client_names,'yahoo'));

		client_ids.push('webmail');
		client_names.push(lookup(str_client_names,'gmx'));

	}
        if(os === 'osx') {
		client_ids.push('applemail');
		client_names.push(lookup(str_client_names,'applemail'));
	}
	if(os === 'fedora') {
		client_ids.push('generic');
		client_names.push(lookup(str_client_names,'generic'));
	}
	if(os === 'android') {
		client_ids.push('k9mail');
		client_names.push(lookup(str_client_names,'k9mail'));
	}

	// If we use .innerHTML directly on the questions-element weird things seem to happen
	add_question('client', str_client_question, client_names, client_ids, 'update_clients');
	update_clients();
}

function update_clients(selected) {
	var os = get_answer('operatingsystem');
	var client = get_answer('client');
	remove_questions(3);

	if(client === 'webmail') {
		list_browsers(os, client);
	}
	else {
		update_instructions(os,client);
	}

}

function list_browsers(os, client) {
	var browser_names = [];
	var browser_ids = [];

	if(os === 'windows' || os === 'osx' || os === 'debian' || os === 'fedora') {
		browser_names.push(lookup(str_browser_names,'chrome'));
		browser_ids.push('chrome');
	}
	add_question('browser', str_browser_question, browser_names, browser_ids, 'update_browser');
	update_browser();

}

function update_browser(selected) {
	update_instructions();
}
function update_haskey() {
	update_instructions();
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

// TODO: This should be fixed to also send other answers
function post_analytics(os, client) {
	var xmlhttp=new XMLHttpRequest();
	xmlhttp.open('POST','analytics_'+os+'_'+client, true);
	try {
		xmlhttp.send();
	}
	catch(err) {
	}

}
function update_instructions() {
	var os = get_answer('operatingsystem');
	var client = get_answer('client');
	var haskey = get_answer('haskey');

	post_analytics(os, client);
	var instructions = '';
	if(client === 'thunderbird' || client === 'applemail') {
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
		case 'thunderbird':
			instructions += str_thunderbird_commonsetup;
			if(haskey === 'yes') {
				instructions += str_thunderbird_haskey;
			}
			else {
				instructions += str_thunderbird_firstkey;
			}
			instructions += str_thunderbird_usage;
			break;
		case 'webmail':
			var browsers = document.getElementById('browser');
			var browser = browsers.options[browsers.selectedIndex].value;
			switch(browser) {
				case 'chrome':
					instructions += str_chrome_instructions;
					break;
			}
			break;
		case 'applemail':
			instructions += str_applemail_instructions;
			break;
		case 'generic':
			if(os === 'fedora') {
				instructions += str_kgpg_instructions;
			}
			break;
		case 'k9mail':
			instructions += str_k9mail_setup;
			if(haskey === 'yes') {
				instructions += str_k9mail_haskey;
			}
			else {
				instructions += str_k9mail_firstkey;
			}
			instructions += str_k9mail_usage;
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
	add_question('haskey',str_haskey_question, str_noyes, ['no','yes'],'update_haskey');
	add_question('operatingsystem',str_os_question,str_os_names,['windows','osx','debian','fedora','android'],'update_os');
	update_os(document.getElementById('operatingsystem'));
}
