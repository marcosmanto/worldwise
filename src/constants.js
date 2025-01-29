export const BASE_URL = 'http://localhost:8000'
export const REVERSE_GEOCODE_URL = 'https:/api.bigdatacloud.net/data/reverse-geocode-client'

export const Actions = Object.freeze({
  LOADING: Symbol('loading'),
  REJECTED: Symbol('rejected'),
  CITIES_LOADED: Symbol('citiesloaded'),
  CITY_CREATED: Symbol('citiescreated'),
  CITY_DELETED: Symbol('citiesdeleted'),
  CITY_LOADED: Symbol('cityloaded')
})
