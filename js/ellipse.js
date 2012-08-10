var cd = {
	// persistent
	canvas : null,
	ctx : null,
	fps : 25,

	// temporary for animation
	duration : 0,
	timer : null,
	currentAngle : 0,
	mx : 0,
	my : 0,
	radius: 0,
	duration : 0,
	scaleX : 0,
	scaleY : 0,
	callback : 0,

	drawArc : function(startAngle, endAngle) {
		cd.ctx.save();
		cd.ctx.beginPath();
		cd.ctx.scale(cd.scaleX, cd.scaleY);
		cd.ctx.arc(cd.mx,cd.my,cd.radius,startAngle,endAngle, false);
		cd.ctx.stroke();
		cd.ctx.restore();
	},

	animate : function() {
		var startAngle = cd.currentAngle;
		var endAngle = (cd.currentAngle += 2*Math.PI / (cd.duration / (1000 / cd.fps)));

		cd.drawArc(startAngle, endAngle);

		if(cd.currentAngle > 2*Math.PI) {
			clearInterval(cd.timer);
			if(cd.callback)
				cd.callback();
		}
	},

	_setParameters : function(mx, my, rx, ry, strokeStyle, lineWidth) {
		cd.currentAngle = 0;
		cd.mx = mx;
		cd.my = my;
		cd.scaleX = 1;
		cd.scaleY = 1;
		if(rx > ry) {
			cd.radius = ry;
			cd.scaleX = rx / ry;
			cd.mx = cd.mx / cd.scaleX;
		} else if(ry > rx) {
			cd.radius = ry;
			cd.scaleY = ry / rx;
			cd.my = cd.my / cd.scaleY;
		} else {
			cd.radius = ry;
		}
		cd.ctx.strokeStyle = strokeStyle;
		cd.ctx.lineWidth = lineWidth;
	},

	drawAnimatedEllipse : function(mx, my, rx, ry, strokeStyle, lineWidth, duration, callback) {
		cd._setParameters(mx, my, rx, ry, strokeStyle, lineWidth);
		cd.duration = duration;
		cd.callback = callback;
		cd.timer = setInterval(cd.animate, 1000 / cd.fps);
	},

	drawEllipse : function(mx, my, rx, ry, strokeStyle, lineWidth) {
		cd._setParameters(mx, my, rx, ry, strokeStyle, lineWidth);
		cd.drawArc(0, 360);
	}
};
