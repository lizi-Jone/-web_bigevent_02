$(function() {
    var form = layui.form;
    // 1.昵称自定义规则
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称字符在 1~6 位之间！'
            }
        }
    });
    initUserInfo();
    // 2.初始化用户信息
    function initUserInfo() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message);
                }
                // 表单赋值和取值
                form.val('formUserInfo', res.data);
            }
        })
    }
    // 3.重置功能
    $('#btnReset').on('click', function(e) {
        e.preventDefault();
        initUserInfo();
    });
    // 4.提交
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('修改用户信息成功！');
                window.parent.getUserInfo();
            }
        })
    })
})