import { NavLink, Outlet } from 'react-router'
import styles from './AppLayout.module.css'

function AppLayout() {
  return (
    <div className={styles.app}>
      <header className={styles.sidebar}>
        <NavLink className={styles.brand} to="/" aria-label="Pokédex — início">
          <span className={styles.brandIcon} aria-hidden="true" />
          pokédex<span className={styles.brandDot}>.</span>
        </NavLink>
        <p className={styles.menuLabel}>SEU UNIVERSO POKÉMON</p>
        <nav aria-label="Menu principal">
          <ul className={styles.menu}>
            <li>
              <NavLink
                className={({ isActive }) =>
                  `${styles.menuLink} ${isActive ? styles.active : ''}`
                }
                to="/"
                end
              >
                <span aria-hidden="true">◈</span> Explorar Pokémon
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  `${styles.menuLink} ${isActive ? styles.active : ''}`
                }
                to="/favorites"
              >
                <span aria-hidden="true">♡</span> Meus curtidos
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className={styles.sidebarNote}>
          <span aria-hidden="true">✦</span>
          <p>
            Uma nova descoberta
            <br />a cada Pokémon.
          </p>
          <small>Explore. Conheça. Colecione favoritos.</small>
        </div>
        <p className={styles.sidebarFooter}>Feito para quem tem curiosidade.</p>
      </header>

      <div className={styles.content}>
        <div className={styles.topbar}>
          <span>Um mundo de descobertas</span>
          <span className={styles.edition}>POKÉDEX / VOL. 01</span>
        </div>
        <main id="main-content" className={styles.main}>
          <Outlet />
        </main>
        <footer className={styles.footer}>Pequenos encontros. Grandes aventuras.</footer>
      </div>
    </div>
  )
}

export default AppLayout
