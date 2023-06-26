const helloworld = {
    text: 'helloworld',
    time: moment().format('yyyy-MM-DD')
};
console.log(helloworld);
new Vue({
    el: '#app',
    data() {
        return {
            helloworld
        };
    },
    mounted() {
        console.log(this.helloworld);
        console.log('test');
    }
});
