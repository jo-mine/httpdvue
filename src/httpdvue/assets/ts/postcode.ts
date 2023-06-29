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
            selectedSearchHistoryId: null as (null|number)
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
                console.log(this.selectedPrefecture);
                
                const forecastList = await getForecastList(this.selectedPrefecture.latitude, this.selectedPrefecture.longitude)
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