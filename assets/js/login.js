$(function() {
    // 1.点击按钮，显示隐藏
    $('#link-reg').on('click', function() {
        $('.login-box').hide();
        $('.reg-box').show();
    });
    $('#link-login').on('click', function() {
        $('.login-box').show();
        $('.reg-box').hide();
    });

    // 2.自定义校验规则
    var form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        repwd: function(value) {
            var pwd = $('.reg-box [name=password]').val().trim();
            if (value.trim() !== pwd) {
                return '两次密码输入不一致'
            }
        }
    });

    // 3.注册
    var layer = layui.layer;
    $('#form-reg').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $('#form-reg [name=username]').val(),
                password: $('#form-reg [name=password]').val()
            },
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('注册成功');
                $('#link-login').click();
                $('#form-reg')[0].reset();
            }
        })
    });

    // 4.登录
    $('#form-login').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功');
                localStorage.setItem('token', res.token);
                location.href = '/index.html';
            }
        })
    });

})