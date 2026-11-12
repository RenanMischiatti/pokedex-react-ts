import { useRef } from 'react'
import { useSearchParams } from 'react-router'
import Pagination from '../../components/Pagination/Pagination'
import PokemonCard from '../../components/PokemonCard/PokemonCard'
import PokemonCardSkeleton from '../../components/PokemonCardSkeleton/PokemonCardSkeleton'
import { POKEMON_PAGE_SIZE } from '../../features/pokemon/api/pokemonApi'
import { usePokemonList } from '../../features/pokemon/hooks/usePokemonList'
import styles from './PokemonListPage.module.css'

function PokemonListPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const requestedPage = Number(searchParams.get('page') ?? '1')
  const page =
    Number.isSafeInteger(requestedPage) &&
    requestedPage > 0 &&
    Number.isSafeInteger(requestedPage * POKEMON_PAGE_SIZE)
      ? requestedPage
      : 1
  const { state, retry } = usePokemonList(page)
  const listRef = useRef<HTMLElement>(null)

  function changePage(nextPage: number) {
    setSearchParams((currentParams) => {
      const nextParams = new URLSearchParams(currentParams)
      nextParams.set('page', String(nextPage))
      return nextParams
    })
    listRef.current?.scrollIntoView({ block: 'start' })
  }

  const totalPages =
    state.status === 'success' ? Math.ceil(state.data.count / POKEMON_PAGE_SIZE) : 0
  const hasResults = state.status === 'success' && state.data.results.length > 0

  return (
    <>
      <section className={styles.hero} aria-labelledby="explore-title">
        <span className={styles.eyebrow}>✦ A aventura começa aqui</span>
        <h1 id="explore-title">
          Um universo inteiro.
          <br />
          <span>Um Pokémon por vez.</span>
        </h1>
        <p>
          Conheça novos companheiros, descubra seus detalhes e encontre seus favoritos.
        </p>
        <div className={styles.heroBottom}>
          <span className={styles.dot} /> Grandes descobertas esperam por você
        </div>
        <div className={styles.pokeball} aria-hidden="true" />
      </section>

      <section
        ref={listRef}
        aria-labelledby="pokemon-title"
        className={styles.collection}
      >
        <div className={styles.sectionHeader}>
          <div>
            <h2 id="pokemon-title">Conheça os Pokémon</h2>
            <p>Todo grande encontro começa com um primeiro olhar.</p>
          </div>
          <span className={styles.badge}>100 POR PÁGINA</span>
        </div>

        <p className={styles.note} role="status">
          {state.status === 'loading' && `Carregando Pokémon da página ${page}…`}
          {state.status === 'success' &&
            hasResults &&
            `Exibindo ${(page - 1) * POKEMON_PAGE_SIZE + 1}–${(page - 1) * POKEMON_PAGE_SIZE + state.data.results.length} de ${state.data.count} Pokémon.`}
        </p>

        {hasResults && (
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={changePage}
            label="Paginação acima dos cards"
          />
        )}

        {state.status === 'error' ? (
          <div className={styles.feedback} role="alert">
            <h3>Não conseguimos carregar a coleção</h3>
            <p>{state.message}</p>
            <button type="button" onClick={retry}>
              Tentar novamente
            </button>
          </div>
        ) : (
          <div className={styles.grid} aria-busy={state.status === 'loading'}>
            {state.status === 'loading'
              ? Array.from({ length: POKEMON_PAGE_SIZE }, (_, index) => (
                  <PokemonCardSkeleton key={index} />
                ))
              : state.data.results.map((pokemon) => (
                  <PokemonCard key={pokemon.id} pokemon={pokemon} />
                ))}
          </div>
        )}

        {state.status === 'success' && !hasResults && (
          <div className={styles.feedback}>
            <h3>Nenhum Pokémon nesta página</h3>
            <p>Volte ao início da coleção para continuar explorando.</p>
            <button type="button" onClick={() => changePage(1)}>
              Ir para a primeira página
            </button>
          </div>
        )}

        {hasResults && (
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={changePage}
            label="Paginação abaixo dos cards"
          />
        )}
      </section>
    </>
  )
}

export default PokemonListPage
