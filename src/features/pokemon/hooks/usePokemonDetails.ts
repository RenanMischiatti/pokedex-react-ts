import { useEffect, useState } from 'react'
import { getPokemon } from '../api/pokemonApi'
import type { PokemonDetails } from '../types'

type DetailsState =
  | { status: 'loading' }
  | { status: 'success'; data: PokemonDetails }
  | { status: 'error'; message: string }

export function usePokemonDetails(name: string) {
  const [attempt, setAttempt] = useState(0)
  const [request, setRequest] = useState<{
    name: string
    attempt: number
    result: DetailsState
  }>({
    name,
    attempt,
    result: { status: 'loading' },
  })

  useEffect(() => {
    const controller = new AbortController()
    getPokemon(name, controller.signal)
      .then((data) => {
        if (!controller.signal.aborted)
          setRequest({ name, attempt, result: { status: 'success', data } })
      })
      .catch((error: unknown) => {
        if (!controller.signal.aborted) {
          setRequest({
            name,
            attempt,
            result: {
              status: 'error',
              message:
                error instanceof TypeError
                  ? 'Verifique sua conexão e tente novamente.'
                  : error instanceof Error
                    ? error.message
                    : 'Não foi possível carregar o Pokémon.',
            },
          })
        }
      })
    return () => controller.abort()
  }, [name, attempt])

  const state: DetailsState =
    request.name === name && request.attempt === attempt
      ? request.result
      : { status: 'loading' }
  return { state, retry: () => setAttempt((current) => current + 1) }
}
