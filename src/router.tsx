import { Route, Routes } from 'react-router'
import AppLayout from './components/AppLayout/AppLayout'
import FavoritesPage from './pages/FavoritesPage/FavoritesPage'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'
import PokemonDetailsPage from './pages/PokemonDetailsPage/PokemonDetailsPage'
import PokemonListPage from './pages/PokemonListPage/PokemonListPage'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<PokemonListPage />} />
        <Route path="pokemon/:name" element={<PokemonDetailsPage />} />
        <Route path="favorites" element={<FavoritesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
