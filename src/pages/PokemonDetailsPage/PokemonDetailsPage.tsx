import { useState } from 'react'
import { Link, useParams } from 'react-router'
import FavoriteButton from '../../components/FavoriteButton/FavoriteButton'
import PokemonCardSkeleton from '../../components/PokemonCardSkeleton/PokemonCardSkeleton'
import { usePokemonDetails } from '../../features/pokemon/hooks/usePokemonDetails'
import { getStatLabel, getTypeLabel } from '../../features/pokemon/pokemonLabels'
import themeStyles from '../../features/pokemon/pokemonTheme.module.css'
import styles from './PokemonDetailsPage.module.css'

function PokemonDetailsContent({ name }: { name: string }) {
  const { state, retry } = usePokemonDetails(name)
  const [imageFailed, setImageFailed] = useState(false)

  if (state.status === 'loading') {
    return (
      <>
        <p role="status" className={styles.loading}>
          Carregando os detalhes do Pokémon…
        </p>
        <div className={styles.loadingGrid} aria-busy="true">
          <PokemonCardSkeleton />
          <PokemonCardSkeleton />
        </div>
      </>
    )
  }

  if (state.status === 'error') {
    return (
      <div className={styles.feedback} role="alert">
        <h1>Não conseguimos encontrar seu companheiro</h1>
        <p>{state.message}</p>
        <button type="button" className={styles.button} onClick={retry}>
          Tentar novamente
        </button>
      </div>
    )
  }

  const pokemon = state.data

  return (
    <div className={themeStyles.theme} data-type={pokemon.types[0]}>
      <section className={styles.overview} aria-labelledby="pokemon-name">
        <div className={styles.artwork}>
          <span className={styles.number}>#{String(pokemon.id).padStart(3, '0')}</span>
          <div className={styles.favorite}>
            <FavoriteButton pokemon={pokemon} />
          </div>
          <div className={styles.circle} aria-hidden="true" />
          {imageFailed ? (
            <p>Imagem indisponível</p>
          ) : (
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
              alt={pokemon.name}
              width="360"
              height="360"
              onError={() => setImageFailed(true)}
            />
          )}
        </div>
        <div className={styles.summary}>
          <span className={styles.eyebrow}>Conheça seu companheiro</span>
          <h1 id="pokemon-name">{pokemon.name.replaceAll('-', ' ')}</h1>
          <div className={styles.types}>
            {pokemon.types.map((type) => (
              <span
                key={type}
                data-type={type}
                className={`${styles.type} ${themeStyles.theme}`}
              >
                {getTypeLabel(type)}
              </span>
            ))}
          </div>
          <p className={styles.description}>
            Cada Pokémon tem suas próprias características. Conheça os números e as
            habilidades de {pokemon.name}.
          </p>
          <dl className={styles.measurements}>
            <div>
              <dt>Altura</dt>
              <dd>
                {(pokemon.height / 10).toLocaleString('pt-BR')} <small>m</small>
              </dd>
            </div>
            <div>
              <dt>Peso</dt>
              <dd>
                {(pokemon.weight / 10).toLocaleString('pt-BR')} <small>kg</small>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <div className={styles.information}>
        <section className={styles.panel} aria-labelledby="stats-title">
          <span className={styles.eyebrow}>O potencial do seu Pokémon</span>
          <h2 id="stats-title">Atributos base</h2>
          <div className={styles.stats}>
            {pokemon.stats.map((stat) => (
              <div className={styles.stat} key={stat.name}>
                <label htmlFor={`stat-${stat.name}`}>{getStatLabel(stat.name)}</label>
                <strong>{stat.value}</strong>
                <meter
                  id={`stat-${stat.name}`}
                  min="0"
                  max={Math.max(255, stat.value)}
                  value={stat.value}
                />
              </div>
            ))}
          </div>
        </section>
        <section className={styles.panel} aria-labelledby="abilities-title">
          <span className={styles.eyebrow}>Talentos especiais</span>
          <h2 id="abilities-title">Habilidades</h2>
          <ul className={styles.abilities}>
            {pokemon.abilities.map((ability) => (
              <li key={ability.name}>
                <span>{ability.name.replaceAll('-', ' ')}</span>
                {ability.hidden && <small>Habilidade oculta</small>}
              </li>
            ))}
          </ul>
          <p className={styles.note}>
            Os nomes das habilidades são exibidos como fornecidos pela PokéAPI.
          </p>
        </section>
      </div>
    </div>
  )
}

function PokemonDetailsPage() {
  const { name } = useParams<{ name: string }>()
  return (
    <>
      <Link to="/" className={styles.back}>
        ← Voltar para a coleção
      </Link>
      <PokemonDetailsContent key={name} name={name ?? ''} />
    </>
  )
}

export default PokemonDetailsPage
