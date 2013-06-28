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
str_osx_gpg_install = make_step('Install GPGTools','<a href="https://gpgtools.org/">Click here</a>. Double click on the package to run the installer. Once done, a setup wizard will ask for your name and e-mail address, as well as a passphrase for the encryption key.','osx_gpgtools_install')
                    + make_step('Import keys','In GPG Keychain Access, go to <span class="uiitem">Key</span> → <span class="uiitem">Search for key...</span> (or press ⌘F). Type in the email address of one of your contacts in the box marked <span class="uiitem">Search</span>. Click <span class="uiitem">Search</span>. If the correct key is found, select <span class="uiitem">Retrieve key</span>.','osx_gpgtools_import')
                    + make_step('Export keys','In GPG Keychain Access, select your own key and then <span class="uiitem">Send Public key to Keyserver</span>. This will allow others to find your public key.','osx_gpgtools_export')
                    + make_step('Create a revoke certificate','In GPG Keychain Access, select your own key and then <span class="uiitem">Generate Revoke Certificate...</span>. The resulting file can be later used to revoke (delete) the key from the keyserver if you so wish.','osx_gpgtools_genrevoke');
str_debian_gpg_install = make_step('Install GPG','Run <span class="console">sudo apt-get install gnupg</span>',null);
str_fedora_gpg_install = make_step('Install GPG','Run <span class="console">sudo yum install gpg</span>','fedora_gpg_install');


str_thunderbird_instructions = make_step('Install Engimail','Click on the menu button and choose <span class="uiitem">Add-ons</span>. Type <span class="uiitem">enigmail</span> in the search field. Click the <span class="uiitem">Install</span> button next to Enigmail. Click the <span class="uiitem">Restart now</span> link.','fedora_enigmail_install')+
make_step('Run Setup Wizard', 'Choose <span class="uiitem">OpenPGP</span> -> <span class="uiitem">Setup Wizard</span> and follow the instructions. Signing emails is usually unnecessary so you may want to chose not to do that by default. You should chose to encrypt mail by default.','fedora_enigmail_setup')+
make_step('Import keys','Choose <span class="uiitem">OpenPGP</span> -> <span class="uiitem">Key Management</span> -> <span class="uiitem">Keyserver</span> -> <span class="uiitem">Search for Keys</span>. Search for the email addresses of your contacts to see if they have published encryption keys. You can also use the <a href="keysearch">addressbook upload</a> page to more quickly see who of your contacts have an encryption key available.','fedora_enigmail_import')+
make_step('Export keys','Choose <span class="uiitem">OpenPGP</span> -> <span class="uiitem">Key Management</span>. Choose <span class="uiitem">Display All Keys by Default</span>. Right click on your key and choose <span class="uiitem">Upload Public Keys to Keyserver</span>. Tell your contacts to import the key you just published to the keyserver','fedora_enigmail_upload');


str_chrome_instructions = make_step('Install Mailvelope','Go to the <a href="https://chrome.google.com/webstore/detail/mailvelope/kajibbejlbohfaggdiogboambcijhkke">Mailvelope</a> page in the Chrome store. Click the <span class="uiitem">Add to Chrome</span> button.','mailvelope_install')+
make_step('Import keys','Go to the <a href="https://sks-keyservers.net/i/#extract">SKS Keyservers</a> and type in the email address of one of your contacts in the box marked <span class="uiitem">Search String</span>. Click the on the link in the <span class="uiitem">keyID</span> column. Select all the text on the page, press the right mouse button and select <span class="uiitem">Copy</span>. Click the Mailvelope button next to the address bar and select <span class="uiitem">Options</span> and then <span class="uiitem">Import Keys</span>. Click the text box with the right mouse button and select <span class="uiitem">Paste</span>. Click <span class="uiitem">Submit</span>. You can also use the <a href="keysearch">addressbook upload</a> page to more quickly see who of your contacts have an encryption key available.','mailvelope_import')+
make_step('Generate and export key','Click the Mailvelope button next the the address bar and select <span class="uiitem">Options</span> and then <span class="uiitem">Generate Key</span>. Type in your name, e-mail address and a password. Click submit. Click <span class="uiitem">Display Keys</span>. Select the key you just generated and click <span class="uiitem">Export</span> and <span class="uiitem">Display Public Key</span>. Select all the text in the box, click with your right mouse button and select <span class="uiitem">Copy</span>. Go to <a href="https://sks-keyservers.net/i/#submit">SKS Keyservers</a>, right click with your mouse on the text box and select <span class="uiitem">Paste</span>. Click the <span class="uiitem">Submit this key to the keyserver!</span> button.','mailvelope_generate');

str_applemail_instructions = make_step('Send encrypted e-mail','In Mail, create a new message as usual. Click on the <span class="uiitem">lock</span> icon to encrypt and the <span class="uiitem">star</span> icon next to it to sign the message. Hit the send button when done.','osx_gpgtools_mail_send');

str_thank_you = 'Thank you for the feedback!';

str_os_question = 'Pick your operating system';
str_os_names = ['Windows','OS X', 'Ubuntu or Debian GNU/Linux','Fedora']

str_client_question = 'Pick your mail application';
str_client_names = [['thunderbird','Thunderbird'],['chrome','Google Chrome / Chromium']];
