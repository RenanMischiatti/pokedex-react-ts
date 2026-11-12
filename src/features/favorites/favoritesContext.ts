import { createContext } from 'react'
import type { PokemonSummary } from '../pokemon/types'

type FavoritesContextValue = {
  favorites: PokemonSummary[]
  toggleFavorite: (pokemon: PokemonSummary) => void
}

export const FavoritesContext = createContext<FavoritesContextValue | null>(null)
