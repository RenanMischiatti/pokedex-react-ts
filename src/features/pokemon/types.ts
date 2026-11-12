export type PokemonSummary = {
  id: number
  name: string
  types: string[]
}

export type PokemonDetails = PokemonSummary & {
  height: number
  weight: number
  abilities: { name: string; hidden: boolean }[]
  stats: { name: string; value: number }[]
}

export type PokemonPage = {
  count: number
  results: PokemonSummary[]
}
