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
        elem: '#demoTb'
        ,height: 420
        ,url: '/api/article/list' //数据接口
        ,title: '文章表'
        ,page: true //开启分页
        ,toolbar: 'default' //开启工具栏，此处显示默认图标，可以自定义模板，详见文档
        ,totalRow: true //开启合计行
        ,cols: [[ //表头
            {type: 'checkbox', fixed: 'left'}
            ,{field: 'id', title: 'ID', width:80, sort: true, fixed: 'left', totalRowText: '合计：'}
            ,{field: 'title', title: '文章标题', width:80}
            ,{field: 'author', title: '作者', width: 90, sort: true, totalRow: false}
            ,{field: 'content', title: '内容', width:80, sort: true}
            ,{field: 'category', title: '分类', width: 80, sort: true, totalRow: false}
            ,{field: 'createdAt', title: '创建时间', width:150}
        ]]
    });
});


// var vm = new Vue({
//     el: '#indexapp',
//     data: {
//         title: '111'
//     },
//     created () {
//         $.get('/index/title', (data) => {
//             vm.title = data.title;
//         });
//     }
// });

