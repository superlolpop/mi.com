import $ from "./library/jquery.js";
import { cookie } from "./library/cookie.js";

(function() {

    let shop = cookie.get('shop');

    if (shop) {
        shop = JSON.parse(shop);

        let idlist = shop.map(elm => elm.id).join();

        $.ajax({
            type: "get",
            url: "../../interface/shopcar.php",
            data: {
                idlist: idlist
            },
            dataType: "json",
            success: function(res) {
                let temp = '';
                res.forEach((elm, i) => {
                    let img = JSON.parse(elm.picture);
                    let num = res[i].num;
                    let arr = shop.filter(val => val.id == elm.id);
                    temp += `<div class="lielie">
                        <input type="checkbox">
                        <div class="tup">
                            <img src="../${img[0].src}" alt="">
                        </div>
                        <p>${elm.title}</p>
                        <p class="single">${arr[0].price}</p>
                        <p>
                            <a href="javascript:;" class="jian">-</a>
                            <input type="text" value=1 max="${num}" class="number">
                            <a href="javascript:;" class="jia">+</a>
                        </p>
                        <p class="zuizongjia">${arr[0].price}元</p>
                        <p><span class="close">&times;</span></p>
                    </div>`;
                });

                $('.product').append(temp);

                $('.close').one('click', function() {
                    $(this).parents('.lielie').attr('display', 'none');
                });

                $('.jian').on('click', function() {
                    let valu = parseFloat($(this).siblings('.number').val());

                    if (valu <= 1) {
                        valu = 1
                        $(this).siblings('.number').val(valu);
                        $(this).parent().siblings('.zuizongjia').html(Number($(this).parent().siblings('.single').html()) * valu + '元');
                        return;
                    }

                    $(this).siblings('.number').val(valu - 1);
                    $(this).parent().siblings('.zuizongjia').html(Number($(this).parent().siblings('.single').html()) * (valu - 1) + '元');
                });
                $('.jia').on('click', function() {
                    let valu = parseFloat($(this).siblings('.number').val());
                    let max = parseFloat($(this).siblings('.number').attr('max'));

                    if (valu >= max) {
                        valu = max;
                        $(this).siblings('.number').val(valu + 1);
                        $(this).parent().siblings('.zuizongjia').html(Number($(this).parent().siblings('.single').html()) * (valu + 1) + '元');
                        return;
                    }
                    $(this).siblings('.number').val(valu + 1);
                    $(this).parent().siblings('.zuizongjia').html(Number($(this).parent().siblings('.single').html()) * (valu + 1) + '元');
                });

                $('.close').on('click', function() {
                    let index = $('.lielie').index($(this).parents('.lielie'));
                    shop.splice(index - 1, 1);
                    cookie.set("shop", JSON.stringify(shop));
                    $(this).parents().remove('.lielie');
                });

                $('#all').on('click', function() {

                    $('input[type="checkbox"]').each(function(i, elm) {
                        $(elm).prop("checked", $('#all').prop('checked'));
                    });

                });
                $('input[type="checkbox"]').on('click', function() {
                    let quan = 0;
                    let total = $('input[type="checkbox"]').not('#all').length;
                    let totalprice = 0;
                    $('input[type="checkbox"]').not('#all').each(function(i, elm) {
                        if (!$(elm).prop("checked")) {
                            $('#all').prop('checked', false);
                        } else {
                            quan++;
                            totalprice += parseFloat($(elm).siblings('.zuizongjia').html());
                        }

                        $('.zg').html(total);
                        $('.yx').html(quan);
                        $('.zjia').html(totalprice);
                    });

                })
            }
        });
    }
})()