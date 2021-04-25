const BASE_URL = 'https://api.koibanx.com/stores'

export default class CommerceService {
    getAll(q = {}, h = {}, skip = 0) {
        const query = JSON.stringify(q)
        const order = JSON.stringify(h)
        const url = `${BASE_URL}?q=${query}&h=${order}&max=100&skip=${skip}`

        console.log(url)
        // TODO: Ésto se reemplazaría con el fetch en la implementacion en la comunicacion con la API
        return Promise.resolve({ data_to_show: [], current_page: 1, rows_total: 0, rows_per_page: 100, sort: [] })
    }
}
