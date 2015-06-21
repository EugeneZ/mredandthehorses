var MrEd = {
    poster: document.getElement('#photo'),
    posterSize: window.getSize().y / 2,
    heading: document.getElement('h1'),
    headingSize: document.getElement('h1').getElement('span').getSize().y / 2,
    
    music: {
        els: document.getElements('audio'),
        playing: false,
        current: 0
    },
    
    start: function(){
        Fx.implement({options: {duration: 3000}});
        MrEd.initPoster();
        MrEd.initMusic();
        MrEd.initForm();

        setInterval(MrEd.musicTick, 100);
    },
    
    initPoster: function(){
        MrEd.heading.get('tween').addEvent('complete', function(){ MrEd.heading.destroy(); });
        if (MrEd.poster.complete){
            MrEd.heading.tween('opacity', 0);
        } else {
            MrEd.heading.tween('padding-top', MrEd.posterSize - MrEd.headingSize);
            MrEd.poster.setStyle('opacity', 0);
            MrEd.poster.addEvent('load', function(){
                MrEd.poster.tween('opacity', 1);
                MrEd.heading.tween('opacity', 0);
            });
        }
    },
    
    initMusic: function(){
        document.getElements('#player .song button').each(function(buttonEl, i){
            buttonEl.addEvent('click', function(e){
                if (this.hasClass('play')) {
                    MrEd.musicPlay(i);
                } else {
                    MrEd.musicPause(i);
                }
                e.preventDefault();
            });
        });
    },
    
    initForm: function(){
        document.getElements('form', function(form){
            form.addEvent('submit', function(e){
                new Request.HTML({
                    update: form,
                    url: form.action
                }).post(form);
                e.preventDefault();
            });
        });
    },
    
    musicPause: function(){
        document.getElements('#player .song button').addClass('play').removeClass('pause');
        MrEd.music.els.each(function(el, i){
            el.pause();
            if (i !== MrEd.music.current){
                el.currentTime = 0;
            }
        });
        MrEd.music.playing = false;
    },
    
    musicPlay: function(song){
        document.getElements('#player .song button').addClass('play').removeClass('pause').setStyle('left', 0);
        document.getElements('#player .song button')[song].addClass('pause').removeClass('play');
        MrEd.music.current = song;
        MrEd.music.els.each(function(el, i){
            if (i === MrEd.music.current){
                el.play();
            } else {
                el.pause();
                el.currentTime = 0;
            }
        });
        MrEd.music.playing = true;
    },

    musicTick: function(){
        if (MrEd.music.playing) {
            var audioEl = MrEd.music.els[MrEd.music.current],
                percent = (audioEl.currentTime / audioEl.duration) * 100;
            document.getElements('#player .song button')[MrEd.music.current].setStyle('left', percent + '%');
        }
    }
};

MrEd.start();