import type { PokemonSummary } from '../pokemon/types'

export const FAVORITES_STORAGE_KEY = 'pokedex:favorites'

export function readFavorites(): PokemonSummary[] {
  try {
    const data: unknown = JSON.parse(localStorage.getItem(FAVORITES_STORAGE_KEY) ?? '[]')
    if (!Array.isArray(data)) return []

    const favorites: PokemonSummary[] = []
    for (const value of data) {
      const item: unknown = value
      if (
        typeof item !== 'object' ||
        item === null ||
        !('id' in item) ||
        !('name' in item) ||
        !('types' in item)
      )
        continue
      const { id, name, types } = item
      if (
        typeof id !== 'number' ||
        !Number.isSafeInteger(id) ||
        id < 1 ||
        typeof name !== 'string' ||
        !Array.isArray(types) ||
        !types.length ||
        !types.every((type: unknown) => typeof type === 'string')
      )
        continue
      if (!favorites.some((pokemon) => pokemon.id === id))
        favorites.push({ id, name, types })
    }
    return favorites
  } catch {
    return []
  }
}
