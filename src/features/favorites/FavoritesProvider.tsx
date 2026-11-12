import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import type { PokemonSummary } from '../pokemon/types'
import { FavoritesContext } from './favoritesContext'
import { FAVORITES_STORAGE_KEY, readFavorites } from './favoritesStorage'

function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState(readFavorites)

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites))
    } catch {
      console.warn('Não foi possível salvar os curtidos neste navegador.')
    }
  }, [favorites])

  function toggleFavorite({ id, name, types }: PokemonSummary) {
    setFavorites((current) =>
      current.some((pokemon) => pokemon.id === id)
        ? current.filter((pokemon) => pokemon.id !== id)
        : [...current, { id, name, types }],
    )
  }

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export default FavoritesProvider
