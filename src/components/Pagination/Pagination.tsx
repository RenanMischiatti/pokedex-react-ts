import styles from './Pagination.module.css'

type PaginationProps = {
  page: number
  totalPages: number
  label: string
  onPageChange: (page: number) => void
}

function Pagination({ page, totalPages, label, onPageChange }: PaginationProps) {
  return (
    <nav className={styles.pagination} aria-label={label}>
      <button type="button" disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
        <span aria-hidden="true">←</span> Anterior
      </button>
      <span className={styles.current}>
        Página <strong>{page}</strong> de {totalPages}
      </span>
      <button
        type="button"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Próxima <span aria-hidden="true">→</span>
      </button>
    </nav>
  )
}

export default Pagination
