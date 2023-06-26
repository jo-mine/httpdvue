const helloworld = {
    text: 'helloworld',
    time: moment().format('yyyy-MM-DD')
};
console.log(helloworld);
const vueApp = Vue.extend({
    data() {
        return {
            message: '東京の天気',
            forecastList: [],
            dialog: { title: "", message: "", isActive: false }
        };
    },
    methods: {
        alertForecast(forecast) {
            console.log(`${forecast.time}の東京の気温は${forecast.temperature}℃です！`);
            this.dialog.title = 'お天気メッセージ';
            this.dialog.message = `${forecast.time}の東京の気温は${forecast.temperature}℃です！`;
            this.dialog.isActive = true;
        }
    },
    computed: {
        versionLabel() {
            return `(Vue${Vue.version})`;
        }
    },
    mounted() {
        const prefecture = prefectureList[0];
        getForecastList(prefecture.latitude, prefecture.longitude).then(forecastList => {
            this.forecastList = forecastList.map(forecast => {
                const _forcast = {
                    time: forecast.moment.format("yyyy-MM-DD HH:mm:ss"),
                    temperature: sprintf("%2.1f", forecast.temperature)
                };
                return _forcast;
            });
        });
    }
});
new vueApp({
    el: "#app",
    delimiters: ["[[", "]]"],
});
