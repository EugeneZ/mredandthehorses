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
    },
    
    initPoster: function(){
        if (MrEd.poster.complete){
            MrEd.heading.tween('opacity', 0);
        } else {
            MrEd.heading.tween('padding-top', MrEd.posterSize - MrEd.headingSize);
            MrEd.poster.setStyle('opacity', 0);
            MrEd.poster.addEvent('load', function(){
                MrEd.poster.tween('opacity', 1);
                MrEd.heading.tween('opacity', 0);
                //new Fx.Tween(MrEd.heading, {'property':'opacity'}).start(1, 0).chain(function(){ MrEd.heading.setStyle('display', 'none'); });
            });
            //MrEd.poster.fireEvent('load'); // for testing
        }
    },
    
    initMusic: function(){
        document.getElement('#player_play').addEvent('click', function(e){
            if (MrEd.music.playing){
                MrEd.musicPause();
            } else {
                MrEd.musicPlay();
            }
            
            MrEd.musicText(this);
            
            e.preventDefault();
        });
        document.getElement('#player_next').addEvent('click', function(e){
            MrEd.musicSkip();
            MrEd.musicText(document.getElement('#player_play'));
            e.preventDefault();
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
        MrEd.music.els.each(function(el, i){
            el.pause();
            if (i !== MrEd.music.current){
                el.currentTime = 0;
            }
        });
        MrEd.music.playing = false;
    },
    
    musicPlay: function(){
        MrEd.music.els.each(function(el, i){
            if (i === MrEd.music.current){
                el.play();
            } else {
                el.currentTime = 0;
            }
        });
        MrEd.music.playing = true;
    },
    
    musicSkip: function(){
        MrEd.music.els[MrEd.music.current].pause();
        MrEd.music.els[MrEd.music.current].currentTime = 0;
        MrEd.music.current++;
        if (MrEd.music.current >= MrEd.music.els.length){
            MrEd.music.current = 0;
        }
        MrEd.musicPlay();
    },
    
    musicText: function(el){
        if (MrEd.music.playing){
            el.set('text', 'Pause');
        } else {
            el.set('text', 'Play');
        }
    }
};

MrEd.start();