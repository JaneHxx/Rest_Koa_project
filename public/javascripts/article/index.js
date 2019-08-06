layui.use(['laydate', 'laypage', 'layer', 'table', 'carousel', 'upload', 'element', 'slider'], function() {
    var laydate = layui.laydate //日期
        ,laypage = layui.laypage //分页
        ,layer = layui.layer //弹层
        ,table = layui.table //表格
        ,carousel = layui.carousel //轮播
        ,upload = layui.upload //上传
        ,element = layui.element //元素操作
        ,slider = layui.slider //滑块

    //执行一个 table 实例
    table.render({
        elem: '#articleTb'
        ,id: 'idArticle'
        ,height: 420
        ,title: '文章表'
        ,url: '/api/article/list' //数据接口
        ,method: 'post'
        ,contentType: 'application/json'
        ,page: true //开启分页,
        ,limit: 10
        ,limits: [10]
        ,parseData: function(res){ //res 即为原始返回的数据
            return {
                "code": res.code, //解析接口状态
                "msg": res.msg, //解析提示文本
                "count": res.count, //解析数据长度
                "data": res.data //解析数据列表
            };
        }
        ,toolbar: '#toolbarArticle' // 开启工具栏，此处显示默认图标，可以自定义模板，详见文档
        ,totalRow: true //开启合计行
        ,cols: [[ //表头
            {type: 'checkbox', fixed: 'left'}
            ,{field: 'id', title: 'ID', width: '5%', sort: true, fixed: 'left', totalRowText: '合计：'}
            ,{field: 'title', title: '文章标题', width: '5%'}
            ,{field: 'author', title: '作者', width: '5%', sort: true, totalRow: false}
            ,{field: 'content', title: '内容', width: '70%', sort: true}
            ,{field: 'category', title: '分类', width: '5%', sort: true, totalRow: false}
            ,{field: 'createdAt', title: '创建时间', width: '5%'}
        ]]
    });

    // 监听新增按钮
    table.on('toolbar(article)', function (obj) {
        switch(obj.event){
            case 'add':
                layer.msg('添加');
                break;
            case 'delete':
                layer.msg('删除');
                break;
            case 'update':
                layer.msg('编辑');
                break;
            case 'detail':
                layer.msg('查看');
                break;
        }
    });
});


// var vm = new Vue({
//     el: '#articleIndex',
//     data: {
//         title: '111'
//     },
//     created () {
//         // $.get('/index/title', (data) => {
//         //     vm.title = data.title;
//         // });
//     }
// });

