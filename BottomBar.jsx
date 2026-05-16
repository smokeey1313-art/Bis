import styles from './BottomBar.module.css'

export function BottomBar({ renderMode }) {
  return (
    <footer className={`${styles.bottomBar} bottomBar`}>
      <div className={styles.left}>
        <span className={styles.dot} />
        <span className={styles.status}>
          {renderMode === 'pbr' ? 'PBR RENDER' : 'SHADED RENDER'}
        </span>
      </div>

      <div className={styles.center}>
        <span className={styles.hint}>
          ↻ Drag to orbit &nbsp;·&nbsp; ⊕ Scroll to zoom &nbsp;·&nbsp; ⇥ Right-click to pan
        </span>
      </div>

      <div className={styles.right}>
        <span className={styles.corner}>◢</span>
        FORMA 3D
        <span className={styles.corner}>◣</span>
      </div>
    </footer>
  )
}
