import { useEffect } from 'react'
import Map from '../components/Map'
import Sidebar from '../components/Sidebar'
import User from '../components/User'
import { useAuth } from '../providers/FakeAuthProvider'
import styles from './AppLayout.module.css'
import { useNavigate } from 'react-router-dom'

function AppLayout() {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  console.log(isAuthenticated)

  useEffect(
    function () {
      if (!isAuthenticated) navigate('/login')
    },
    [isAuthenticated]
  )

  return isAuthenticated ? (
    <div className={styles.app}>
      <User />
      <Sidebar />
      <Map />
    </div>
  ) : null
}

export default AppLayout
