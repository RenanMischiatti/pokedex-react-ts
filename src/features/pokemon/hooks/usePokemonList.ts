import { useEffect, useState } from 'react'
import { getPokemonPage } from '../api/pokemonApi'
import type { PokemonPage } from '../types'

type PokemonListState =
  | { status: 'loading' }
  | { status: 'success'; data: PokemonPage }
  | { status: 'error'; message: string }

type RequestState = {
  page: number
  attempt: number
  result: PokemonListState
}

export function usePokemonList(page: number) {
  const [attempt, setAttempt] = useState(0)
  const [request, setRequest] = useState<RequestState>({
    page,
    attempt,
    result: { status: 'loading' },
  })

  useEffect(() => {
    const controller = new AbortController()

    getPokemonPage(page, controller.signal)
      .then((data) => {
        if (!controller.signal.aborted) {
          setRequest({ page, attempt, result: { status: 'success', data } })
        }
      })
      .catch((error: unknown) => {
        if (!controller.signal.aborted) {
          setRequest({
            page,
            attempt,
            result: {
              status: 'error',
              message:
                error instanceof TypeError
                  ? 'Não foi possível conectar à PokéAPI. Verifique sua conexão e tente novamente.'
                  : error instanceof Error
                    ? error.message
                    : 'Não foi possível acessar a PokéAPI.',
            },
          })
        }
      })
    return () => controller.abort()
  }, [page, attempt])
  const state: PokemonListState =
    request.page === page && request.attempt === attempt
      ? request.result
      : { status: 'loading' }

  function retry() {
    setAttempt((currentAttempt) => currentAttempt + 1)
  }

  return { state, retry }
}
