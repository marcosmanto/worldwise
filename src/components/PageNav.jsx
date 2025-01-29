import { NavLink } from 'react-router-dom'
import styles from './PageNav.module.css'
import Logo from './Logo'
import { useAuth } from '../providers/FakeAuthProvider'
import User from './User'

function PageNav() {
  const { isAuthenticated } = useAuth()

  return (
    <>
      <nav className={`${styles.nav} ${isAuthenticated ? styles.logged : null}`}>
        <Logo />
        <ul>
          <li>
            <NavLink to="/pricing">Pricing</NavLink>
          </li>
          <li>
            <NavLink to="/product">Product</NavLink>
          </li>
          <li>
            {!isAuthenticated && (
              <NavLink to="/login" className={styles.ctaLink}>
                Login
              </NavLink>
            )}
          </li>
        </ul>
      </nav>
      {isAuthenticated && <User />}
    </>
  )
}

export default PageNav
