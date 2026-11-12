import { BrowserRouter } from 'react-router'
import AppRoutes from './router'
import FavoritesProvider from './features/favorites/FavoritesProvider'

function App() {
  return (
    <BrowserRouter>
      <FavoritesProvider>
        <AppRoutes />
      </FavoritesProvider>
    </BrowserRouter>
  )
}

export default App
