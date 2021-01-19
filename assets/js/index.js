$(function() {
    // 获取用户基本信息
    getUserInfo();
    // 退出
    $('#btnLogout').on('click', function() {
        layer.confirm('是否确认退出登录?', { icon: 3, title: '提示' }, function(index) {
            localStorage.removeItem('tooken');
            location.href = '/login.html';
            layer.close(index);
        })
    })
})

function getUserInfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg(res.message);
            }
            // 渲染头像和用户名
            renderAvatar(res.data);
        }
    })
}

// 渲染头像和用户名
function renderAvatar(user) {
    var name = user.nickname || user.username;
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    if (user.user_pic !== null) {
        // 图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        // 文本头像
        $('.layui-nav-img').hide();
        var frist = name[0].toUpperCase();
        $('.text-avatar').html(frist).show();
    }
}