import $ from "./library/jquery.js";
import { cookie } from "./library/cookie.js";
import './library/jquery-md5.js';

(function() {
    let arr = location.search.split('=');
    let phone = arr[1].split('&')[0];
    let country = decodeURI(arr[2]);
    let reg = {
        "username": /^[A-z]\w{5,15}$/,
        "password": /^.{6,16}$/,
    };
    $('.ljzc').prop('disabled', true);

    function check() {
        if ($('[data-pass=true]').length == 3) {
            $('.ljzc').prop('disabled', false);
        } else {
            $('.ljzc').prop('disabled', true);
        }
    }
    $('input:not([type="button"])').each(function(index, elm) {
        $(elm).on('input', function() {
            if ($(elm).attr('id') == 'cpsw') return;
            if (reg[$(elm).attr('id')].test($(elm).val())) {
                $('span[class="' + $(elm).attr('id') + '"]').html('通过验证');
                $(this).attr('data-pass', true);
            } else {
                $('span[class="' + $(elm).attr('id') + '"]').html('未通过验证');
                $(this).attr('data-pass', false);
            }
            check();
        });
    });


    $('#cpsw').on('input', function() {
        if ($(this).val() === $('#password').val()) {
            $('.cpsw').html('通过验证');
            $(this).attr('data-pass', true);
        } else {
            $('.cpsw').html('两次输入的密码不同,请确认');
            $(this).attr('data-pass', false);
        }
        check();
    });


    $('.ljzc').on('click', function() {
        let username = $('#username').val();
        let password = $.md5($('#password').val());

        $.ajax({
            type: "post",
            url: "../../interface/setting.php",
            data: {
                username: username,
                password: password,
                phone: phone,
            },
            dataType: "json",
            success: function(res) {
                if (res.status) {
                    alert('注册成功，请登录');
                    cookie.set('username', username);
                    cookie.set('password', password);
                    location.href = "./dengru.html";
                } else {
                    alert('用户名已存在！');
                    location.href = "./setting.html";
                }
            }
        });
    });
})()