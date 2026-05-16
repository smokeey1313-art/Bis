import styles from './Loader.module.css'

export function Loader() {
  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <div className={styles.ringOuter}>
          <div className={styles.ringInner} />
        </div>
        <p className={styles.label}>LOADING MODEL</p>
        <p className={styles.sub}>Preparing 3D scene…</p>
      </div>
    </div>
  )
}
