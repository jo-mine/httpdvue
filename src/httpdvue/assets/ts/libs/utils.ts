
Vue.component('customDialog', {
    props: ['title', 'message', 'isActive'],
    template: `
        <div class="dialog" :class="{'active': isActive}">
            <div class="dialog__background" @click="$emit('close')"></div>
            <div class="dialog__main">
                <div class="dialog__main__title" v-if="title">[[ title ]]</div>
                <div class="dialog__main__body" v-html="message"></div>
                <div class="dialog__main__button-area">
                    <div class="button selectable" @click="$emit('close')">閉じる</div>
                </div>
            </div>
        </div>
    `,
    delimiters: ["[[", "]]"],
})
const zip = (...argArrays: any[]) => {
    const max = Math.max(...argArrays.map(arr => arr.length ?? 0))
    const result = []
    for(let i=0; i<max; i++) {
        result.push(argArrays.map(arr => arr[i]))
    }
    return result
}

interface IPrefecture {
    prefecture_cd: string;
    prefecture_name: string;
    latitude: number;
    longitude: number;
}
const prefectureList = [
    { prefecture_cd: '13', prefecture_name: '東京', latitude: 35.6894, longitude: 139.6917 },
    { prefecture_cd: '34', prefecture_name: '広島', latitude: 34.2347, longitude: 131.2817 },
    { prefecture_cd: '35', prefecture_name: '山口', latitude: 34.1859, longitude: 131.4706 },
]

interface IBaseForcast {
    moment: moment.Moment;
    temperature: string;
}

interface ITemperatureDaily {
    moment: moment.Moment;
    max: string;
    min: string;
}

class OpenMeteo {
    private latitude: string|number;
    private longitude: string|number;

    constructor(latitude: string|number, longitude: string|number) {
        this.latitude = latitude
        this.longitude = longitude
    }

    private requestOpenMeteo = async (params: Object): Promise<any> => {
        const url = "https://api.open-meteo.com/v1/forecast";
        const settings = {
            data: {
                ...params,
            },
        }
        return await $.ajax(url, settings)
    }

    private getCommonParams (): Object {
        return {
            latitude: this.latitude,
            longitude: this.longitude,
            timezone: "Asia/Tokyo",
        }
    }

    public async getDailyTemperatureList(): Promise<ITemperatureDaily[]> {
        const params = {
            ...this.getCommonParams(),
            daily: "temperature_2m_max,temperature_2m_min"
        }
        const ajaxResult = await this.requestOpenMeteo(params)
        const times = ajaxResult.daily.time
        const maxs = ajaxResult.daily.temperature_2m_max
        const mins = ajaxResult.daily.temperature_2m_min
        const result = zip(times, maxs, mins).map(([time, max, min]) => {
            return {
                moment: moment(time),
                max,
                min
            }
        })
        return result
    }

    public async getHourlyTemperatureList(): Promise<IBaseForcast[]> {
        const params = {
            ...this.getCommonParams(),
            hourly: "temperature_2m",
        }
        const ajaxResult = await this.requestOpenMeteo(params)
        const times = ajaxResult.hourly.time
        const temperatures = ajaxResult.hourly.temperature_2m

        const result = zip(times, temperatures).map(([time, temperature]) => {
            return {
                moment: moment(time),
                temperature: temperature as string,
            }
        })
        return result
    }
}

interface ISearchPostCodeResult {
    message: string|null;
    results: IAddressBase[] | null;
    status: string;
}

interface IAddressBase {
    address1: string;
    address2: string;
    address3: string;
    kana1: string;
    kana2: string;
    kana3: string;
    prefcode: string;
    zipcode: string;
}

const searchPostcode = (postcode: string): Promise<IAddressBase[]> => {
    const url = "https://zipcloud.ibsnet.co.jp/api/search";
    const data = {
        zipcode: postcode
    }
    const settings = {
        data,
    }
    return new Promise((resolve, reject) => {
        $.ajax(url, settings).then((_result: string) => {
            const result = JSON.parse(_result) as ISearchPostCodeResult
            
            if (result.status != '200') {
                reject(result.message+result.status)
                return
            }
            if (!result.results?.length) {
                reject('条件に合致する郵便番号が存在しません。')
                return
            }
            resolve(result.results)
            return
        })
    })
}