

var GuerrillaMailer = (function($){
	
	var data = {
		email: false,
		expires: false,
		token: false
	};
	
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
	
	function getInfo(){ return data; }
	
	function getEmail(cb){
		if(false!==data.email) cb(data.email);
		makeAPICall("get_email_address", null, function(resp){
			data.email = resp.email_addr;
			data.expires = 3600 - ts() - resp.email_timestamp;
			data.token = resp.sid_token;
			cb(data.email);
		});
	}
	
	function setEmailUser(eu, cb){
		makeAPICall("set_email_user", {email_user: eu}, function(resp){
			data.email = resp.email_addr;
			data.expires = 3600 + resp.email_timestamp;
			data.token = resp.sid_token;
			cb(data.email);
		});
	}
	
	function getRandomString(){
		var rand = "abcdefg";
		try{ 
			rand = Math.random().toString(36).substring(7);
		}catch(e){}
		return rand;
	}
	
	function getNewEmail(cb){
		if(false===data.email) getEmail(function(){
			getNewEmail(cb);
		});
		else setEmailUser(getRandomString(), cb);
	}
	
	return {
		getInfo: getInfo,
		getEmail: getEmail,
		getNewEmail: getNewEmail,
		setEmailUser: setEmailUser
	};
	
})(jQuery);