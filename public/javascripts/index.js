layui.config({
    base: '/plugins/layui/lay/modules/',　　//需要依赖的navbar.js/tab.js路径
}).use(['element', 'layer', 'common', 'navbar'], function () {
    var element = layui.element,
        $ = layui.jquery,
        layer = layui.layer,
        navbar = layui.navbar();

    $.ajax({
        type:'get',
        url:"/api/sys/menu/list",
        success:function(data){
            //console.log(data);
            var navData = transferTreeData(data.data);
            // $("#admin_userName").text(data.fullname); //用户名称
            //设置navbar
            navbar.set({
                spreadOne: true,
                elem: "#navbar_side",
                cached: false,
                data: navData
            });

            //渲染navbar
            navbar.render();

            //监听点击事件
            navbar.on('click(side)', function (data) {
                var childHtml = data.field.href;//获取当前点击项的路径
                $('#adminIframe').attr("src",childHtml);//将路径赋值给右侧iframe
            });
        }
    });

});

/**
 * 树形数据转换
 * @param arrData
 * @param id
 * @param pid
 * @private
 */
function transferTreeData (arrData = [], id = 'menu_id', pid = 'parent_id') {
    let res = [];
    for (let k = 0; k < arrData.length; k++) {
        if (arrData[k]['sta'] != 0) {
            let obj = {
                'title': arrData[k].name,
                "icon": arrData[k].icon || "fa fa-home", //左侧图标
                "spread": false,　　//是否默认展开
                "href": arrData[k].url,
                'children': [],
                'menu_id': arrData[k][id],
                'parent_id': arrData[k][pid],
            };
            arrData[k] = obj;
        } else {
            arrData.splice(k, 1);
            k--;
        }

    }

    function getChildren ({arr, id, pid}) {
        let res = [];
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j <arrData.length; j++) {
                if (arr[i][id] && arr[i][id] == arrData[j][pid]) {
                    arr[i]['children'].push(arrData[j]);
                }
            }
            getChildren({arr: arr[i]['children'], id: id, pid: pid});
        }
    }

    getChildren({arr: arrData, id: id, pid: pid});

    for (let index = 0; index < arrData.length; index++) {
        if (arrData[index][pid] === '0') {
            res.push(arrData[index]);
        }
    }
    return res;
}





