( function() {
	'use strict';
	var context = null;
	var gearCount = 0;
	var gears = ['N', '1', '2', '3', '4', '5', '6'];
	var angleIncr = [0, 3.300, 1.944, 1.308, 1.029, 0.837]
	var speed = 0;
	init();

	function init() {
		console.log('I m runnig');
		$('.content').append()
		// $(needle).css({
		// 	'transform' : 'rotate(47deg)'
		// })
	}

	function promptDirection(question) {
		var result = prompt(question, '');
		if( result.toLowerCase() == 'left') {
			return 'L';
		}
		if( result.toLowerCase() == 'right') {
			return 'R';
		}
		throw new Error('Invalid direction: ', + result);
	}

	function look() {
		if( promptDirection("which way?") == 'L' )
		{
			return 'a house';
		}
		else {
			return 'two angry bears';
		}
	}

	function withContext(newContext, body) {
		var oldContext = context;
		context = newContext;
		try {
			return body();
		}
		finally {
			context = oldContext;
		}
		
	}

	// try {
	// 	withContext(5, function() {
	// 		if( context < 10) {
	// 			throw new Error("Not enough context!");
	// 		}
	// 	});
	// }
	// catch(e) {
	// 	console.log("Ignoring: ", e);
	// }
	// console.log(context)

	function InputError(message) {
		this.message = message;
		this.stack = ( new Error()).stack;
	}

	InputError.prototype = Object.create(Error.prototype);
	InputError.prototype.name = 'InputError';

	// try {
	// 	console.log('you see', look());
	// }
	// catch(error) {
	// 	console.log('Something went wrong:' + error)
	// }

	$(document).keyup(function(e){
		if( e.which == 38) {
			$('.pedals--throttle').removeClass('active');
		}
		else if( e.which == 40) {
			$('.pedals--brake').removeClass('active');
		}
		else {}
	});

	$(document).keydown(function(e){

    	if(e.which == 40) {
    		$('.pedals--brake').addClass('active');
    		$(cat).stop().animate({
    			top: '+=10'
    		});
    		var tr = $(needle).css("-webkit-transform") ||
         $(needle).css("-moz-transform") ||
         $(needle).css("-ms-transform") ||
         $(needle).css("-o-transform") ||
         $(needle).css("transform") ||
         "Either no transform set, or browser doesn't do getComputedStyle";
    		var values = tr.split('(')[1].split(')')[0].split(',');
			var a = values[0];
			var b = values[1];
			var c = values[2];
			var d = values[3];

			var scale = Math.sqrt(a*a + b*b);

			console.log('Scale: ' + scale);

			// arc sin, convert from radians to degrees, round
			var sin = b/scale;
			// next line works for 30deg but not 130deg (returns 50);
			// var angle = Math.round(Math.asin(sin) * (180/Math.PI));
			var angle = (Math.atan2(b, a) * (180/Math.PI));

			console.log('Rotate: ' + angle + 'deg');
    		if( newAngle < 0) {
    			// newAngle = 176;
    			newAngle = 360 + newAngle;
    		}

    		var newAngle = angle-1;
    		console.log(' new angle: ', newAngle);

    		if( newAngle < 0) {
    			return;
    		}
    		updateSpeed(newAngle);
    		updateRpm(newAngle);
    		$(needle).css({
    			'transform' : 'rotate('+newAngle+'deg)'
    		});
    	}
    	else if( e.which == 37) {
			$(cat).stop().animate({
    			left : '-=10'
    		});
    	}
    	else if( e.which == 38) {
    		$('.pedals--throttle').addClass('active');
    		$(cat).stop().animate({
    			top: '-=10'
    		});
		 var tr = $(needle).css("-webkit-transform") ||
         $(needle).css("-moz-transform") ||
         $(needle).css("-ms-transform") ||
         $(needle).css("-o-transform") ||
         $(needle).css("transform") ||
         "Either no transform set, or browser doesn't do getComputedStyle";
    		var values = tr.split('(')[1].split(')')[0].split(',');
			var a = values[0];
			var b = values[1];
			var c = values[2];
			var d = values[3];

			var scale = Math.sqrt(a*a + b*b);

			// arc sin, convert from radians to degrees, round
			var sin = b/scale;
			// next line works for 30deg but not 130deg (returns 50);
			// var angle = Math.round(Math.asin(sin) * (180/Math.PI));
			var angle = (Math.atan2(b, a) * (180/Math.PI));

    		var newAngle = angle+angleIncr[gearCount];


    		if( newAngle < 0) {
    			// newAngle = 176;
    			newAngle = 360 + newAngle;
    			$(needle).css({
    				// 'background-color': '#f00',
    				'animation' : 'bgrChange 0.2s linear'
    			});
    		}
    		else {
    			$(needle).css({
    				// 'background-color': '#fff',
    				'animation' : 'bgrChange 0.2s linear'
    			});    			
    		}

    		if( newAngle > 186) {
    			newAngle = 183;
    		}
    		updateSpeed(newAngle*angleIncr[gearCount]*3.3);
    		updateRpm(newAngle*angleIncr[gearCount]/3.3);    		
    		$(needle).css({
    			'transform' : 'rotate('+newAngle+'deg)'
    		});
    	}
    	else if( e.which == 39) {
    		$(cat).stop().animate({
    			left: '+=10'
    		})
    	}
    	else if( e.which == 65) {
    		if( gearCount < gears.length ) {
    			gearCount++;
    		}
    		$('.gear p').text(gears[gearCount]);
    	}
    	else if( e.which == 83) {
    		if( gearCount > 0) {
    			gearCount--;	
    		}
    		$('.gear p').text(gears[gearCount]);
    	}
    	else {}
    });

	function updateSpeed(angle) {
		try {
			var speed = (angle/163.1*203/angleIncr[gearCount]*angleIncr[gearCount]*0.3);
			if( isNaN(speed) ) {
				// console.log('setting speed to 0')
				speed = 0;
			}
			$('.speed span:nth-child(1)').text(Math.round(speed));
		}
		catch(e) {
			console.log('error:', e)
		}	
	}

	function updateRpm(angle) {
		try {
			var value = (angle/163.1*6000);
			$('.rpm span:nth-child(1)').text(Math.round(value));
			// console.log('Angle: ', angle)
		}
		catch(e) {
			console.log('error:', e)
		}
	}

      

})();