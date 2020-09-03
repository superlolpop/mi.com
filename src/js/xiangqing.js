import $ from './library/jquery.js';
import { cookie } from './library/cookie.js';


(function() {
    let id = location.search.split('=')[1];


    $.ajax({
        type: "get",
        url: "../../interface/getid.php",
        data: {
            id: id
        },
        dataType: "json",
        success: function(res) {

            $('main').append(res.details);


            $('.slider').slider({
                speed: 1000,
                delay: 3000
            });


            $(function() {
                let movebox = $('.yidong'),
                    bigpicture = $('.bigpicture'),
                    small = $('.smallpic'),
                    big = $('.datup');

                small.on('mouseover', function() {

                    movebox.addClass('show');
                    big.addClass('show');

                    movebox.css({
                        width: (small.width() * big.width() / bigpicture.width()) - 100 + 'px',
                        height: (small.height() * big.height() / bigpicture.height()) - 100 + 'px'
                    })

                    small.on('mousemove', function(ev) {
                        let top = ev.pageY - small.offset().top - movebox.height() / 2;
                        let left = ev.pageX - small.offset().left - movebox.width() / 2;

                        let ratio = bigpicture.width() / small.width(); // 比例必须大于1


                        if (top <= 0) {
                            top = 0;
                        } else if (top >= small.height() - movebox.height()) {
                            top = small.height() - movebox.height() - 2;
                        }

                        if (left <= 0) {
                            left = 0;
                        } else if (left >= small.width() - movebox.width()) {
                            left = small.width() - movebox.width() - 2;
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

                small.on('mouseout', function() {
                    movebox.removeClass('show');
                    big.removeClass('show');
                });

            });




            $('.k').on('click', function() {
                $(this).addClass('kliang').siblings().removeClass('kliang');

            });

            $('.kk').on('click', function() {
                $(this).addClass('kkliang').siblings().removeClass('kkliang');
            });



            $('main').find('.jr').on('click', function() {
                let zprice = $('.kuanger>.wzi>p').html().split('：')[1].split('元')[0];
                // console.log(zprice)
                additem(res.id, zprice);
                location.href = "./shopcar.html";
            });

            function additem(id, price) {
                let shop = cookie.get('shop');

                let product = {
                    id: id,
                    price: price,
                }
                if (shop) {
                    shop = JSON.parse(shop);
                    if (!shop.some(elm => elm.id == id)) {
                        shop.push(product);
                    }
                } else {
                    shop = [];
                    shop.push(product);
                }
                cookie.set('shop', JSON.stringify(shop), 1)
            }

            // $('.xzbaohu').on('click', function() {

            //     let arr = [];
            //     let obj = {};
            //     let m = 0;

            //     let zprice = $('.kuanger>.wzi>p').html().split('：')[1].split('元')[0];
            //     if ($('.kkliang').length) {

            //         $('.kkliang').each(function(i, elm) {
            //             let key = $('.kkliang>.nrwz>.psan>span').split('元')[0];
            //             arr.push(key);
            //         });

            //     }
            //     console.log($('.kkliang'));

            // });
        }
    });
})();