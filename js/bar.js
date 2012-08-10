var bd = {
	canvas : null,
	ctx : null,
	fps : 25,
	duration : 1000,
	bars : new Array(),
	timer : null,
	callback : null,

	addBar : function(x, y, width, height, color) {
		bd.bars.push({
			'x' : x,
			'y' : y,
			'height': height,
			'color' : color,
			'width' : width,
			'width_current' : 0
		});
	},

	animate : function(callback) {
		bd.callback = callback;
		setInterval(bd._step, 1000 / bd.fps);
	},

	_step : function() {
		for(var i = 0; i < bd.bars.length; ++i) {
			bar = bd.bars[i];
			fraction = bar['width'] / (bd.duration / (1000 / bd.fps));

			bd.ctx.fillStyle = bar['color'];
			bd.ctx.fillRect(bar['x'] + bar['width_current'], bar['y'], fraction, bar['height']);
			
			bar['width_current'] += fraction;
			if(bar['width_current'] >= bar['width'])
				bd.bars.splice(i, 1);
		}

		if(bd.bars.length == 0) {
			clearInterval(bd.timer);
			if(bd.callback)
				bd.callback();
		}
	}
}
