import { createContext, useContext, useEffect, useState } from 'react'
import { BASE_URL } from '../constants'

const CitiesContext = createContext()

export function CitiesProvider({ children }) {
  const [cities, setCities] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentCity, setCurrentCity] = useState({})

  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true)
        const res = await fetch(`${BASE_URL}/cities`)
        const data = await res.json()
        setCities(data)
      } catch {
        alert('There was an error loading data...')
      } finally {
        setIsLoading(false)
      }
    }
    fetchCities()
  }, [])

  async function getCity(id) {
    try {
      setIsLoading(true)
      const res = await fetch(`${BASE_URL}/cities/${id}`)
      const data = await res.json()
      setCurrentCity(data)
    } catch {
      alert('There was an error loading data...')
    } finally {
      setIsLoading(false)
    }
  }

  async function createCity(newCity) {
    try {
      setIsLoading(true)
      const res = await fetch(`${BASE_URL}/cities`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await res.json()

      setCities([data, ...cities])
    } catch {
      alert('There was an error loading data...')
    } finally {
      setIsLoading(false)
    }
  }

  async function deleteCity(id) {
    try {
      setIsLoading(true)
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: 'DELETE'
      })

      setCities(cities.filter(city => city.id !== id))
    } catch {
      alert('There was an error loading data...')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        setCurrentCity,
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
