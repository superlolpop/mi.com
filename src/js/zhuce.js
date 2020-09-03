import $ from './library/jquery.js';

(function() {
    $('#phone').on('input', function() {
        let phone = parseInt($('#phone').val());
        let reg = /^1[3-9]\d{9}$/;
        if (reg.test(phone)) {
            $('.tishi').css('display', 'block');
            $('.tishi>span').text('√');
            $('.tishi').text('验证通过');
        } else {
            $('.tishi').css('display', 'block');
            $('.tishi').text('验证不通过!');
        }
    });
    $('.ljzc').on('click', function() {
        let phone = parseInt($('#phone').val());
        $.ajax({
            type: "get",
            url: "../../interface/zhuce.php",
            data: {
                phone: phone
            },
            dataType: "json",
            success: function(res) {
                if (isNaN(phone)) {
                    $('.tishi').css('display', 'block');
                } else if (res.has) {
                    alert('号码已存在，请登入');
                    location.href = "./dengru.html";
                } else {
                    location.href = "./setting.html?phone=" + phone;
                }
            }
        });
    })
})();