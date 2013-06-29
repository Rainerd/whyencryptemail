str_show_me = 'Show me';

// Generate a <li> with title, instruction and video link
// This function really doesn't belong here
function make_step(title, instruction, video) {
	instruction = '<li><span class="instructiontitle">'+title+':</span> ' + instruction;
	if(video != null) {
		instruction = instruction +' (<a href="javascript:show_video(\''+video+'\')">'+str_show_me+'</a>)';
	}
	instruction = instruction + '</li>'
	return instruction;
}

str_windows_gpg_install = make_step('Install GPG','<a href="http://gpg4win.org">Click here</a>',null);
str_osx_gpg_install = make_step('Install GPG','<a href="https://gpgtools.org/">Click here</a>',null);
str_debian_gpg_install = make_step('Install GPG','Run <span class="console">sudo apt-get install gnupg</span>',null);
str_fedora_gpg_install = make_step('Install GPG','Run <span class="console">sudo yum install gpg</span>','fedora_gpg_install');


str_thunderbird_instructions = make_step('Install Engimail','Click on the <span class="uiitem">menu button</span> and choose <span class="uiitem">Add-ons</span>. Type <span class="uiitem">enigmail</span> in the search field. Click the <span class="uiitem">Install</span> button next to Enigmail. Click the <span class="uiitem">Restart now</span> link.','fedora_enigmail_install')+
make_step('Run Setup Wizard', 'Click on the <span class="uiitem">menu button</span> and choose <span class="uiitem">OpenPGP</span> -> <span class="uiitem">Setup Wizard</span> and follow the instructions. Signing emails is usually unnecessary so you may want to chose not to do that by default. You should chose to encrypt mail by default.','fedora_enigmail_setup')+
make_step('Ignore missing keys','Click on the <span class="uiitem">menu button</span> and choose <span class="uiitem">OpenPGP</span> -> <span class="uiitem">Preferences</span>. Click <span class="uiitem">Display expert settings</span>. Choose the <span class="uiitem">Key Selection</span> tab and choose <span class="uiitem">No manual selection</span>. Go back to the <span class="uiitem">Basic</span> tab and click <span class="uiitem">Hide expert settings</span>. Click <span class="uiitem">OK</span>','fedora_enigmail_configure')+
make_step('Import keys','Click on the <span class="uiitem">menu button</span> and choose <span class="uiitem">OpenPGP</span> -> <span class="uiitem">Key Management</span> -> <span class="uiitem">Keyserver</span> -> <span class="uiitem">Search for Keys</span>. Search for the email addresses of your contacts to see if they have published encryption keys. You can also use the <a href="keysearch">addressbook upload</a> page to more quickly see who of your contacts have an encryption key available.','fedora_enigmail_import')+
make_step('Export keys','Click on the <span class="uiitem">menu button</span> and choose <span class="uiitem">OpenPGP</span> -> <span class="uiitem">Key Management</span>. Choose <span class="uiitem">Display All Keys by Default</span>. Right click on your key and choose <span class="uiitem">Upload Public Keys to Keyserver</span>. Tell your contacts to import the key you just published to the keyserver','fedora_enigmail_upload')+
make_step('Decrypting email','Open the message as normal. Type in your password and click <span class="uiitem">OK</span>','fedora_enigmail_decrypt');


str_chrome_instructions = make_step('Install Mailvelope','Go to the <a href="https://chrome.google.com/webstore/detail/mailvelope/kajibbejlbohfaggdiogboambcijhkke">Mailvelope</a> page in the Chrome store. Click the <span class="uiitem">Add to Chrome</span> button.','mailvelope_install')+
make_step('Import keys','Go to the <a href="https://sks-keyservers.net/i/#extract">SKS Keyservers</a> and type in the email address of one of your contacts in the box marked <span class="uiitem">Search String</span>. Click the on the link in the <span class="uiitem">keyID</span> column. Select all the text on the page, press the right mouse button and select <span class="uiitem">Copy</span>. Click the Mailvelope button next to the address bar and select <span class="uiitem">Options</span> and then <span class="uiitem">Import Keys</span>. Click the text box with the right mouse button and select <span class="uiitem">Paste</span>. Click <span class="uiitem">Submit</span>. You can also use the <a href="keysearch">addressbook upload</a> page to more quickly see who of your contacts have an encryption key available.','mailvelope_import')+
make_step('Generate and export key','Click the Mailvelope button next the the address bar and select <span class="uiitem">Options</span> and then <span class="uiitem">Generate Key</span>. Type in your name, e-mail address and a password. Click submit. Click <span class="uiitem">Display Keys</span>. Select the key you just generated and click <span class="uiitem">Export</span> and <span class="uiitem">Display Public Key</span>. Select all the text in the box, click with your right mouse button and select <span class="uiitem">Copy</span>. Go to <a href="https://sks-keyservers.net/i/#submit">SKS Keyservers</a>, right click with your mouse on the text box and select <span class="uiitem">Paste</span>. Click the <span class="uiitem">Submit this key to the keyserver!</span> button.','mailvelope_generate')+
make_step('Send encrypted mail','Click <span class="uiitem>Compose</span>. Type in the recipient, subject, and message as normal. Click on the <span class="uiitem">text pad icon</span> in the message writing window. Click on the <span class="uiitem">lock icon</span>. Select the recipient and click <span class="uiitem">Add</span>. Click <span class="uiitem">Ok</span>. Click <span class="uiitem">Transfer</span>. The message should now appear in encrypted form. Click <span class="uiitem">Send</span>.','mailvelope_send')+
make_step('Receive encrypted mail','Open the message as normal. Click on the <span class="uiitem>envelope with a padlock</span>. Type in your password and click <span class="uiitem">Ok</span>.','mailvelope_decrypt');
str_thank_you = 'Thank you for the feedback!';