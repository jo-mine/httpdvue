var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const zip = (...argArrays) => {
    const max = Math.max(...argArrays.map(arr => { var _a; return (_a = arr.length) !== null && _a !== void 0 ? _a : 0; }));
    const result = [];
    for (let i = 0; i < max; i++) {
        result.push(argArrays.map(arr => arr[i]));
    }
    return result;
};
const prefectureList = [
    { prefecture_cd: 'tokyo', prefecture_name: '東京', latitude: 35.6894, longitude: 139.6917 },
    { prefecture_cd: 'yamaguchi', prefecture_name: '山口', latitude: 34.1859, longitude: 131.4706 },
];
const getForecastList = (latitude, longitude) => __awaiter(this, void 0, void 0, function* () {
    const url = "https://api.open-meteo.com/v1/forecast";
    const data = {
        latitude,
        longitude,
        timezone: "Asia/Tokyo",
        hourly: "temperature_2m",
    };
    const settings = {
        data,
    };
    const ajaxResult = yield $.ajax(url, settings);
    const times = ajaxResult.hourly.time;
    const temperatures = ajaxResult.hourly.temperature_2m;
    const result = zip(times, temperatures).map(([time, temperature]) => {
        return {
            moment: moment(time),
            temperature: temperature,
        };
    });
    return result;
});
const searchPostcode = (postcode) => {
    const url = "https://zipcloud.ibsnet.co.jp/api/search";
    const data = {
        zipcode: postcode
    };
    const settings = {
        data,
    };
    return new Promise((resolve, reject) => {
        $.ajax(url, settings).then((_result) => {
            var _a;
            const result = JSON.parse(_result);
            console.log(result);
            if (result.status != '200') {
                reject(result.message + result.status);
                return;
            }
            if (!((_a = result.results) === null || _a === void 0 ? void 0 : _a.length)) {
                reject('条件に合致する郵便番号が存在しません。');
                return;
            }
            resolve(result.results);
            return;
        });
    });
};
