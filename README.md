# GuerrillaMailer

GuerrillaMailer is a Javascript library built on jQuery. It wraps the GuerrillaMail API. GuerrillaMail is a service that provides disposable email addresses. This could be useful for example, to create a browser-plugin or userscript that detects email fields and offers to pre-populate it with a disposable email.

### Methods

#### getEmail(callback)
Get the current email. If no email has been created, it will create one. This function doesn't return anything, but the email address is passed into the callback function.
```sh
GuerrillaMailer.getEmail(function(currentEmail){
	console.log("Current email is: "+currentEmail);
});
```

#### getNewEmail(callback)
Get the create a new random email. If no email has been created, it will create one. If an email has been created, it will create a new one. This function doesn't return anything, but the email address is passed into the callback function.
```sh
GuerrillaMailer.getNewEmail(function(NewEmail){
	console.log("New email is: "+NewEmail);
});
```

#### setEmailUser(emailUser, callback)
Set the user part of the email address. This function doesn't return anything, but the email address is passed into the callback function.
```sh
GuerrillaMailer.setEmailUser(emailUser, function(newEmail){
	console.log("New email is: "+newEmail);
});
```

#### setEmailDomain(newDomain)
Set the domain part of the email address. It takes one parameter, an int that represents one of the 11 available domains. There are a set of constants to represent each possible paramter for this function. This function doesn't return anything.
 0) GuerrillaMailer.Domains.SHARKLASERS.COM
 1) GuerrillaMailer.Domains.GUERRILLAMAIL.INFO
 2) GuerrillaMailer.Domains.GRR.LA
 3) GuerrillaMailer.Domains.GUERRILLAMAIL.BIZ
 4) GuerrillaMailer.Domains.GUERRILLAMAIL.COM
 5) GuerrillaMailer.Domains.GUERRILLAMAIL.DE
 6) GuerrillaMailer.Domains.GUERRILLAMAIL.NET
 7) GuerrillaMailer.Domains.GUERRILLAMAIL.ORG
 8) GuerrillaMailer.Domains.GUERRILLAMAILBLOCK.BIZ
 9) GuerrillaMailer.Domains.POKEMAIL.NET
 10) GuerrillaMailer.Domains.SPAM4.ME
```sh
var domain = GuerrillaMailer.Domains.SHARKLASERS.COM;
GuerrillaMailer.setEmailDomain(domain);
```

#### getScrambledEmail(callback)
Get the scrambled version of the current email address. This function doesn't return anything, but the scrambled email address is passed into the callback function.
```sh
GuerrillaMailer.getScrambledEmail(function(scrambledEmail){
	console.log("Scrambled email is: "+scrambledEmail);
});
```

#### getScrambledEmail(callback)
Get the scrambled version of the current email address. This function doesn't return anything, but the scrambled email address is passed into the callback function.
```sh
GuerrillaMailer.getScrambledEmail(function(scrambledEmail){
	console.log("Scrambled email is: "+scrambledEmail);
});
```

#### getExpiration(callback)
Get the unix timestamp of the expiration of the current email address. This function doesn't return anything, but the scrambled expiration timestamp is passed into the callback function.
```sh
GuerrillaMailer.getExpiration(function(timestamp){
	console.log("Email expires at: "+timestamp);
});
```

#### forgetEmail(callback)
Forget the current email. This function doesn't return anything, but as it's an asynchronus request, a callback function will be called when the operation is complete.
```sh
GuerrillaMailer.forgetEmail(function(){
	console.log("Email forgotten");
});
```

#### getEmails(callback)
Get an array of objects that represent emails. This function doesn't return anything, but provides the emails to a callback function. Each email has a set of methods which return the private email properties.
```sh
GuerrillaMailer.getEmails(function(emails){
	if(!emails.length) console.log("No emails to show");
	else{
		console.log("Listing "+emails.length+" emails...");
		for(var i=0; i<emails.length; i++){
			console.log(">> #"+i+") From: "+emails[i].getFrom()+" | "+emails[i].getSubject());
		}
	}
});
```

