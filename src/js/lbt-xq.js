// import $ from '../js/library/jquery.js';
(function($) {
    $.fn.extend({
        slider: function(options) {
            let main = null,
                init = null,
                start = null,
                stop = null,
                prev = null,
                next = null,
                timer = null,
                elms = {},
                defaults = {
                    speed: 500,
                    delay: 3000
                };

            $.extend(defaults, options);

            init = function() {
                elms.sliderDiv = this.children('.changtiao');
                elms.btns = this.children('span');
                elms.sliderDiv.append(elms.sliderDiv.children('img').first().clone());
                elms.imgWidth = elms.sliderDiv.children('img').first().width();
                elms.index = 1;

                elms.yuanBg = this.children('p');

                this.hover(function() {
                    stop();
                }, function() {
                    timer = setInterval(start.bind(null, 1), defaults.delay + defaults.speed);
                });
                elms.btns.on('click', function() {
                    if (elms.btns.index(this)) {
                        next();
                    } else {
                        prev();
                    }
                });


                elms.yuanBg.on('click', function() {
                    let ybg = elms.yuanBg.index(this);
                    elms.yuanBg.removeClass('yuan').eq(ybg).addClass('yuan');
                    switch (ybg) {
                        case 0:
                            elms.sliderDiv.css('left', `0px`);
                            elms.index = 1;
                            break;
                        case 1:
                            elms.sliderDiv.css('left', `-560px`);
                            elms.index = 2;
                            break;
                        case 2:
                            elms.sliderDiv.css('left', `-1120px`);
                            elms.index = 3;
                            break;
                        case 3:
                            elms.sliderDiv.css('left', `-1680px`);
                            elms.index = 4;
                            break;
                        case 4:
                            elms.sliderDiv.css('left', `-2240px`);
                            elms.index = 5;
                            break;
                    }
                });

            }.bind(this);

            start = function(direction) {
                let left = `-=${elms.imgWidth}`;
                if (!direction) {
                    left = `+=${elms.imgWidth}`;
                    if (elms.index === 1) {
                        elms.index = 6;
                        let divLeft = this.offset().left,
                            imgLeft = elms.sliderDiv.children('img').last().offset().left;
                        elms.sliderDiv.css('left', `-${imgLeft-divLeft}px`);
                    }
                }

                elms.sliderDiv.animate({
                    left: left
                }, defaults.speed, function() {
                    if (direction) {
                        elms.index++;
                    } else {
                        elms.index--;
                    }
                    if (elms.index === 6) {
                        elms.index = 1;
                        elms.sliderDiv.css('left', 0);
                    }
                    elms.yuanBg.removeClass('yuan').eq(elms.index - 1).addClass('yuan');
                });

            }.bind(this)

            prev = function() {
                stop();
                start(0);
            }

            next = function() {
                stop();
                start(1);
            }

            stop = function() {
                clearInterval(timer);
                elms.sliderDiv.stop(true, true);
            }

            main = function() {
                init();
                timer = setInterval(start.bind(null, 1), defaults.delay + defaults.speed);
            }

            main();
        }
    })
})(jQuery);