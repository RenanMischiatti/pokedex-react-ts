import { useFavorites } from '../../features/favorites/useFavorites'
import type { PokemonSummary } from '../../features/pokemon/types'
import styles from './FavoriteButton.module.css'

function FavoriteButton({ pokemon }: { pokemon: PokemonSummary }) {
  const { favorites, toggleFavorite } = useFavorites()
  const isFavorite = favorites.some((favorite) => favorite.id === pokemon.id)

  return (
    <button
      type="button"
      className={styles.button}
      aria-pressed={isFavorite}
      aria-label={`${isFavorite ? 'Descurtir' : 'Curtir'} ${pokemon.name}`}
      title={`${isFavorite ? 'Descurtir' : 'Curtir'} ${pokemon.name}`}
      onClick={() => toggleFavorite(pokemon)}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" width="20" height="20">
        <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />
      </svg>
    </button>
  )
}

export default FavoriteButton
