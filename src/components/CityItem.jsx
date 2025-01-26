import { Link } from 'react-router-dom'
import styles from './CityItem.module.css'

import { flagemojiToPNG, formatDate } from './Utils'

function CityItem({ city }) {
  const { cityName, emoji, date, id, position } = city

  return (
    <li>
      <Link className={styles.cityItem} to={`${id}?lat=${position.lat}&lng=${position.lng}`}>
        <span className={styles.emoji}>{flagemojiToPNG(emoji)}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  )
}

export default CityItem
