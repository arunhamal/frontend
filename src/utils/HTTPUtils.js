import { httpBaseUtils } from "./HttpBaseUtils"

export const post = (url, data) => {
    return httpBaseUtils().post(url, data)
}

export const fetch = (url) => {
    return httpBaseUtils().get(url)
}

// export const update = (url, data) => {
//     return httpBaseUtils().put(url, data)
// }