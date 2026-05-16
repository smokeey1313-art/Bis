import styles from './TopBar.module.css'

export function TopBar({ bgVisible, setBgVisible, wireframe, setWireframe }) {
  return (
    <header className={`${styles.topBar} topBar`}>
      <div className={styles.logo}>
        <span className={styles.logoMark}>◈</span>
        <span className={styles.logoText}>
          FORMA<em>3D</em>
        </span>
      </div>

      <nav className={styles.tools}>
        <button
          className={`${styles.toolBtn} ${wireframe ? styles.active : ''}`}
          onClick={() => setWireframe(v => !v)}
          title="Toggle wireframe"
        >
          <WireframeIcon />
          <span>Wireframe</span>
        </button>

        <button
          className={`${styles.toolBtn} ${bgVisible ? styles.active : ''}`}
          onClick={() => setBgVisible(v => !v)}
          title="Toggle HDRI background"
        >
          <BgIcon />
          <span>Background</span>
        </button>

        <span className={styles.badge}>GLB Viewer</span>
      </nav>
    </header>
  )
}

function WireframeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2L2 7l10 5 10-5-10-5z"/>
      <path d="M2 17l10 5 10-5"/>
      <path d="M2 12l10 5 10-5"/>
    </svg>
  )
}

function BgIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="4"/>
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
    </svg>
  )
}
