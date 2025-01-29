import { Link } from 'react-router-dom'
import styles from './CityItem.module.css'

import { flagemojiToPNG, formatDate } from './Utils'
import { useCities } from '../providers/CitiesProvider'

function CityItem({ city }) {
  const { currentCity, clearCurrentCity, deleteCity } = useCities()
  const { cityName, emoji, date, id, position } = city

  return (
    <li>
      {/* onClick set currentCity to empty object to avoid glitch of showing previous selected city */}
      <Link onClick={clearCurrentCity} className={`${styles.cityItem} ${id === currentCity.id ? styles['cityItem--active'] : ''}`} to={`${id}?lat=${position.lat}&lng=${position.lng}`}>
        <span className={styles.emoji}>{flagemojiToPNG(emoji)}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button
          className={styles.deleteBtn}
          onClick={e => {
            e.preventDefault()
            deleteCity(city.id)
          }}
        >
          &times;
        </button>
      </Link>
    </li>
  )
}

export default CityItem
