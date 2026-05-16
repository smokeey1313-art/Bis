import styles from './Sidebar.module.css'

const ENVS = [
  { id: 'studio',    label: 'Studio',    icon: '◉' },
  { id: 'warehouse', label: 'Warehouse', icon: '▣' },
  { id: 'forest',    label: 'Forest',    icon: '◈' },
  { id: 'sunset',    label: 'Sunset',    icon: '◐' },
  { id: 'dawn',      label: 'Dawn',      icon: '◑' },
  { id: 'night',     label: 'Night',     icon: '◎' },
]

export function Sidebar({
  renderMode, setRenderMode,
  envPreset,  setEnvPreset,
  autoRotate, setAutoRotate,
}) {
  return (
    <aside className={`${styles.sidebar} sidebar`}>

      {/* ── Render mode ── */}
      <section className={styles.section}>
        <p className={styles.label}>RENDER MODE</p>
        <div className={styles.modeToggle}>
          <button
            className={`${styles.modeBtn} ${renderMode === 'pbr' ? styles.modeActive : ''}`}
            onClick={() => setRenderMode('pbr')}
          >
            <span className={styles.modeDot} />
            PBR
          </button>
          <button
            className={`${styles.modeBtn} ${renderMode === 'shaded' ? styles.modeActive : ''}`}
            onClick={() => setRenderMode('shaded')}
          >
            <span className={styles.modeDot} />
            SHADED
          </button>
        </div>
        <p className={styles.hint}>
          {renderMode === 'pbr'
            ? 'Full physically-based materials'
            : 'Stylized flat-shaded look'}
        </p>
      </section>

      <div className={styles.divider} />

      {/* ── Environment ── */}
      <section className={styles.section}>
        <p className={styles.label}>ENVIRONMENT</p>
        <div className={styles.envGrid}>
          {ENVS.map(e => (
            <button
              key={e.id}
              className={`${styles.envBtn} ${envPreset === e.id ? styles.envActive : ''}`}
              onClick={() => setEnvPreset(e.id)}
            >
              <span className={styles.envIcon}>{e.icon}</span>
              <span>{e.label}</span>
            </button>
          ))}
        </div>
      </section>

      <div className={styles.divider} />

      {/* ── Rotation ── */}
      <section className={styles.section}>
        <p className={styles.label}>AUTO-ROTATE</p>
        <button
          className={`${styles.rotateBtn} ${autoRotate ? styles.rotateOn : ''}`}
          onClick={() => setAutoRotate(v => !v)}
        >
          <span
            className={styles.rotateIcon}
            style={{ animationPlayState: autoRotate ? 'running' : 'paused' }}
          >
            ⟳
          </span>
          {autoRotate ? 'SPINNING' : 'PAUSED'}
        </button>
      </section>

      <div className={styles.divider} />

      {/* ── Info ── */}
      <section className={styles.section}>
        <p className={styles.label}>MODEL INFO</p>
        <div className={styles.infoList}>
          <div className={styles.infoRow}>
            <span>Format</span><span>GLB / glTF 2.0</span>
          </div>
          <div className={styles.infoRow}>
            <span>Variants</span><span>2 (PBR + Shaded)</span>
          </div>
          <div className={styles.infoRow}>
            <span>Controls</span><span>Drag · Scroll</span>
          </div>
        </div>
      </section>

    </aside>
  )
}
