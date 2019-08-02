
var vm = new Vue({
    el: '#indexapp',
    data: {
        title: '111'
    },
    created () {
        $.get('/index/title', (data) => {
            vm.title = data.title;
        });
    }
});

