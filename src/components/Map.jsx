import { useNavigate, useSearchParams } from 'react-router-dom'
import styles from './Map.module.css'
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet'
import { useEffect, useState } from 'react'
import { useCities } from '../providers/CitiesProvider'
import { flagemojiToPNG } from './Utils'

const defaultCoord = { lat: 51.477806, lng: -0.001472 }

function Map() {
  const { cities } = useCities()

  const [mapPosition, setMapPosition] = useState([defaultCoord.lat, defaultCoord.lng])

  const [searchParams] = useSearchParams()
  const mapLat = searchParams.get('lat')
  const mapLng = searchParams.get('lng')

  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng])
    },
    [mapLat, mapLng]
  )

  // openstreetmaps tile provider
  // https://wiki.openstreetmap.org/wiki/Raster_tile_providers
  return (
    <div className={styles.mapContainer}>
      <MapContainer center={mapPosition} zoom={7} scrollWheelZoom={true} className={styles.map}>
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png" />
        {cities.map(city => (
          <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
            <Popup>
              <span>{flagemojiToPNG(city.emoji)}</span> <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  )
}

function ChangeCenter({ position }) {
  const map = useMap()
  map.setView(position)
  return null
}

function DetectClick() {
  const navigate = useNavigate()

  useMapEvents({
    click: e => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
    }
  })
}

export default Map
