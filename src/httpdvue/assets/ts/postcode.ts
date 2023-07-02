let searchHistoryId = 1;
interface IAddress extends IAddressBase {
    searchHistoryId: number;
    searchDatetime: string;
    errMessage?: string;
}
const vueApp = Vue.extend({
    data() {
        return {
            postcode: '7390402',
            addressList: [] as IAddress[],
            selectedSearchHistoryId: null as (null|number),
            dialog: {title: "", message: "", isActive: false}
        }
    },
    methods: {
        async searchPostcode() {
            try {
                const addressList = await searchPostcode(this.postcode)
                this.addressList.unshift(...addressList.map(v => {
                    return {
                        searchDatetime: moment().format('yyyy-MM-DD HH:mm:ss'),
                        searchHistoryId: searchHistoryId++,
                        ...v
                    }
                }))
            } catch (e: unknown) {
                const errMessage =  e as string
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
                })
            }
        },
        showSearchDetail(address: IAddress) {
            this.selectedSearchHistoryId = address.searchHistoryId
        },
        async searchForecast() {
            try {
                const forecastList = await getForecastList(this.selectedPrefecture.latitude, this.selectedPrefecture.longitude)
                const todayForecastList = forecastList.filter(v => {
                    return v.moment.isSame(moment(), 'day')
                })
                const min = Math.min(...todayForecastList.map(v => Number(v.temperature)))
                const max = Math.max(...todayForecastList.map(v => Number(v.temperature)))
                const sum = todayForecastList.reduce((carry, v) => {
                    return carry + Number(v.temperature)
                }, 0)
                const average = sum / todayForecastList.length
                this.dialog.title = 'お天気メッセージ'
                this.dialog.message = `${moment().format('yyyy-MM-DD')}の気温<br />
                最高: ${max}℃<br />
                平均: ${sprintf("%.1f", average)}℃<br />
                最低: ${min}℃`
                this.dialog.isActive = true
                console.log(forecastList)
            } catch(e) {
                console.error(e)
            }
        }
    },
    computed: {
        selectedAddress(): IAddress|null {
            if (!this.selectedSearchHistoryId) {
                return null
            }
            return this.addressList.find(v => v.searchHistoryId === this.selectedSearchHistoryId)
        },
        prefectureList(): IPrefecture[] {
            return prefectureList
        },
        isPrefectureCdExistsInList(): boolean {
            return this.prefectureList.some(v => v.prefecture_cd === this.selectedAddress.prefcode)
        },
        selectedPrefecture(): IPrefecture|null {
            if(!this.isPrefectureCdExistsInList) {
                return null
            }
            return this.prefectureList.find(v => v.prefecture_cd === this.selectedAddress.prefcode)
        }
    },
})

new vueApp({
    el: "#app",
    delimiters: ["[[", "]]"],
})