const typeLabels: Record<string, string | undefined> = {
  normal: 'Normal',
  fire: 'Fogo',
  water: 'Água',
  electric: 'Elétrico',
  grass: 'Planta',
  ice: 'Gelo',
  fighting: 'Lutador',
  poison: 'Veneno',
  ground: 'Terra',
  flying: 'Voador',
  psychic: 'Psíquico',
  bug: 'Inseto',
  rock: 'Pedra',
  ghost: 'Fantasma',
  dragon: 'Dragão',
  dark: 'Sombrio',
  steel: 'Aço',
  fairy: 'Fada',
}

export function getTypeLabel(type: string) {
  return typeLabels[type] ?? type
}

const statLabels: Record<string, string | undefined> = {
  hp: 'HP',
  attack: 'Ataque',
  defense: 'Defesa',
  'special-attack': 'Ataque especial',
  'special-defense': 'Defesa especial',
  speed: 'Velocidade',
}

export function getStatLabel(stat: string) {
  return statLabels[stat] ?? stat
}
