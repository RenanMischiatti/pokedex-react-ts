import { Link } from 'react-router'
import styles from './NotFoundPage.module.css'

function NotFoundPage() {
  return (
    <>
      <span className={styles.eyebrow}>Erro 404 · Fora do mapa</span>
      <h1 className={styles.pageTitle}>Um desvio na aventura.</h1>
      <p className={styles.description}>Não encontramos uma página neste endereço.</p>
      <Link className={styles.button} to="/">
        Voltar para a coleção <span aria-hidden="true">↗</span>
      </Link>
    </>
  )
}

export default NotFoundPage
