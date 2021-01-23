$(function() {
    // 1.渲染文章类别
    initCate();
    var form = layui.form;

    function initCate() {
        $.ajax({
            method: 'get',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                var str = template('tpl-cate', res)
                $('[name="cate_id"]').html(str);
                form.render();
            }
        })
    };

    // 2.初始化文章内容
    initEditor();

    // 3.图片裁剪
    // 3.1 初始化图片裁剪器
    var $image = $('#image')

    // 3.2 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3.3 初始化裁剪区域
    $image.cropper(options);

    // 4.选择封面 
    $('#btnChooseImage').on('click', function() {
        $('#file').click();
    });
    // 4.1更换裁剪的图片
    $('#file').on('change', function(e) {
        console.log(e.target.files);
        var file = e.target.files[0];
        var newImgURL = URL.createObjectURL(file);
        if (file === undefined) {
            return;
        }
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    });

    // 5.发布文章
    // 5.1 参数设置
    var art_state = '已发布';
    $('#btnSave2').on('click', function() {
        art_state = '存为草稿';
    });
    // 5.2 文章封面
    $('#form-pub').on('submit', function(e) {
        e.preventDefault();
        var fd = new FormData(this);
        // console.log(fd);
        fd.append('state', art_state);
        // 添加图片文件
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function(blob) { // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append('cover_img', blob);
                publishArticle(fd);
            })
    });
    // 5.3 封装发布新文章函数
    function publishArticle(fd) {
        $.ajax({
            method: 'post',
            url: '/my/article/add',
            data: fd,
            contentType: false,
            processData: false,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('发布文章成功！');
                setTimeout(function() {
                    window.parent.document.querySelector('#art_list').click();
                }, 1500)
            }
        })
    }
})