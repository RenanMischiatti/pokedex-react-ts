import type { PokemonDetails, PokemonPage } from '../types'

export const POKEMON_PAGE_SIZE = 100

const pageCache = new Map<number, PokemonPage>()
const pokemonCache = new Map<string, PokemonDetails>()

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function parsePokemonPage(data: unknown) {
  if (
    !isRecord(data) ||
    typeof data.count !== 'number' ||
    !Number.isSafeInteger(data.count) ||
    data.count < 0 ||
    !Array.isArray(data.results)
  ) {
    throw new Error('A API retornou uma lista em formato inesperado.')
  }

  const results = data.results.map((item: unknown) => {
    if (
      !isRecord(item) ||
      typeof item.name !== 'string' ||
      typeof item.url !== 'string'
    ) {
      throw new Error('A API retornou um Pokémon em formato inesperado.')
    }
    const match = item.url.match(/\/pokemon\/(\d+)\/$/)
    const id = match ? Number(match[1]) : NaN

    if (!Number.isSafeInteger(id) || id < 1) {
      throw new Error('Não foi possível identificar um Pokémon da lista.')
    }

    return { id, name: item.name }
  })

  return { count: data.count, results }
}

export async function getPokemonPage(
  page: number,
  signal: AbortSignal,
): Promise<PokemonPage> {
  signal.throwIfAborted()
  const cachedPage = pageCache.get(page)

  if (cachedPage) return cachedPage

  const offset = (page - 1) * POKEMON_PAGE_SIZE
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${POKEMON_PAGE_SIZE}&offset=${offset}`,
    { signal },
  )

  if (!response.ok) {
    throw new Error('Não foi possível carregar os Pokémon. Tente novamente.')
  }
  const data: unknown = await response.json()
  const list = parsePokemonPage(data)
  const results: PokemonDetails[] = []
  for (let index = 0; index < list.results.length; index += 10) {
    signal.throwIfAborted()
    const batch = list.results.slice(index, index + 10)
    results.push(
      ...(await Promise.all(batch.map((pokemon) => getPokemon(pokemon.name, signal)))),
    )
  }

  const pokemonPage = { count: list.count, results }
  pageCache.set(page, pokemonPage)

  return pokemonPage
}

function parsePokemon(data: unknown): PokemonDetails {
  if (
    !isRecord(data) ||
    typeof data.id !== 'number' ||
    !Number.isSafeInteger(data.id) ||
    data.id < 1 ||
    typeof data.name !== 'string' ||
    typeof data.height !== 'number' ||
    !Number.isFinite(data.height) ||
    data.height < 0 ||
    typeof data.weight !== 'number' ||
    !Number.isFinite(data.weight) ||
    data.weight < 0 ||
    !Array.isArray(data.types) ||
    !data.types.length ||
    !Array.isArray(data.abilities) ||
    !Array.isArray(data.stats)
  )
    throw new Error('Os detalhes do Pokémon vieram em formato inesperado.')

  const types = data.types.map((item: unknown) => {
    if (!isRecord(item) || !isRecord(item.type) || typeof item.type.name !== 'string') {
      throw new Error('Não foi possível identificar o tipo do Pokémon.')
    }
    return item.type.name
  })
  const abilities = data.abilities.map((item: unknown) => {
    if (
      !isRecord(item) ||
      !isRecord(item.ability) ||
      typeof item.ability.name !== 'string' ||
      typeof item.is_hidden !== 'boolean'
    ) {
      throw new Error('Não foi possível identificar as habilidades do Pokémon.')
    }
    return { name: item.ability.name, hidden: item.is_hidden }
  })
  const stats = data.stats.map((item: unknown) => {
    if (
      !isRecord(item) ||
      !isRecord(item.stat) ||
      typeof item.stat.name !== 'string' ||
      typeof item.base_stat !== 'number' ||
      !Number.isFinite(item.base_stat) ||
      item.base_stat < 0
    ) {
      throw new Error('Não foi possível identificar os atributos do Pokémon.')
    }
    return { name: item.stat.name, value: item.base_stat }
  })
  return {
    id: data.id,
    name: data.name,
    types,
    height: data.height,
    weight: data.weight,
    abilities,
    stats,
  }
}

export async function getPokemon(
  name: string,
  signal: AbortSignal,
): Promise<PokemonDetails> {
  signal.throwIfAborted()
  const cachedPokemon = pokemonCache.get(name)
  if (cachedPokemon) return cachedPokemon

  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(name)}`,
    { signal },
  )
  if (response.status === 404)
    throw new Error('Pokémon não encontrado. Confira o nome no endereço.')
  if (!response.ok)
    throw new Error('Não foi possível carregar o Pokémon. Tente novamente.')
  const data: unknown = await response.json()
  const pokemon = parsePokemon(data)
  pokemonCache.set(pokemon.name, pokemon)
  pokemonCache.set(String(pokemon.id), pokemon)
  return pokemon
}
