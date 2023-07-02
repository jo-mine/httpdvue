var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let searchHistoryId = 1;
const vueApp = Vue.extend({
    data() {
        return {
            postcode: '7390402',
            addressList: [],
            selectedSearchHistoryId: null,
            dialog: { title: "", message: "", isActive: false }
        };
    },
    methods: {
        searchPostcode() {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const addressList = yield searchPostcode(this.postcode);
                    this.addressList.unshift(...addressList.map(v => {
                        return Object.assign({ searchDatetime: moment().format('yyyy-MM-DD HH:mm:ss'), searchHistoryId: searchHistoryId++ }, v);
                    }));
                }
                catch (e) {
                    const errMessage = e;
                    this.addressList.unshift({
                        address1: '',
                        address2: '',
                        address3: '',
                        kana1: '',
                        kana2: '',
                        kana3: '',
                        prefcode: '',
                        zipcode: '',
                        searchDatetime: moment().format('yyyy-MM-DD HH:mm:ss'),
                        searchHistoryId: searchHistoryId++,
                        errMessage
                    });
                }
            });
        },
        showSearchDetail(address) {
            this.selectedSearchHistoryId = address.searchHistoryId;
        },
        searchForecast() {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const forecastList = yield getForecastList(this.selectedPrefecture.latitude, this.selectedPrefecture.longitude);
                    const todayForecastList = forecastList.filter(v => {
                        return v.moment.isSame(moment(), 'day');
                    });
                    const min = Math.min(...todayForecastList.map(v => Number(v.temperature)));
                    const max = Math.max(...todayForecastList.map(v => Number(v.temperature)));
                    const sum = todayForecastList.reduce((carry, v) => {
                        return carry + Number(v.temperature);
                    }, 0);
                    const average = sum / todayForecastList.length;
                    this.dialog.title = 'お天気メッセージ';
                    this.dialog.message = `${moment().format('yyyy-MM-DD')}の気温<br />
                最高: ${max}℃<br />
                平均: ${sprintf("%.1f", average)}℃<br />
                最低: ${min}℃`;
                    this.dialog.isActive = true;
                    console.log(forecastList);
                }
                catch (e) {
                    console.error(e);
                }
            });
        }
    },
    computed: {
        selectedAddress() {
            if (!this.selectedSearchHistoryId) {
                return null;
            }
            return this.addressList.find(v => v.searchHistoryId === this.selectedSearchHistoryId);
        },
        prefectureList() {
            return prefectureList;
        },
        isPrefectureCdExistsInList() {
            return this.prefectureList.some(v => v.prefecture_cd === this.selectedAddress.prefcode);
        },
        selectedPrefecture() {
            if (!this.isPrefectureCdExistsInList) {
                return null;
            }
            return this.prefectureList.find(v => v.prefecture_cd === this.selectedAddress.prefcode);
        }
    },
});
new vueApp({
    el: "#app",
    delimiters: ["[[", "]]"],
});
//# sourceMappingURL=postcode.js.map