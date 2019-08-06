
var vm = new Vue({
    el: '#indexapp',
    data: {
        title: 'title'
    },
    created () {
        $.get('/index/title', (data) => {
            vm.title = data.title;
        });
    }
});

