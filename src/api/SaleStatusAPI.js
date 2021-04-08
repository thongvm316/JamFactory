import axiosClient from './axiosClient'

const saleStatusApi = {
  getDataSearch: (params) => {
    const url = '/myproduct/search'
    return axiosClient.get(url, { params })
  },

  getProductCount: (params) => {
    const url = '/myproduct/productcount'
    return axiosClient.get(url, { params })
  },

  getReviewInfo: (params) => {
    const url = '/myproduct/reviewinfo'
    return axiosClient.get(url, { params })
  },

  getSaleInfo: (params) => {
    const url = '/myproduct/saleinfo'
    return axiosClient.get(url, { params })
  },

  getRevenueInfo: (params) => {
    const url = '/myproduct/revenueinfo'
    return axiosClient.get(url, { params })
  },

  getListMarket: (params) => {
    const url = '/myproduct/listmarket'
    return axiosClient.get(url, { params })
  },

  getExcelFile: (params) => {
    const { key, start, end, lastIndex } = params
    const url = `/myproduct/export?key=${key}&lastIndex=${lastIndex}&start=${start}&end=${end}`
    return axiosClient.get(url, {
      responseType: 'blob',
    })
  },

  getExcelFileProduct: (params) => {
    const url = `/product/export?${params}`
    return axiosClient.get(url, {
      responseType: 'blob',
    })
  },

  getExcelFileProductSort: (params) => {
    const url = `/product/export?${params}`
    return axiosClient.get(url, {
      responseType: 'blob',
    })
  },

  getExcelFileBander: (params) => {
    const url = `/bander/export?${params}`
    return axiosClient.get(url, {
      responseType: 'blob',
    })
  },
}

export default saleStatusApi
