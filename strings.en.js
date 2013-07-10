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

str_thunderbird_commonsetup = make_step('Install Engimail','Click on the <span class="uiitem">menu button</span> and choose <span class="uiitem">Add-ons</span>. Type <span class="uiitem">enigmail</span> in the search field. Click the <span class="uiitem">Install</span> button next to Enigmail. Click the <span class="uiitem">Restart now</span> link.','fedora_enigmail_install')+
make_step('Run Setup Wizard', 'Click on the <span class="uiitem">menu button</span> and choose <span class="uiitem">OpenPGP</span> -> <span class="uiitem">Setup Wizard</span> and follow the instructions. Signing emails is usually unnecessary so you may want to chose not to do that by default. You should chose to encrypt mail by default.','fedora_enigmail_setup')+
make_step('Ignore missing keys','Click on the <span class="uiitem">menu button</span> and choose <span class="uiitem">OpenPGP</span> -> <span class="uiitem">Preferences</span>. Click <span class="uiitem">Display expert settings</span>. Choose the <span class="uiitem">Key Selection</span> tab and choose <span class="uiitem">No manual selection</span>. Go back to the <span class="uiitem">Basic</span> tab and click <span class="uiitem">Hide expert settings</span>. Click <span class="uiitem">OK</span>','fedora_enigmail_configure')+
make_step('Import keys','Click on the <span class="uiitem">menu button</span> and choose <span class="uiitem">OpenPGP</span> -> <span class="uiitem">Key Management</span> -> <span class="uiitem">Keyserver</span> -> <span class="uiitem">Search for Keys</span>. Search for the email addresses of your contacts to see if they have published encryption keys. You can also use the <a href="keysearch">addressbook upload</a> page to more quickly see who of your contacts have an encryption key available.','fedora_enigmail_import');
str_thunderbird_usage = make_step('Decrypting email','Open the message as normal. Type in your password and click <span class="uiitem">OK</span>','fedora_enigmail_decrypt');
str_thunderbird_firstkey = make_step('Export keys','Click on the <span class="uiitem">menu button</span> and choose <span class="uiitem">OpenPGP</span> -> <span class="uiitem">Key Management</span>. Choose <span class="uiitem">Display All Keys by Default</span>. Right click on your key and choose <span class="uiitem">Upload Public Keys to Keyserver</span>. Tell your contacts to import the key you just published to the keyserver','fedora_enigmail_upload');
str_thunderbird_haskey = make_step('Send public key','Click on the <span class="uiitem">menu button</span> and choose <span class="uiitem">OpenPGP</span> -> <span class="uiitem">Key Management</span>. Right-click on your key and select <span class="uiitem">Send Public Keys by Email</span>. Press the <span class="uiitem">OpenPGP</span> button and uncheck <span class="uiitem">Encrypt message</span>. Type in your own email address as the recipient click <span class="uiitem">Send</span>','fedora_send_publickey_fedora')+
make_step('Send private key','In the email application <span class="important">on your main computer</span> (which has your private key), import the public key you just sent/received. Continue reading if that application is also Thunderbird, otherwise look at the intructions that apply to your specific application. Open the mail (make sure you are doing this on the main computer!) and right click on the attached public key. Select <span class="uiitem">Import OpenPGP key</span>. Click on the <span class="uiitem">menu button</span> and choose <span class="uiitem">OpenPGP</span> -> <span class="uiitem">Key Management</span>. Select your private key (the bold one), and then select <span class="uiitem">File</span>-><span>Export Keys to File</span>. Choose <span class="uiitem">Export Secret Keys</span>. Select a location to save your keys (e.g. your Desktop). Click <span class="uiitem">Save</span> and then <span class="uiitem">OK</span>. Right-click on your private key (the bold one) and select <span class="uiitem">Disable key</span>. Close the Key Management window. Write a new email addressed to yourself, and attach the private key you just saved. If prompted about how to encrypt attachments, just click <span class="uiitem">OK</span>. Click on the <span class="uiitem">menu button</span> and choose <span class="uiitem">OpenPGP</span> -> <span class="uiitem">Key Management</span>. Right-click on your private key (greyed out, bold) and select <span class="uiitem">Enable Key</span>. Right click on the public key you imported earlier and select <span class="uiitem">Delete</span>','enigmail_send_privatekey_fedora')+
make_step('Import private key','On your other computer (the one you are trying to set up), open the mail with the attached private key. Write down the text in the <span class="uiitem">Key ID</span> column next to your private key (in bold). Right-click on the attachment and select <span class="uiitem">Decrypt and Save As</span>. Select a location to save the private key (e.g. your Desktop) and click <span class="uiitem">Save</span>. Click on the <span class="uiitem">menu button</span> and choose <span class="uiitem">OpenPGP</span> -> <span class="uiitem">Key Management</span>. Select <span class="uiitem">File</span>-><span class="uiitem">Import Keys From File</span>. Select the file you just saved and select <span class="uiitem">Open</span> and then <span class="uiitem">OK</span>. Right-click on your old private key and select <span class="uiitem">Delete Key</span>. Make sure it is the old key by checking that the <span class="uiitem">Key ID</span> is the same as the one you wrote down earlier!','enigmail_import_email_private');


str_chrome_instructions = make_step('Install Mailvelope','Go to the <a href="https://chrome.google.com/webstore/detail/mailvelope/kajibbejlbohfaggdiogboambcijhkke">Mailvelope</a> page in the Chrome store. Click the <span class="uiitem">Add to Chrome</span> button.','mailvelope_install')+
make_step('Import keys','Go to the <a href="https://sks-keyservers.net/i/#extract">SKS Keyservers</a> and type in the email address of one of your contacts in the box marked <span class="uiitem">Search String</span>. Click the on the link in the <span class="uiitem">keyID</span> column. Select all the text on the page, press the right mouse button and select <span class="uiitem">Copy</span>. Click the Mailvelope button next to the address bar and select <span class="uiitem">Options</span> and then <span class="uiitem">Import Keys</span>. Click the text box with the right mouse button and select <span class="uiitem">Paste</span>. Click <span class="uiitem">Submit</span>. You can also use the <a href="keysearch">addressbook upload</a> page to more quickly see who of your contacts have an encryption key available.','mailvelope_import')+
make_step('Generate and export key','Click the Mailvelope button next the the address bar and select <span class="uiitem">Options</span> and then <span class="uiitem">Generate Key</span>. Type in your name, e-mail address and a password. Click submit. Click <span class="uiitem">Display Keys</span>. Select the key you just generated and click <span class="uiitem">Export</span> and <span class="uiitem">Display Public Key</span>. Select all the text in the box, click with your right mouse button and select <span class="uiitem">Copy</span>. Go to <a href="https://sks-keyservers.net/i/#submit">SKS Keyservers</a>, right click with your mouse on the text box and select <span class="uiitem">Paste</span>. Click the <span class="uiitem">Submit this key to the keyserver!</span> button.','mailvelope_generate')+
make_step('Send encrypted mail','Click <span class="uiitem">Compose</span>. Type in the recipient, subject, and message as normal. Click on the <span class="uiitem">text pad icon</span> in the message writing window. Click on the <span class="uiitem">lock icon</span>. Select the recipient and click <span class="uiitem">Add</span>. Click <span class="uiitem">Ok</span>. Click <span class="uiitem">Transfer</span>. The message should now appear in encrypted form. Click <span class="uiitem">Send</span>.','mailvelope_send')+
make_step('Receive encrypted mail','Open the message as normal. Click on the <span class="uiitem">envelope with a padlock</span> icon. Type in your password and click <span class="uiitem">Ok</span>.','mailvelope_decrypt');

str_applemail_instructions = make_step('Send encrypted e-mail','In Mail, create a new message as usual. Click on the <span class="uiitem">lock</span> icon to encrypt and the <span class="uiitem">star</span> icon next to it to sign the message. Hit the send button when done.','osx_gpgtools_mail_send');

str_kgpg_instructions = make_step('Install KGpg', 'Click on the <span class="uiitem">Application Launcher button</span> in the lower left corner. Click on the <span class="uiitem">Software management</span> icon. In the <span class="uiitem">Seach packages</span> box, type in <span class="uiitem">kgpg</span> and click the <span class="uiitem">Search by name</span> button. Select <span class="uiitem">kgpg</span> from the list and click the <span class="uiitem">Install</span> button and then <span class="uiitem">Apply</span>. Type in the root password when prompted.','kgpg_install_fedora') +
make_step('Configure KGpg','Click on the <span class="uiitem">Application launcher button</span> in the lower left corner. Type <span class="uiitem">kgpg</span> in the <span class="uiitem">Search</span> box and select <span class="uiitem">Run kgpg</span>. The first time you run KGpg an assistant will be run. Accept the default values. Type in your name and email address. Select 2048 for <span class="uiitem">Key Size</span> and RSA & RSA for <span class="uiitem">Algorithm</span>. Click <span class="uiitem>OK</span>. Enter a password when prompted and click <span class="uiitem">OK</span>. Select the <span class="uiitem">Settings</span> menu and there <span class="uiitem">Configure KGpg</span>. Check <span class="uiitem">Allow encryption with untrusted keys</span> and click <span class="uiitem">OK</span>. Wait until key generation is complete (it may take a few minutes).','kgpg_configure_fedora') +
make_step('Import keys','Click on the KGpg tray icon next to the system clock in the lower right corner (you may have to click on the upwards facing arrow first). Select <span class="uiitem">File</span> and then <span class="uiitem">Key Server Dialog</span>. Type in an email address to search for and click the <span class="uiitem">Search</span> button. If a key is found, select the correct one and press the <span class="uiitem">Import</span> button.','kgpg_import_fedora') +
make_step('Export public key','Click on the KGpg tray icon next to the system clock in the lower right corner (you may have to click on the upwards facing arrow first). Click the <span class="uiitem">Export Public Key</span> button. Select <span class="uiitem">Key server</span> and click <span class="uiitem">OK</span>','kgpg_export_fedora') +
make_step('Send encrypted mail','Write your mail as normally. Right click on the text and choose <span class="uiitem">Select All</span>. Right click again and choose <span class="uiitem">Cut</span>. Right click on the KGpg tray icon next to the system clock in the lower right corner (you may have to click on the upwards facing arrow first) and select <span class="uiitem">Encrypt clipboard</span>. In your mail application, right click on the writing area and select <span class="uiitem">Paste</span>.','kgpg_send_fedora')+
make_step('Receive encrypted mail','Open the mail as you would normally when you want to reply. Right click on the text and select <span class="uiitem">Select All</span>. Right click again and choose <span class="uiitem">Cut</span>. Right click on the KGpg tray icon next to the system clock in the lower right corner (you may have to click on the upwards facing arrow first) and select <span class="uiitem">Decrypt clipboard</span>. In your mail application, right click on the writing area and select <span class="uiitem">Paste</span>.','kgpg_decrypt_fedora');
str_k9mail_instructions = make_step('Install APG','Go to the Play store. Type in <span class="uiitem">apg</span> in the search box and click the <span class="uiitem">search button</span>. Select <span class="uiitem">APG by Thialfihar</span>. Click <span class="uiitem">Install</span>.','apg_install_android') +
make_step('Import keys','Start APG. Press the <span class="uiitem">menu button</span> and select <span class="uiitem">Key Server</span>. Type in an email address to search for and press <span class="uiitem">Search</span>. If a key is found, press it to import it.','apg_import_android') +
make_step('Generate private key','Start APG. Press the <span class="uiitem">menu button</span> and select <span class="uiitem">Manage Secret Keys</span>. Press the <span class="uiitem">menu button</span> and select <span class="uiitem">Create Key</span>. Click the <span class="uiitem">Set passphrase</span> button, type in a password twice and press <span class="uiitem">OK</span>. Press the <span class="uiitem">plus sign next to User IDs</span>. Type in your name and email address. Press the <span class="uiitem">plus sign next to Keys</span>. Press <span class="uiitem">OK</span>. Press the <span class="uiitem">Usage box</span> and select <span class="uiitem">Sign and Encrypt</span>. Finally, press <span class="uiitem">Save</span>.','apg_generate_android') +
make_step('Save private key','Open APG. Press the <span clas="uiitem">menu button</span> and select <span class="uiitem">Manage Public Keys</span>. Long-press on your key and select <span class="uiitem">Export Key</span>. Write down the path displayed in the box and press <span class="uiitem">OK</span>.','apg_export_save_android')+
make_step('Install Explorer','A helper application is needed to upload your public key. Go to the Play store and search for <span class="uiitem">Explorer</span>. Select <span class="uiitem">Explorer by Speed Software</span>. Press <span class="uiitem">Install</span>. Press <span class="uiitem">Accept</span> when prompted for app permissions.','apg_export_explorer_android')+
make_step('Copy key to clipboard','Open the Explorer app and navigate to the path you wrote down earlier (probably /mnt/sdcard/APG). Long-press on <span class="uiitem">pubexport.asc</span> and select <span class="uiitem">Open in Text Editor</span>. Press and drag with your finger. Push the <span class="uiitem">Select all-icon</span> (four boxes in the top menu). Push the <span class="uiitem">Copy-icon</span> (picture of two pages).','apg_export_copykey_android') +
make_step('Upload key','Open the web browser and go to <a href="https://sks-keyservers.net/i">https://sks-keyservers.net/i</a>. Scroll down and long press on the large text box at the bottom of the page. Select <span class="uiitem">PASTE</span>. Press <span class="uiitem">Submit this key to the keyserver!</span>','apg_export_upload')+
make_step('Send encrypted mail','Write an email in K9 Mail as normally. Check the <span class="uiitem">Encrypt</span> box.','apg_send_android')+
make_step('Receive encrypted mail','Open the mail in K9 as normally. Press the <span class="uiitem">Decrypt</span> button. Enter your password and press <span class="uiitem">OK</span>','apg_decrypt_android');


str_os_question = 'Pick your operating system:';
str_os_names = ['Windows','OS X', 'Ubuntu or Debian GNU/Linux','Fedora','Android']

str_client_question = 'Pick your mail application:';
str_client_names = [['thunderbird','Thunderbird'],['gmail','GMail'],['outlookcom','Outlook.com'],['yahoo','Yahoo Mail'],['gmx','GMX'],['applemail','Mail'],['generic','Other'],['k9mail','K-9 Mail']];

str_browser_question = 'Pick your web browser';

str_browser_names = [['chrome','Google Chrome / Chromium']];

str_haskey_question = 'Do you already have a PGP key?';
str_noyes = ['No','Yes'];
