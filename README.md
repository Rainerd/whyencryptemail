This is the source code for a website describing why and how to encrypt email. The rational is not that improves the privacy of the sender, but rather that it improves the privacy of the receiver. We are not trying to convince the sender that they need better privacy (they have probably heard arguments related to this before). We are trying to keep things simple. Would your parents encrypt their mails to you out of fear for their own privacy? Probably not. Would they encrypt their mails to you if you asked them to? Probably. The steps presented here should help them fulfill your request. Try to keep it as simple as possible and leave out all theory.

Feedback is given in the form of invalid HTTP requests. You can search for them in the server log to see what people think of the instructions.

One goal for the code is to run as little as possible server-side. Currenly only GMail and Yahoo import require a serve component (TODO: Investigate pure JS-OAuth, https://developers.google.com/accounts/docs/OAuth2UserAgent)

Proper operation requires some URL rewriting to make URLs prettier, so a server is needed for that also.  See dot_htaccess.
