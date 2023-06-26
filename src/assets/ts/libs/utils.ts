const zip = (...argArrays: any[]) => {
    const max = Math.max(...argArrays.map(arr => arr.length ?? 0))
    const result = []
    for(let i=0; i<max; i++) {
        result.push(argArrays.map(arr => arr[i]))
    }
    return result
}

const prefectureList = [
    { prefecture_cd: 'tokyo', prefecture_name: '東京', latitude: 35.6894, longitude: 139.6917 },
    { prefecture_cd: 'yamaguchi', prefecture_name: '山口', latitude: 34.1859, longitude: 131.4706 },
]

interface IBaseForcast {
    moment: moment.Moment;
    temperature: string;
}

const getForecastList = async (latitude: string|number, longitude: string|number): Promise<IBaseForcast[]> => {
    const url = "https://api.open-meteo.com/v1/forecast";
    const data = {
        latitude,
        longitude,
        timezone: "Asia/Tokyo",
        hourly: "temperature_2m",
    }
    const settings = {
        data,
    }
    const ajaxResult = await $.ajax(url, settings)
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