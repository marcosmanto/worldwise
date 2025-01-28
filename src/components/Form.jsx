// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from 'react'

import styles from './Form.module.css'

import { formatDate } from './Utils'
import Button from './Button'
import ButtonBack from './ButtonBack'
import { useUrlPosition } from '../hooks/useUrlPosition'
import { REVERSE_GEOCODE_URL } from '../constants'
import { flagemojiToPNG } from './Utils'
import Message from './Message'
import Spinner from './Spinner'

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt())
  return String.fromCodePoint(...codePoints)
}

function Form() {
  const [cityName, setCityName] = useState('')
  const [country, setCountry] = useState('')
  const [date, setDate] = useState(new Date())
  const [notes, setNotes] = useState('')
  const [lat, lng] = useUrlPosition()
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false)
  const [emoji, setEmoji] = useState('')
  const [geocodingError, setGeocodingError] = useState('')

  useEffect(
    function () {
      async function fetchCityData() {
        try {
          setIsLoadingGeocoding(true)
          setGeocodingError('')
          const res = await fetch(`${REVERSE_GEOCODE_URL}?latitude=${lat}&longitude=${lng}`)
          const data = await res.json()

          if (!data.countryCode) throw new Error("That doesn't seem to be a city. Click somewhere else. 😊")

          setCityName(data.locality || data.city || '')
          setCountry(data.countryName)
          setEmoji(flagemojiToPNG(convertToEmoji(data.countryCode)))
        } catch (error) {
          setGeocodingError(error.message ?? 'There was an error loading data...')
        } finally {
          setIsLoadingGeocoding(false)
        }
      }
      fetchCityData()
    },
    [lat, lng]
  )

  if (isLoadingGeocoding) return <Spinner />

  if (geocodingError) return <Message message={geocodingError} />

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input id="cityName" onChange={e => setCityName(e.target.value)} value={cityName} />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input id="date" onChange={e => setDate(e.target.value)} value={formatDate(date)} />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea id="notes" onChange={e => setNotes(e.target.value)} value={notes} />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <ButtonBack />
      </div>
    </form>
  )
}

export default Form
