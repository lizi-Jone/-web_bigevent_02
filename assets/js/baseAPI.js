var url = 'http://api-breakingnews-web.itheima.net';
$.ajaxPrefilter(function(options) {
    // 统一根路径
    options.url = url + options.url;
    // 统一身份认证
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    // 拦截所有响应，判断身份认证信息
    options.complete = function(res) {
        console.log(res.responseJSON);
        var obj = res.responseJSON;
        if (obj.status == 1 && obj.message == '身份认证失败！') {
            localStorage.removeItem('token');
            location.href = '/login.html'
        }
    }

})