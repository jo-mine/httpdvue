let searchHistoryId = 1;
const vueApp = Vue.extend({
    data() {
        return {
            postcode: '7390402',
            addressList: [],
            selectedSearchHistoryId: null
        };
    },
    methods: {
        searchPostcode() {
            searchPostcode(this.postcode).then(addressList => {
                console.log([this.addressList, addressList]);
                this.addressList.unshift(...addressList.map(v => {
                    return Object.assign({ searchDatetime: moment().format('yyyy-MM-DD HH:mm:ss'), searchHistoryId: searchHistoryId++ }, v);
                }));
            }).catch((errMessage) => {
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
            });
        },
        showSearchDetail(address) {
            this.selectedSearchHistoryId = address.searchHistoryId;
        }
    },
    computed: {
        selectedAddress() {
            if (!this.selectedSearchHistoryId) {
                return null;
            }
            return this.addressList.find(v => v.searchHistoryId === this.selectedSearchHistoryId);
        }
    },
});
new vueApp({
    el: "#app",
    delimiters: ["[[", "]]"],
});
