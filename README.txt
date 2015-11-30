To build this project, you’ll need run:
	npm install;
	bower install;
	grunt build; #optional. Just to production environment

This application is started by:
	node --harmony ./server.js

Test using grunt+jasmin. You can run using:
	grunt test; #Tests result are showing in console. It was made thinking to use in deploy’s script

Issues:
	Backend doesn’t save data in mongodb, just in memory. Simple to change, but I prioritized what was required;
	Message list haven’t pagination. My idea was use infinite scroll, but I just found a plugin that uses jQuery and I decided don’t use it.

COMMENTS:
	I decided to build a simple message board based on the instruction received and don’t use ticket system, because it’s just a test project, but in a real project, more information should be required to understand customer expectations.