import $ from "./library/jquery.js";

(function() {
    $('.button').on('click', function() {
        let username = $('#username').val();
        let password = $('#password').val();
        $.ajax({
            type: "get",
            url: "../../interface/dengru.php",
            data: {
                username: username,
                password: password
            },
            dataType: "json",
            success: function(res) {
                if (res.status) {
                    location.href = "../html/index.html";
                } else {
                    alert('账号或密码错误');
                    location.href = "../html/dengru.html";
                }
            }
        });

    })
})();