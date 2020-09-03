import $$ from './library/public.js';

$$(function() {
    let movebox = $$('.yidong'),
        bigpicture = $$('.bigpicture'),
        small = $$('.smallpic'),
        big = $$('.datup');


    // 1. 事件绑定 small  mouseover事件
    small.on('mouseover', function() {
        // 显示元素
        movebox.addClass('show');
        big.addClass('show');

        // 5. 给movebox设置大小
        movebox.css({
            width: (small.offset().width * big.offset().width / bigpicture.offset().width) - 100 + 'px',
            height: (small.offset().height * big.offset().height / bigpicture.offset().height) - 100 + 'px'
        })

        // 3. 让movebox跟随鼠标移动
        small.on('mousemove', function(ev) {
            let top = ev.pageY - small.offset().top - movebox.offset().height - 100 / 2;
            let left = ev.pageX - small.offset().left - movebox.offset().width - 300 / 2;

            // 4. 计算移动比例
            let ratio = bigpicture.offset().width / small.offset().width; // 比例必须大于1


            // 边界管理
            if (top <= 0) {
                top = 0;
            } else if (top >= small.offset().height - movebox.offset().height) {
                top = small.offset().height - movebox.offset().height - 2;
            }

            if (left <= 0) {
                left = 0;
            } else if (left >= small.offset().width - movebox.offset().width) {
                left = small.offset().width - movebox.offset().width - 2;
            }

            movebox.css({
                top: top + 'px',
                left: left + 'px'
            });

            bigpicture.css({
                top: ratio * -top + 'px',
                left: ratio * -left + 'px'
            });
        });

    });

    // 2. 鼠标离开 隐藏元素
    small.on('mouseout', function() {
        movebox.removeClass('show');
        big.removeClass('show');
    });

});