import { useState } from 'react'
import { Link } from 'react-router'
import type { PokemonSummary } from '../../features/pokemon/types'
import { getTypeLabel } from '../../features/pokemon/pokemonLabels'
import themeStyles from '../../features/pokemon/pokemonTheme.module.css'
import FavoriteButton from '../FavoriteButton/FavoriteButton'
import styles from './PokemonCard.module.css'

type PokemonCardProps = {
  pokemon: PokemonSummary
}

function PokemonCard({ pokemon }: PokemonCardProps) {
  const { id, name } = pokemon
  const [imageFailed, setImageFailed] = useState(false)

  return (
    <article
      className={`${styles.card} ${themeStyles.theme}`}
      data-type={pokemon.types[0]}
    >
      <div className={styles.favorite}>
        <FavoriteButton pokemon={pokemon} />
      </div>
      <Link to={`/pokemon/${name}`} aria-label={`Ver detalhes de ${name}`}>
        <div className={styles.artwork}>
          <span className={styles.number}>#{String(id).padStart(3, '0')}</span>
          <div className={styles.circle} />
          {imageFailed ? (
            <span className={styles.imageFallback}>Imagem indisponível</span>
          ) : (
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
              alt={name}
              width="180"
              height="180"
              loading="lazy"
              onError={() => setImageFailed(true)}
            />
          )}
        </div>
        <div className={styles.info}>
          <div>
            <h3>{name}</h3>
            <div className={styles.types}>
              {pokemon.types.map((type) => (
                <span
                  key={type}
                  data-type={type}
                  className={`${styles.details} ${themeStyles.theme}`}
                >
                  {getTypeLabel(type)}
                </span>
              ))}
            </div>
          </div>
          <span className={styles.arrow} aria-hidden="true">
            ↗
          </span>
        </div>
      </Link>
    </article>
  )
}

export default PokemonCard
