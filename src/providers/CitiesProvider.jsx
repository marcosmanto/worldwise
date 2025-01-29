import { createContext, useContext, useEffect, useReducer } from 'react'
import { BASE_URL, Actions } from '../constants'

const CitiesContext = createContext()

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: ''
}

function reducer(state, action) {
  switch (action.type) {
    case Actions.LOADING:
      return { ...state, isLoading: true }
    case Actions.CITIES_LOADED:
      return {
        ...state,
        isLoading: false,
        cities: action.payload
      }
    case Actions.CITY_LOADED:
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload
      }
    case Actions.CITY_CREATED:
      return {
        ...state,
        isLoading: false,
        cities: [action.payload, ...state.cities],
        currentCity: action.payload
      }
    case Actions.CITY_DELETED:
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter(city => city.id !== action.payload),
        currentCity: {}
      }

    case Actions.REJECTED:
      return { ...state, isLoading: false, error: action.payload }

    default:
      throw new Error('Unknown action type')
  }
}

export function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(reducer, initialState)

  // const [cities, setCities] = useState([])
  // const [isLoading, setIsLoading] = useState(false)
  // const [currentCity, setCurrentCity] = useState({})

  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: Actions.LOADING })
      try {
        //setIsLoading(true)
        const res = await fetch(`${BASE_URL}/cities`)
        const data = await res.json()
        //setCities(data)
        dispatch({ type: Actions.CITIES_LOADED, payload: data })
      } catch {
        dispatch({ type: Actions.REJECTED, payload: 'There was an error loading cities...' })
      }
    }
    fetchCities()
  }, [])

  async function getCity(id) {
    // if city is already loaded skip fetching again
    if (Number(id) === currentCity.id) return

    dispatch({ type: Actions.LOADING })
    try {
      //setIsLoading(true)
      const res = await fetch(`${BASE_URL}/cities/${id}`)
      const data = await res.json()
      //setCurrentCity(data)
      dispatch({ type: Actions.CITY_LOADED, payload: data })
    } catch {
      dispatch({ type: Actions.REJECTED, payload: 'There was an error loading the city...' })
    }
  }

  function clearCurrentCity() {
    dispatch({ type: Actions.CITY_LOADED, payload: {} })
  }

  async function createCity(newCity) {
    dispatch({ type: Actions.LOADING })
    try {
      //setIsLoading(true)
      const res = await fetch(`${BASE_URL}/cities`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await res.json()

      //setCities([data, ...cities])
      dispatch({ type: Actions.CITY_CREATED, payload: data })
    } catch {
      dispatch({ type: Actions.REJECTED, payload: 'There was an error creating the city...' })
    }
  }

  async function deleteCity(id) {
    dispatch({ type: Actions.LOADING })
    try {
      //setIsLoading(true)
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: 'DELETE'
      })

      //setCities(cities.filter(city => city.id !== id))
      dispatch({ type: Actions.CITY_DELETED, payload: id })
    } catch {
      dispatch({ type: Actions.REJECTED, payload: 'There was an error deleting the city...' })
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
        getCity,
        clearCurrentCity,
        createCity,
        deleteCity
      }}
    >
      {children}
    </CitiesContext.Provider>
  )
}

export function useCities() {
  const context = useContext(CitiesContext)
  if (context === undefined) throw new Error('CitiesContext was used outside of the CitiesProvider')
  return context
}
