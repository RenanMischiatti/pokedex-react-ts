import styles from './PokemonCardSkeleton.module.css'

function PokemonCardSkeleton() {
  return (
    <div className={styles.card} aria-hidden="true">
      <div className={styles.artwork} />
      <div className={styles.info}>
        <div className={styles.name} />
        <div className={styles.details} />
      </div>
    </div>
  )
}

export default PokemonCardSkeleton
