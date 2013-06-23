DOMAIN = 'https://whyencryptemail.net' # Change this to where you are running the server

import sys
from ConfigParser import RawConfigParser
import uuid

# TODO: Document from where to get dependencies
import gdata.gauth
import gdata.contacts.client

import oauthlib.oauth
import yahoo.oauth, yahoo.yql, yahoo.application

import bottle
from bottle import route

# TODO: Usage instructions for running the server (grep for argv and you'll figure it out...)

# TODO: Document config format (maybe just an example file?)
config = RawConfigParser()
config.read(sys.argv[1])

SCOPES = ['https://www.google.com/m8/feeds'] # Scope for contacts

# Make sure you restart the server everytime you change this file!
# TODO: Use FAM to detect changes
f = open(sys.argv[2])
keysearch_html = f.read()
f.close()

sessions = {}

#TODO: Investigate if it would be possible to use some common OAuth methods for the different APIs (it should be)
@route('/callback')
def callback():
	if bottle.request.query['type'] == 'google':
		return get_gmail_access_token()
	elif bottle.request.query['type'] == 'yahoo':
		return get_yahoo_access_token()

@route('/yahoo_import')
def yahoo_import():
	session = str(uuid.uuid4())

	callback_url = DOMAIN+'/keysearch?type=yahoo&session=%s'%session
	oauthapp = yahoo.application.OAuthApplication(config.get('yahoo','client_key'), config.get('yahoo','secret_key'), 'JPdg6D56', callback_url)
	
	request_token = oauthapp.get_request_token(callback_url)
	sessions[session] = request_token
	bottle.redirect(oauthapp.get_authorization_url(request_token))

@route('/get_yahoo_access_token')
def get_yahoo_access_token():
	session = bottle.request.query['session']
	request_token = sessions[session]
	del sessions[session]

	callback_url = DOMAIN+'/keysearch?type=yahoo&session=%s'%session
	oauthapp = yahoo.application.OAuthApplication(config.get('yahoo','client_key'), config.get('yahoo','secret_key'), 'JPdg6D56', callback_url)
	access_token = oauthapp.get_access_token(request_token, bottle.request.query['oauth_verifier'])
	oauthapp.token = access_token
	contacts = oauthapp.getContacts()
	addresses = []
	for contact in contacts['contacts']['contact']:
		for field in contact['fields']:
			if '/email/' in field['uri']:
				addresses.append('"%s"'%field['value'])

	# TODO: This is now (almost) duplicated in the google code. That's bad.
	return keysearch_html.replace('DO NOT CHANGE THIS LINE -->', '--> <script type="text/javascript">\nfunction lookupFromServer() { if(document.referrer.indexOf("api.login.yahoo.com") >-1 ) { lookupAddresses([%s]); }}\nlookupFromServer();\n</script>'%(','.join(addresses)))


@route('/gmail_import')
def gmail_import():
	client = gdata.contacts.client.ContactsClient(source='PGP key finder')

	session = str(uuid.uuid4())
	oauth_callback_url = DOMAIN+'/keysearch?type=google&session=%s'%session
	request_token = client.GetOAuthToken(
		SCOPES, oauth_callback_url, config.get('google','client_key'), consumer_secret=config.get('google','secret_key'))

	# Store the token for use in get_gmail_access_token
	sessions[session] = request_token

	bottle.redirect(str(request_token.generate_authorization_url()))

@route('/get_gmail_access_token')
def get_gmail_access_token():
	session = bottle.request.query['session']
	saved_request_token = sessions[session]
	del sessions[session] # Session is no longer needed at this point (unless user refreshes browser)
	# TODO: If there is no longer a session (user refreshes page), just return the normal page and rely on the cached results showing up

	request_token = gdata.gauth.AuthorizeRequestToken(saved_request_token, '?'+bottle.request.query_string)

	client = gdata.contacts.client.ContactsClient(source='PGP key finder')
	access_token = client.GetAccessToken(request_token)
	client.auth_token = access_token

	feed = client.get_contacts()
	addresses = []
	# Loop over "result pages"
	while feed:
		for entry in feed.entry:
			addresses += ['"%s"'%x.address for x in entry.email]
		try:
			feed = client.get_next(feed)
		except AttributeError:
			# TODO: How are you actually supposed to know when it's done?
			break

	# Insert some code that searches for the found keys
	return keysearch_html.replace('DO NOT CHANGE THIS LINE -->', '--> <script type="text/javascript">\nfunction lookupFromServer() { if(document.referrer.indexOf("accounts.google.com") >-1 ) { lookupAddresses([%s]); }}\nlookupFromServer();\n</script>'%(','.join(addresses)))

bottle.run(port=8080)
