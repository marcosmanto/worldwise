import { useNavigate, useSearchParams } from 'react-router-dom'
import styles from './Map.module.css'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { useState } from 'react'
import { useCities } from '../providers/CitiesProvider'
import { flagemojiToPNG } from './Utils'

function Map() {
  const navigate = useNavigate()
  const { cities } = useCities()

  const [mapPosition, setMapPosition] = useState([51.477806, -0.001472])
  const [searchParams, setSearchParams] = useSearchParams()
  const lat = searchParams.get('lat')
  const lng = searchParams.get('lng')

  // openstreetmaps tile provider
  // https://wiki.openstreetmap.org/wiki/Raster_tile_providers
  return (
    <div className={styles.mapContainer} onClick={() => navigate('form')}>
      <MapContainer center={mapPosition} zoom={13} scrollWheelZoom={true} className={styles.map}>
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png" />
        {cities.map(city => (
          <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
            <Popup>
              <span>{flagemojiToPNG(city.emoji)}</span> <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

export default Map
