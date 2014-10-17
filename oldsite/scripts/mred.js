MrEd = {
	start: function(){
		
		// first things first, let's hide this while it loads.
		$('jsEnabled').setStyle('opacity', 0);
		window.addEvent('load', function(){
			$('jsEnabled').tween('opacity', 1);
			MrEd.rockNroll();
		});
	},
	'rockNroll': function(){
		
		//init overlay
		this.overlay = new Overlay(document.body,{
			'id': 'overlay',
			'color': '#E9D8AD',
			'duration': 500,
			'opacity': 0.3,
			'onClick': function() { this.close(); },
			'onClose': function(){
				this.popup.empty();
				this.popupFx.start({'opacity': 0});
			}.bind(this)
		});
		this.popup = new Element('div',{ 'class': 'lightbox' }).inject(document.body);
		this.popupFx = new Fx.Morph(this.popup,{
			'duration': 500,
			'link': 'cancel'
		});

		//init buttons
		var buttons = $$('#jsEnabled li');
		buttons.each(function(button){
			var hover = new Fx.Tween(button,{
				'property': 'opacity',
				'duration': 'long',
				'link': 'chain',
				'transition': Fx.Transitions.Quint.easeIn
			});
			button.store('hover', hover);

			var fx = new Fx.Tween(button,{
				'property': 'opacity',
				'duration': 'short',
				'link': 'cancel',
				'transition': Fx.Transitions.Quad.easeIn
			});
			button.addEvents({
				'mouseenter': function(){
					fx.start(1);
				},
				'mouseleave': function(){
					fx.start(0.01);
				},
				'click': function(){
					fx.start(0.01);
					MrEd.nav(this);
				}
			});
		});
		buttons[3].retrieve('hover').start(1).wait(1).start(0.01);
		buttons[2].retrieve('hover').start(1).wait(200).start(0.01);
		buttons[1].retrieve('hover').start(1).wait(500).start(0.01);
		buttons[0].retrieve('hover').start(1).wait(800).start(0.01);
	},
	'nav': function(button){
		var page = button.get('id').replace('btn','').toLowerCase() + '.php';
		
		var go = function(x,y,target){
			this.overlay.open();
			MrEd.sizePopup(x,y,function(){
				this.popup.load(target).get('load').chain(function(){
					$$('form').each(function(form){
						form.set('send', {
							'onComplete': function(response){ form.set('html', response); }
						});
						form.addEvent('submit', function(e){
							e.stop();
							this.send();
						});
					});
				});
			}.bind(this));
			_gaq.push(['_trackPageview', page]);
		}.bind(this);

		if (page=='video.php')
			go(800,600,'video.html');
		
		if (page=='music.php')
			go(400,220,'mp3player.html');
		
		if (page=='contact.php')
			go(220,290,'contact.php');
		
		if (page=='shows.php')
			go(420,320,'shows.html');
	},
	'sizePopup': function(x, y, chain){
		this.popupFx.start({
			'opacity': 1,
			'height': y,
			'width': x,
			'margin-left': -(x/2) - 20,
			'margin-top': -(y/2)
		}).chain(chain);
	},
	'mp3player': function() {
		this.popup.adopt(new Swiff('mp3player.swf', {
			id: 'flashplayer',
			width: 400,
			height: 162,
			params: {
				wmode: 'opaque',
				bgcolor: '#ffffff',
				majorversion: '7',
				build: '0'
			},
			vars: {
				file: 'playlist.xml',
				lightcolor: '0x000000',
				backcolor: '0xE9D5B3',
				frontcolor: '0x000000',
				displayheight: '0',
				showeq: 'true'
			}
		}));
	},
	'analytics': function(){
		var _gaq = _gaq || [];
		_gaq.push(['_setAccount', 'UA-2642335-1']);
		_gaq.push(['_trackPageview']);
		(function() {
		  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
		  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
		  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
		})();
	}
};

window.addEvent('domready', function(){
	MrEd.start();
	MrEd.analytics();
});