import { Link } from 'react-router'
import PokemonCard from '../../components/PokemonCard/PokemonCard'
import { useFavorites } from '../../features/favorites/useFavorites'
import styles from './FavoritesPage.module.css'

function FavoritesPage() {
  const { favorites } = useFavorites()
  return (
    <>
      <span className={styles.eyebrow}>Sua coleção pessoal</span>
      <h1 className={styles.pageTitle}>
        Meus curtidos<span aria-hidden="true">.</span>
      </h1>
      <p className={styles.description}>
        Um lugar especial para seus companheiros favoritos.
      </p>
      {favorites.length ? (
        <>
          <p className={styles.count} role="status">
            {favorites.length} Pokémon curtido{favorites.length === 1 ? '' : 's'}
          </p>
          <div className={styles.grid}>
            {favorites.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>
        </>
      ) : (
        <section className={styles.emptyState}>
          <span className={styles.emptyIcon} aria-hidden="true">
            ♡
          </span>
          <h2>Sua coleção começa com um coração</h2>
          <p>
            Toque no coração de um Pokémon para guardá-lo aqui. Seus curtidos ficam salvos
            neste navegador.
          </p>
          <Link className={styles.button} to="/">
            Explorar Pokémon <span aria-hidden="true">↗</span>
          </Link>
        </section>
      )}
    </>
  )
}

export default FavoritesPage
