

var GuerrillaMailer = (function($){
	
	var D = [
		"sharklasers.com",
		"guerrillamail.info",
		"grr.la",
		"guerrillamail.biz",
		"guerrillamail.com",
		"guerrillamail.de",
		"guerrillamail.net",
		"guerrillamail.org",
		"guerrillamailblock.com",
		"pokemail.net",
		"spam4.me"
	];
	
	var Domains = {
		SHARKLASERS: { COM: 0 },
		GUERRILLAMAIL: {
			INFO: 1,
			BIZ: 3,
			COM: 4,
			DE: 5,
			NET: 6,
			ORG: 7
		},
		GRR: { LA: 2 },
		GUERRILLAMAILBLOCK: { COM: 8 },
		POKEMAIL: { NET: 9 },
		SPAM4: { ME: 10 }
	};
	
	var data = {
		emailUser: false,
		emailDomain: D[Domains.GUERRILLAMAILBLOCK.COM],
		scrambledEmailUser: false,
		expires: false,
		token: false,
		emails: []
	};
	
	var mailIds = [];
	function makeEmail(data){
		for(var i=0; i<mailIds.length; i++)
			if(mailIds[i]==data.mail_id) return false;
		mailIds.push(data.mail_id);
		var mailId = data.mail_id;
		return {
			getFrom: function(){ return data.mail_from; },
			getSubject: function(){ return data.mail_subject; },
			getExcerpt: function(){ return data.mail_excerpt; },
			getTimestamp: function(){ return data.mail_timestamp; },
			isRead: function(){ return data.mail_read==1; },
			getSize: function(){ return data.mail_size; }
		};
	}
	
	function ts(){
		if (!Date.now) Date.now = function(){ return new Date().getTime(); };
		return Math.floor(Date.now() / 1000);
	}
	
	function makeAPICall(func, addtParams, cb){
		var params = {
			f: func,
			ip: "127.0.0.1",
			agent: "Mozilla_foo_bar"
		};
		if("object"===typeof addtParams){
			for(var p in addtParams){
				if(!addtParams.hasOwnProperty(p)) continue;
				params[p] = addtParams[p];
			}
		}
		$.ajax({
			url: "https://api.guerrillamail.com/ajax.php",
			data: params,
			type: "GET",
			dataType: "jsonp",
			crossDomain: true
		}).done(function(resp){
			cb(resp);
		});
	}
	
	var lastEmail = "";
	function construct(resp){
		data.emailUser = resp.email_addr.split("@")[0];
		data.emailUserDomain = resp.email_addr.split("@")[1];
		data.expires = 3600 + resp.email_timestamp;
		data.token = resp.sid_token;
		data.scrambledEmailUser = resp.alias;
		if(lastEmail!==data.emailUser){
			data.emails = [];
			mailIds = [];
			lastEmail = data.emailUser;
		}
	}
	
	function getRandomString(){
		var rand = "abcdefg";
		try{ 
			rand = Math.random().toString(36).substring(7);
		}catch(e){}
		return rand;
	}
	
	function getEmail(cb){
		if(false!==data.emailUser) return cb(data.emailUser+"@"+data.emailDomain);
		makeAPICall("get_email_address", null, function(resp){
			construct(resp);
			cb(data.emailUser+"@"+data.emailDomain);
		});
	}
	
	function getEmails(cb){
		if(false===data.emailUser) return getEmail(function(email){
			getEmails(cb);
		});
		makeAPICall("check_email", {seq: 1}, function(resp){
			for(var i=0; i<resp.list.count; i++){
				var em = makeEmail(resp.list[i]);
				if(em !== false) data.emails.push(em);
			}
			cb(data.emails);
		});
	}
	
	function getExpiration(cb){
		if(false!==data.emailUser) return cb(data.expires);
		makeAPICall("get_email_address", null, function(resp){
			construct(resp);
			cb(data.expires);
		});
	}
	
	function getScrambledEmail(cb){
		if(false!==data.emailUser) return cb(data.scrambledEmailUser+"@"+data.emailDomain);
		makeAPICall("get_email_address", null, function(resp){
			construct(resp);
			cb(data.scrambledEmailUser+"@"+data.emailDomain);
		});
	}
	
	function getNewEmail(cb){
		if(false===data.emailUser) getEmail(function(){
			getNewEmail(cb);
		});
		else setEmailUser(getRandomString(), cb);
	}
	
	function setEmailUser(eu, cb){
		makeAPICall("set_email_user", {email_user: eu}, function(resp){
			construct(resp);
			cb(data.emailUser+"@"+data.emailDomain);
		});
	}
	
	function setEmailDomain(domain){
		if(undefined===D[domain]) return;
		data.emailDomain = D[domain];
	}
	
	return {
		Domains: Domains,
		setEmailDomain: setEmailDomain,
		getScrambledEmail: getScrambledEmail,
		getExpiration: getExpiration,
		getEmail: getEmail,
		getNewEmail: getNewEmail,
		setEmailUser: setEmailUser,
		getEmails: getEmails
	};
	
})(jQuery);