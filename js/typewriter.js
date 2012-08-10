var tw = {
	text : null,
	obj : null,
	currentLength : 1,
	timer : null,

	_animate : function() {
		if(tw.currentLength == tw.text.length)
			clearInterval(tw.timer);

		tw.obj[0].innerHTML = tw.text.substr(0, tw.currentLength++);	
	},

	typewriter : function(obj, text, duration) {
		tw.obj = obj;
		tw.text = text;
		tw.currentLength = 1;
		tw.timer = setInterval(tw._animate, duration / text.length);
	}
}
